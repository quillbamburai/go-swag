import "./globals.css"
import { Sora, Inter } from "next/font/google"

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
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
