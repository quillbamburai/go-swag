"use client"

import Image from "next/image"
import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"

/**
 * Global header: menu, workspace name, [+ New Campaign / Event], [+ Create New Product].
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function AppHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between gap-4 px-5 py-3" style={{ background: GREY.panel }}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: GREY.well, color: GREY.text }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="flex items-center gap-1.5">
          <Image
            src="/logo/go-swag-primary-logo-dark-4x.png"
            alt="Go Swag"
            width={2540}
            height={777}
            priority
            className="h-[22px] w-auto"
          />
          <span
            aria-label="Plus"
            className="relative -top-[3px] bg-clip-text"
            style={{
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "var(--text-h6-size)",
              lineHeight: "var(--text-h6-line-height)",
              letterSpacing: "var(--letter-spacing-normal)",
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            +
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="mr-1 flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: GREY.well, minWidth: 360 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY.faint} strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <span className={TYPE.meta} style={{ color: GREY.faint }}>Search SKU or campaign</span>
        </div>
        <HeaderButton variant="secondary">+ New Campaign / Event</HeaderButton>
        <HeaderButton variant="primary">Create New Product +</HeaderButton>
      </div>
    </header>
  )
}

function HeaderButton({ children, variant }: { children: React.ReactNode; variant: "primary" | "secondary" }) {
  const isPrimary = variant === "primary"
  return (
    <button
      type="button"
      className="whitespace-nowrap rounded-lg px-3.5 py-2 transition-opacity hover:opacity-80 text-button-m font-medium"
      style={{
        fontFamily: "var(--font-family-display)",
        background: isPrimary ? GRADIENT : GREY.well,
        color: isPrimary ? "#FFFFFF" : GREY.text,
      }}
    >
      {children}
    </button>
  )
}
