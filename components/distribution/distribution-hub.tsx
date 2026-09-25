"use client"

import { useState } from "react"
import type { Campaign, Dispatch } from "@/lib/types"
import { PackHoldAlert } from "@/components/drawers/pack-hold-alert"
import { DispatchTrend } from "./dispatch-trend"
import { DispatchTable } from "./dispatch-table"
import { ClaimLinksPanel, CountryLocationPanel, CarrierPanel, ExceptionsPanel } from "./distribution-panels"

/**
 * View 2 — dispatch trend open on the canvas, metric panels down the right,
 * dispatch grid below. The trend and grid swap via the expand control.
 * Mid-fidelity greyscale pass. Not final styling.
 * Prompt: prompts/04-distribution-hub.md
 */
export function DistributionHub({
  campaigns,
  dispatches,
  onApproveSubstitute,
  onStockUpMissingSku,
}: {
  campaigns: Campaign[]
  dispatches: Dispatch[]
  onApproveSubstitute: (campaign: Campaign) => void
  onStockUpMissingSku: (campaign: Campaign) => void
}) {
  const [centralView, setCentralView] = useState<"trend" | "grid">("trend")
  const swap = () => setCentralView((v) => (v === "trend" ? "grid" : "trend"))
  const held = campaigns.find((c) => c.onHold)

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_320px] gap-4">
        {/* Left column — chart open on the canvas, grid panelled below it.
            Split by ratio rather than fixed heights: the design frame gives the
            chart 529px against the table's 438px, so 55/45. Both scale with the
            window, keeping the composition at any size. */}
        <div className="grid min-h-0 min-w-0 grid-rows-[55fr_45fr] gap-4">
          <div className="min-h-0 min-w-0">
            {centralView === "trend" ? (
              <DispatchTrend onSwitchView={swap} />
            ) : (
              <DispatchTable dispatches={dispatches} onSwitchView={swap} />
            )}
          </div>

          <div className="min-h-0 min-w-0">
            {centralView === "trend" ? (
              <DispatchTable dispatches={dispatches} onSwitchView={swap} />
            ) : (
              <DispatchTrend onSwitchView={swap} />
            )}
          </div>
        </div>

        {/* Right column — hold banner above the metric panels, same width.
            -mt-6 lifts it so the banner sits 24px below the top menu bar,
            independent of the chart column's own top alignment. */}
        <div className="-mt-6 flex min-h-0 flex-col gap-3">
          {held && (
            <div className="shrink-0">
              <PackHoldAlert
                campaign={held}
                onApproveSubstitute={onApproveSubstitute}
                onStockUpMissingSku={onStockUpMissingSku}
              />
            </div>
          )}
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ClaimLinksPanel campaigns={campaigns} />
            <CountryLocationPanel />
            <CarrierPanel dispatches={dispatches} />
            <ExceptionsPanel dispatches={dispatches} onFixAddresses={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}
