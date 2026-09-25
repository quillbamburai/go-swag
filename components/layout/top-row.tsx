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

      {/* Search and the hub controls are one group, centred on the span between
          the rail and the Create button. Positioned rather than laid out, so
          the switcher's width can't push the group off that centre. */}
      <div
        className="absolute flex items-center gap-2.5"
        style={{
          /* The row starts at the rail's right edge and ends at the viewport
             edge, but the group should centre on rail→Create instead: Create
             is 320px wide with a 16px gutter, so the centre shifts 168px. */
          left: "calc(50% - 168px)",
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: GREY.panel, width: 425 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY.faint} strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <span className={TYPE.meta} style={{ color: GREY.faint }}>
            Search SKU or campaign
          </span>
        </div>
        {children && (
          <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">{children}</span>
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
