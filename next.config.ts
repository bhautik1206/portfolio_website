import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  // Same names as the legacy CRA site, so Netlify env settings need no change.
  env: {
    REACT_APP_EMAILJS_USER_ID: process.env.REACT_APP_EMAILJS_USER_ID ?? "",
    REACT_APP_EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID ?? "",
    REACT_APP_EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
      { protocol: "https", hostname: "miro.medium.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/old-version", destination: "/ov", permanent: true },
      { source: "/old-version/:path*", destination: "/ov/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/ov", destination: "/ov/index.html" }],
      afterFiles: [],
      // Legacy SPA deep links (/ov/h, /ov/hide): real files under public/ov are served first.
      fallback: [{ source: "/ov/:path*", destination: "/ov/index.html" }],
    };
  },
};

export default nextConfig;
