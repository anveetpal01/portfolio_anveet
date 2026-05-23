# Computer Vision — cheatsheet

## When to reach for it

- **Real-time detection / counting / tracking** from camera streams (traffic, retail, security).
- **Image classification & quality checks** (medical, manufacturing).
- **Segmentation** for masks, background removal, autonomous navigation.

## Mental model

Modern CV is **a CNN/transformer backbone that turns pixels into feature maps + a task head that turns those features into the answer you need** (label, box, mask, embedding). The hard part isn't the model — it's the **data pipeline** (labels, augmentations, train/test splits that mirror the real scene) and the **post-processing** (NMS, tracking, thresholds, deduplication) that turns raw detections into a trustworthy number.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **CNN / convolution** | Local + translation-invariant feature extractor with shared weights — far fewer params than a dense layer. |
| **Bounding box** | `(x1,y1,x2,y2)` or `(cx,cy,w,h)`; the unit of output for detection. |
| **IoU** | Overlap ratio of two boxes (intersection / union); used to label "correct" detections and for NMS. |
| **mAP** | Mean (across classes) of Average Precision over IoU thresholds — the standard detection metric. |
| **YOLO** | Single-stage detector — one forward pass predicts all boxes + classes; fast, real-time. |
| **R-CNN / Faster R-CNN** | Two-stage: region proposal → classifier. Slower, traditionally a bit more accurate on hard data. |
| **NMS** | Non-Max Suppression — keep highest-confidence box, drop overlapping ones above an IoU threshold. |
| **Tracker (SORT / DeepSORT / ByteTrack)** | Assigns persistent IDs across frames using motion (Kalman) + IoU / appearance. |
| **Anchor-free** | Modern detectors (FCOS, CenterNet, newer YOLO) predict directly from each location — no anchor tuning. |
| **FP16 / INT8** | Half / 8-bit quantization — large GPU speedup, small accuracy cost (usually). |

## Minimum example

```python
# Ultralytics YOLO — detect + persistent track IDs in a video, frame by frame.
from ultralytics import YOLO

model = YOLO("yolo11n.pt")          # nano model for speed

for result in model.track(
    source="traffic.mp4",
    persist=True,                    # keep ID across frames
    classes=[2, 5, 7],               # car, bus, truck (COCO IDs)
    conf=0.25,
    tracker="bytetrack.yaml",
    stream=True,                     # generator, low memory
):
    boxes = result.boxes
    if boxes is None or boxes.id is None:
        continue
    for box, cls, track_id in zip(boxes.xyxy, boxes.cls, boxes.id):
        print(int(track_id), int(cls), [float(v) for v in box])
```

## Common pitfalls

- **Trusting default confidence threshold** — sweep on a labelled val set; pick the threshold that matches your precision/recall target.
- **Counting on raw detections** without a tracker — the same car gets re-counted every frame; you need persistent IDs.
- **ID switches in dense scenes** — tracker swaps the ID; mitigate with appearance embeddings (DeepSORT) or stricter cost gating (ByteTrack's `fuse_score`).
- **Random splits that leak the same scene** into train and test — use scene-disjoint splits, especially for surveillance footage.
- **Wrong augmentation transforms** — flipping/cropping the image without updating the boxes labels everything wrong.
- **Model + post-processing tuned in isolation** — change the model, your NMS / dedup / threshold all need re-tuning.

## What to learn next

- **OpenCV** image ops · **Ultralytics YOLO** (training + export) · **Trackers**: SORT / ByteTrack / DeepSORT · **TensorRT / ONNX Runtime** for fast inference · **Albumentations** for augmentation · evaluation: **mAP@[0.5:0.95]**, MOTA / IDF1 for tracking.

> **Personal note:** _<TODO: scenes you've worked on — CCTV vehicle counter at Miraigate, what surprised you about real-world streams.>_

## Sources

- [Ultralytics YOLO Docs](https://docs.ultralytics.com/)
- [ByteTrack paper / repo](https://github.com/ifzhang/ByteTrack)
- [GeeksforGeeks — Computer Vision Interview Questions](https://www.geeksforgeeks.org/computer-vision/computer-vision-interview-questions/)
- [Flowygo — YOLO Real-Time Detection 2026](https://flowygo.com/en/blog/computer-vision-2026-part-1-3-yolo-and-real-time-object-detection-from-zero-to-working-system/)
