/* =============================================================================
 *  Video embed helpers
 * -----------------------------------------------------------------------------
 *  Turns a normal YouTube/Vimeo share link (the kind you copy from the browser
 *  or the "Share" button) into a privacy-friendly embed URL for an <iframe>.
 *  Pure functions — no React, safe to import on the server or the client.
 * ========================================================================== */

import type { MediaVideo } from "@/lib/content";

/** Extract the 11-ish-char video id from any common YouTube URL shape. */
function youTubeId(url: string): string | null {
  // youtu.be/<id>
  const short = url.match(/youtu\.be\/([\w-]+)/);
  if (short) return short[1];
  // youtube.com/watch?v=<id>
  const watch = url.match(/[?&]v=([\w-]+)/);
  if (watch) return watch[1];
  // youtube.com/embed/<id>  or  youtube.com/shorts/<id>
  const path = url.match(/youtube(?:-nocookie)?\.com\/(?:embed|shorts)\/([\w-]+)/);
  if (path) return path[1];
  return null;
}

/** Extract the numeric video id from any common Vimeo URL shape. */
function vimeoId(url: string): string | null {
  // player.vimeo.com/video/<id>
  const player = url.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (player) return player[1];
  // vimeo.com/<id>  (optionally vimeo.com/<id>/<hash>)
  const std = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  if (std) return std[1];
  return null;
}

/**
 * Build the iframe `src` for a video item.
 *
 * - YouTube → `youtube-nocookie.com` (no cookies until the user hits play) with
 *   `rel=0` so the end screen doesn't surface other channels' videos.
 * - Vimeo → `dnt=1` (do-not-track).
 *
 * If the URL can't be parsed we return it unchanged: a typo degrades to a
 * (possibly unstyled) embed attempt instead of crashing the page.
 */
export function getEmbedUrl(item: MediaVideo): string {
  if (item.provider === "youtube") {
    const id = youTubeId(item.url);
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?rel=0`
      : item.url;
  }

  if (item.provider === "vimeo") {
    const id = vimeoId(item.url);
    return id ? `https://player.vimeo.com/video/${id}?dnt=1` : item.url;
  }

  return item.url;
}
