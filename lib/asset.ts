/**
 * Prefix a public asset path with the deployment's basePath.
 *
 * next/image leaves `src` untouched when images are unoptimized, so a static
 * export served under a subpath would request /products/x.png rather than
 * /goswag/products/x.png. Every reference to a file in public/ goes through
 * here. Empty in dev, so paths are unchanged locally.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function asset(path: string) {
  return `${BASE}${path}`
}
