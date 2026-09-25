"use client"

import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"
import { HubSwitcher } from "@/components/inventory/inventory-hub"
import type { HubId } from "@/lib/types"

/**
 * Open top row — no header bar. The logo, hub switcher and search sit directly
 * on the canvas beside the rail, with the create action at the far right.
 * Replaces AppHeader in the open layout.
 */
export function TopRow({
  activeHub,
  onHubChange,
  children,
}: {
  activeHub: HubId
  onHubChange: (hub: HubId) => void
  /** Hub-specific controls, shown beside the search field. */
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex shrink-0 items-center gap-6 pl-[31px] pt-[19px]">
      {/* Equal flex either side of the search keeps it on the true centre
          line regardless of how wide the switcher or the controls run. */}
      <div className="flex flex-1 items-center">
        <HubSwitcher activeHub={activeHub} onHubChange={onHubChange} />
      </div>

      {/* Search is positioned against the row, not laid out in it, so the
          switcher, the controls beside it and Create can vary in width
          without ever pushing it off the screen's centre line. */}
      <div
        className="absolute flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          background: GREY.panel,
          width: 425,
          /* Centre between the rail and the right column, not on the whole
             row — on Distribution the metric panels occupy 320px plus a 16px
             gap, so the usable centre shifts 168px left. */
          left: activeHub === "distribution" ? "calc(50% - 168px)" : "50%",
          transform: "translateX(-50%)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY.faint} strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <span className={TYPE.meta} style={{ color: GREY.faint }}>
          Search SKU or campaign
        </span>
        {children && (
          <span className="absolute left-full ml-2 flex shrink-0 items-center gap-2 whitespace-nowrap">
            {children}
          </span>
        )}
      </div>

      <div className="flex flex-1 items-center justify-end">
        {/* Create sits over the right column, matching its 320px width. */}
        <button
          type="button"
          className={`shrink-0 rounded-lg py-2.5 transition-opacity hover:opacity-90 ${TYPE.control}`}
          style={{ background: GRADIENT, color: "#FFFFFF", width: 320 }}
        >
          Create +
        </button>
      </div>
    </div>
  )
}
