import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 REQUIRES qualities to be listed explicitly (default is [75]).
    // 75 = grid thumbnails, 90 = the large image opened in the lightbox.
    qualities: [75, 90],
    // Default is 4h; portfolio assets rarely change, so cache optimized
    // images for ~31 days to avoid needless re-optimization.
    minimumCacheTTL: 2678400,
    // All photos are local files under /public/work and /public/about with
    // no query strings. Scoping optimization to these paths is the v16
    // security best practice.
    localPatterns: [
      { pathname: "/work/**", search: "" },
      { pathname: "/about/**", search: "" },
    ],
    // No `remotePatterns`: videos are embedded as iframes (YouTube/Vimeo),
    // never passed to next/image. If you ever serve thumbnails from a remote
    // host, add that host here.
  },
};

export default nextConfig;
