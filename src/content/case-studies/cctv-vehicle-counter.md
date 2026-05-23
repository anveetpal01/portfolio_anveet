# Vehicle Counting — Technical Deep-Dive

## Overview

The vehicle counting engine analyses a recorded traffic-camera clip and
produces a single, trustworthy integer: **how many vehicles passed a chosen
point during a fixed 35-second window.**

It is not a simple object detector. It is a three-stage pipeline that
**detects, tracks, and counts** each vehicle individually, so that the same
vehicle is counted **exactly once** even in dense, occluded traffic.

| Property | Value |
|---|---|
| Vehicle classes | Bicycle (1), Car (2), Motorcycle (3), Bus (5), Truck (7) |
| Counting window | First **35 s** of the clip (configurable) |
| Counting modes | **LINE** (cross a line) or **ROI** (exit a polygon) |
| Core entry point | `offline_count(clip_path, line_config_file, model, ...)` |
| Counting state holder | `VehicleCounter` class |
| Determinism | Same clip + same config → same count (auditable) |

---

## System Architecture

```
Clip (MP4)
   │
   ▼
[1] YOLO Detection ──────► bounding boxes per frame (class, confidence)
   │
   ▼
[2] ByteTrack Tracking ──► persistent track_id per vehicle (survives occlusion)
   │
   ▼
[3] Counting Logic ──────► LINE crossing  OR  ROI exit  → interval_total
   │
   ▼
Result + counting_events + per-frame detections
```

Detection answers *"what is in this frame?"*. Tracking answers *"is this the
**same** vehicle as last frame?"*. Counting answers *"has this vehicle now
crossed the boundary, and was it already counted?"*. All three are required —
detection alone would recount the same car on every frame.

---

## Stage 1 — Detection (YOLO)

Each frame is passed to a YOLO model via Ultralytics `model.track(...)`.

```python
results = model.track(
    frame, persist=True,
    classes=list(VEHICLE_CLASSES.keys()),   # 1,2,3,5,7
    conf=confidence,                        # default 0.10
    imgsz=imgsz,                            # default 1600 (1248 via scheduler)
    half=True,                              # FP16 — ~2x faster on GPU
    verbose=False, device=0,                # GPU 0
    tracker="bytetrack.yaml", iou=0.35,
)
```

| Parameter | Production value | Purpose |
|---|---|---|
| Model | `yolo11x.pt` (default); optional TensorRT `.engine` export at `imgsz=1248` | Detection network |
| `conf` | **0.10** | Low threshold so distant/faint vehicles still enter tracking |
| `imgsz` | **1248** (scheduler) / **1600** (stream manager default) | Higher resolution → small far-away vehicles detected |
| `half` | **True** (FP16) | Roughly halves GPU inference time |
| `iou` | **0.35** | NMS overlap threshold for detection boxes |

> A low `conf` of 0.10 is intentional. It maximises recall (don't miss
> vehicles); the noise it lets in is filtered later by tracking,
> de-duplication, and a separate display threshold (`MIN_DOT_CONF = 0.20`).

---

## Stage 2 — Tracking (ByteTrack)

ByteTrack assigns a **persistent `track_id`** to each vehicle so it can be
followed across frames. It internally uses a **Kalman filter** (constant-
velocity motion model) to predict each track's next position — this lives
inside the Ultralytics library, **not** in this codebase.

**Configuration — `bytetrack.yaml`:**

| Key | Value | Effect |
|---|---|---|
| `track_high_thresh` | 0.20 | Lower → more detections enter primary matching (reduces flicker) |
| `track_low_thresh` | 0.05 | Very low → rescue even weak detections for existing tracks |
| `new_track_thresh` | 0.15 | Minimum confidence to create a **new** track |
| `track_buffer` | 45 | Frames a lost track is kept (~1.5 s @30fps / ~2.5 s @18fps) |
| `match_thresh` | 0.60 | Lower → easier to re-associate lost tracks (fewer ID switches) |
| `fuse_score` | true | Fuses detection confidence into the match cost (`IoU × score`) so confident detections win matches and low-conf noise cannot hijack a track |

The thresholds are deliberately low to keep faint vehicles tracked;
`fuse_score: true` is the safety valve that prevents that low-confidence
noise from causing ID switches.

---

## Stage 3 — Counting Logic

For every tracked vehicle in every frame, the engine computes a **centroid**:

```python
cx, cy = (x1 + x2) // 2, (y1 + y2) // 2     # plain integer midpoint — no smoothing/EMA
```

The centroid is appended to that vehicle's trajectory history
(`track_history[track_id]`), which is **capped at 30 points** (sliding
window). Counting then runs in one of two modes.

### LINE mode — line crossing

The user defines a counting line `A–B` (default: a horizontal line at 55 % of
frame height). For each tracked vehicle:

- Examine the **last 20 segments** of its trajectory.
- For each consecutive pair `(p[i], p[i+1])`, test whether that segment
  intersects line `A–B` using `geometry_utils.is_intersect()`.
- `is_intersect` uses the **CCW (counter-clockwise) orientation test** — a
  cross-product sign comparison. No division, no slope, no floating-point
  fragility, robust to vertical movement.
- If crossed **and** counting is active **and** it is not a spatial duplicate
  → **count +1**.

### ROI mode — polygon exit

The user defines a 4-point polygon. For each tracked vehicle:

- Test whether the centroid is inside the polygon via
  `cv2.pointPolygonTest()` (handles concave shapes and edge cases correctly).
- A per-`track_id` state machine: `OUTSIDE → INSIDE → OUTSIDE`.
- The count increments on **EXIT** (the inside→outside transition), provided
  the vehicle was not already counted and it is not a duplicate footprint.

> **Why count on exit, not entry?** A vehicle fully traverses the zone
> before being counted, which avoids counting vehicles that merely clip the
> edge of the polygon.

---

## Accuracy Safeguards (De-duplication)

The single biggest risk is counting one vehicle multiple times (ID switches,
YOLO jitter, recycled IDs). Several independent layers prevent this:

| Safeguard | Rule | Why |
|---|---|---|
| **Counted-once set** | `track_id ∈ interval_counted_ids` → never recount | A vehicle counts at most once per interval |
| **Spatial cooldown** | Reject a crossing within **20 px** of another crossing in the last **0.5 s** | Same vehicle / jitter at one spot is not double-counted |
| **ID inheritance** | New `track_id` inherits "counted" status only if a previous track is within **≤20 px Euclidean AND IoU ≥0.50 AND exactly one candidate** | ByteTrack reassigning an ID to the same vehicle must not reset its counted state; ambiguity → no inheritance |
| **Dead-track pruning** | A `track_id` unseen for **60 frames** is fully evicted | ByteTrack can recycle an old ID onto a *new* vehicle; pruning ensures the new vehicle starts uncounted |
| **ROI footprint dedup** | Match if **IoU ≥0.50** OR centroid within **30 %** of box size; only within a **1.0 s** window; **2+ candidates → reject** | Prevents ghost duplicates in dense traffic; strict to avoid hijacking unrelated neighbours |
| **Display vs count split** | Dots shown only at `conf ≥ 0.20` (`MIN_DOT_CONF`); counting still uses all detections | Clean visualisation without losing low-confidence valid counts |
| **Minimum box area** | Boxes smaller than `min_box_area` are skipped | Rejects spurious tiny detections |

These thresholds were **tightened** from earlier, looser values (e.g. ROI IoU
0.25 → 0.50, centroid 60 % → 30 %, time gap 2.5 s → 1.0 s) specifically to
eliminate false duplicates observed in dense traffic.

---

## Round Lifecycle & Counting Window

```
Frame 0 ───────────────── 35 s ───────────────── end of clip
│      COUNTING ACTIVE             │   FROZEN TAIL          │
│  YOLO + tracking + counting      │   No YOLO, count locked│
```

- `max_count_frames = count_duration × clip_fps` (e.g. `35 × 25 = 875`
  frames).
- While `frame_no < max_count_frames`: full detection + tracking + counting.
- After that: **YOLO is switched off** (compute saving), the count is
  **frozen**, and only raw frames are emitted for playback.
- The line/ROI config is **hot-reloaded every ~30 frames (~1 s)** during
  counting, so an operator can reposition the line live without a restart.
- Each `offline_count()` call constructs its **own** `VehicleCounter`
  instance — the class is not thread-safe by design, and this isolation
  guarantees no shared state across concurrent clips.

---

## Key Parameters

| Constant | Value | Meaning |
|---|---|---|
| `VEHICLE_CLASSES` | `{1,2,3,5,7}` | Bicycle, Car, Motorcycle, Bus, Truck |
| `count_duration` | 35 s | Active counting window |
| `SPATIAL_COOLDOWN_PX` | 20 px | Spatial dedup radius |
| `SPATIAL_COOLDOWN_SECS` | 0.5 s | Spatial dedup time window |
| `TRACK_DEATH_FRAMES` | 60 | Frames before a track is evicted |
| `INHERIT_EUCLIDEAN_PX` | 20 px | ID-inheritance distance gate |
| `INHERIT_IOU_MIN` | 0.50 | ID-inheritance overlap gate |
| History cap | 30 points | Trajectory sliding window |
| Crossing look-back | 20 segments | Segments tested per frame |
| `MIN_DOT_CONF` | 0.20 | Dot display confidence |
| Default line | 55 % height | Auto line if no config |

---

## Design Rationale

- **Track, don't just detect.** Detection alone recounts a vehicle every
  frame. A persistent `track_id` is what makes "count once" possible.
- **High recall, then filter.** A low detection `conf` (0.10) catches faint
  vehicles; noise is removed downstream by tracking + de-duplication rather
  than by being strict up front (a missed vehicle cannot be recovered later;
  a false one can be filtered).
- **Geometry over arithmetic.** The CCW orientation test avoids slope /
  division entirely — no divide-by-zero on vertical motion, no float
  precision issues, and it is integer-fast in the hot loop.
- **Bounded state.** History (30), spatial cooldown list (0.5 s window), and
  dead-track pruning (60 frames) all keep memory proportional to *active
  traffic*, not to clip length — essential for long-running processes.
- **Severity-matched failure.** A missing per-stream config degrades to a
  default line; a missing global config aborts. Recoverable vs unrecoverable.
- **Auditability.** Deterministic counting plus `counting_events` (frame +
  timestamp for every increment) makes any reported number independently
  reviewable.
