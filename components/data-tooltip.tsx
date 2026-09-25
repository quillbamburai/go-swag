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
}: {
  /** The element the tooltip points at. */
  anchor: HTMLElement | null
  value: string
  detail?: string
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
  }, [anchor, value, detail])

  if (!anchor || typeof document === "undefined") return null

  return createPortal(
    <div
      ref={ref}
      role="tooltip"
      className="pointer-events-none fixed z-50 flex flex-col items-center gap-0.5 whitespace-nowrap rounded-lg px-2.5 py-1.5"
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        background: GREY.text,
        color: GREY.panel,
        opacity: pos ? 1 : 0,
      }}
    >
      <span className={TYPE.rowValue}>{value}</span>
      {detail && (
        <span className={TYPE.columnHeader} style={{ opacity: 0.7 }}>
          {detail}
        </span>
      )}
    </div>,
    document.body,
  )
}
