"use client"

import { useState } from "react"
import { GREY } from "@/components/mid-fidelity"

/**
 * Left rail. Purpose undecided — placeholder slots only.
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function IconRail({ slots = 8 }: { slots?: number }) {
  const [active, setActive] = useState(0)

  return (
    <nav
      className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-2.5 py-4"
      style={{ background: GREY.panel }}
      aria-label="Placeholder navigation"
    >
      {Array.from({ length: slots }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          aria-label={`Placeholder ${i + 1}`}
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
          style={{ background: i === active ? GREY.well : "transparent" }}
        >
          <span
            className="h-4.5 w-4.5 rounded"
            style={{
              height: 18,
              width: 18,
              background: i === active ? GREY.text : GREY.hairline,
            }}
          />
        </button>
      ))}
    </nav>
  )
}
