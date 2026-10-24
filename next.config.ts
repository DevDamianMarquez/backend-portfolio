import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build -> plain static files in /out (for Cloudflare Pages or any static host).
const nextConfig: NextConfig = process.env.STATIC_EXPORT
  ? { output: "export", images: { unoptimized: true } }
  : {};

export default nextConfig;
