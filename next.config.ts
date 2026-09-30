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
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/old-version", destination: "/old-version/index.html" },
        { source: "/old-version/", destination: "/old-version/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
