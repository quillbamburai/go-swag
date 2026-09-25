/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static export: the dashboard is entirely client-side, so it builds to
     plain HTML/CSS/JS and can be served from any host. */
  output: "export",

  /* Served from a subpath, not the domain root: /go-swag on GitHub
     Pages, matching the repo name. */
  basePath: "/go-swag",

  /* Next's image optimisation needs a server; a static export has none, so
     images are emitted as-is. They are already sized for their slots. */
  images: { unoptimized: true },

  /* Emit goswag/page/index.html so paths resolve without a server rewrite. */
  trailingSlash: true,

  /* Exposed to the client so lib/asset.ts can prefix public/ files. next/image
     does not rewrite src itself when images are unoptimized. */
  env: { NEXT_PUBLIC_BASE_PATH: "/go-swag" },
}

module.exports = nextConfig
