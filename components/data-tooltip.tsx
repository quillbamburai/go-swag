"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { GREY, TYPE } from "@/components/mid-fidelity"

/**
 * Tracks which row or mark is hovered, and the element to anchor against.
 * Spread `bind(i)` onto each item.
 */
export function useHoverIndex() {
  const [index, setIndex] = useState<number | null>(null)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const bind = (i: number) => ({
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      setIndex(i)
      setAnchor(e.currentTarget)
    },
    onMouseLeave: () => {
      setIndex(null)
      setAnchor(null)
    },
  })

  return { index, anchor, bind }
}

/**
 * Hover overlay for any data mark — chart bar, list row, table cell.
 *
 * Rendered in a portal because panels clip their overflow; a tooltip near a
 * panel edge would otherwise be cut off.
 */
export function DataTooltip({
  anchor,
  value,
  detail,
  delta,
}: {
  /** The element the tooltip points at. */
  anchor: HTMLElement | null
  value: string
  detail?: string
  /** Optional movement, e.g. "+0.1%". Positive reads green, negative red. */
  delta?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useLayoutEffect(() => {
    if (!anchor) return setPos(null)

    const a = anchor.getBoundingClientRect()
    const t = ref.current?.getBoundingClientRect()
    const width = t?.width ?? 0
    const height = t?.height ?? 0
    const gap = 8

    let left = a.left + a.width / 2 - width / 2
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8))

    // Prefer above the anchor; flip below when there is no room.
    let top = a.top - height - gap
    if (top < 8) top = a.bottom + gap

    setPos({ top, left })
  }, [anchor, value, detail, delta])

  if (!anchor || typeof document === "undefined") return null

  const negative = delta?.trim().startsWith("-")

  return createPortal(
    <div
      ref={ref}
      role="tooltip"
      className="pointer-events-none fixed z-50 flex flex-col gap-2 whitespace-nowrap rounded-2xl px-5 py-4"
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        background: "#FFFFFF",
        boxShadow: "0 8px 28px rgba(28,28,28,0.12), 0 1px 3px rgba(28,28,28,0.06)",
        opacity: pos ? 1 : 0,
        transition: "opacity 120ms ease-out",
      }}
    >
      <span className="flex items-center gap-2">
        <span
          className="numeric"
          style={{
            fontFamily: "var(--font-family-display)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: 20,
            lineHeight: "24px",
            letterSpacing: "var(--letter-spacing-tightest)",
            color: GREY.text,
          }}
        >
          {value}
        </span>
        {delta && (
          <span
            className={`rounded-full px-2 py-0.5 ${TYPE.columnHeader}`}
            style={{
              background: negative ? "var(--color-danger-surface)" : "var(--color-success-surface)",
              color: negative ? "var(--color-danger)" : "var(--color-success)",
            }}
          >
            {delta}
          </span>
        )}
      </span>
      {detail && (
        <span className={TYPE.meta} style={{ color: GREY.muted }}>
          {detail}
        </span>
      )}
    </div>,
    document.body,
  )
}
