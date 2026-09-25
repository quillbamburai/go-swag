"use client"

import Image from "next/image"
import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"
import { asset } from "@/lib/asset"

/**
 * Global header: menu, workspace name, [+ New Campaign / Event], [+ Create New Product].
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function AppHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between gap-4 py-3 pl-[26px] pr-5" style={{ background: GREY.panel }}>
      <div className="flex items-center gap-3">
        {/* Box mark carries the brand; "plus" names the tier beside it. */}
        <h1 className="flex items-center gap-2.5">
          <Image
            src={asset("/logo/swag-logo-box.png")}
            alt="Go Swag"
            width={128}
            height={128}
            priority
            className="h-11 w-11 rounded-xl"
          />
          <span
            style={{
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--text-h6-size)",
              lineHeight: "var(--text-h6-line-height)",
              letterSpacing: "var(--letter-spacing-normal)",
              color: GREY.text,
            }}
          >
            plus
          </span>
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
