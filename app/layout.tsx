import "./globals.css"
import { Sora, Inter, Inter_Tight } from "next/font/google"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

/** Used by the Distribution metric panels, per the Figma components. */
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
})

/**
 * Plus shell. Load Sora + Inter. Render AppHeader.
 * Spec: brief/product-architecture.md
 * Prompt: prompts/00-bootstrap.md
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  )
}
