/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static export: the dashboard is entirely client-side, so it builds to
     plain HTML/CSS/JS and can be served from any host. */
  output: "export",

  /* Served from dquill.co/goswag rather than the domain root. */
  basePath: "/goswag",

  /* Next's image optimisation needs a server; a static export has none, so
     images are emitted as-is. They are already sized for their slots. */
  images: { unoptimized: true },

  /* Emit goswag/page/index.html so paths resolve without a server rewrite. */
  trailingSlash: true,

  /* Exposed to the client so lib/asset.ts can prefix public/ files. next/image
     does not rewrite src itself when images are unoptimized. */
  env: { NEXT_PUBLIC_BASE_PATH: "/goswag" },
}

module.exports = nextConfig
