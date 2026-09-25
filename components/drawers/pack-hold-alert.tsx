import type { Campaign } from "@/lib/types"
import { GREY, TYPE } from "@/components/mid-fidelity"

/**
 * Incomplete pack hold. Sits at the top of the right column, matching the
 * metric panels' width.
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function PackHoldAlert({
  campaign,
  onApproveSubstitute,
  onStockUpMissingSku,
}: {
  campaign: Campaign
  onApproveSubstitute: (campaign: Campaign) => void
  onStockUpMissingSku: (campaign: Campaign) => void
}) {
  if (!campaign.onHold || !campaign.holdMessage) return null

  return (
    <div
      className="flex items-center gap-3 rounded-[10px] px-4 py-3"
      style={{ background: "var(--color-notice)" }}
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.18)", color: "#FFFFFF" }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 8v5" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
          <path d="M10.3 3.9 2.6 17.5a1.8 1.8 0 0 0 1.6 2.7h15.6a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
        </svg>
      </span>

      <p className={`min-w-0 flex-1 ${TYPE.meta}`} style={{ color: "#FFFFFF" }}>
        {campaign.holdMessage}
      </p>

      <button
        type="button"
        onClick={() => onStockUpMissingSku(campaign)}
        className={`shrink-0 rounded-lg px-3 py-1.5 transition-opacity hover:opacity-80 ${TYPE.control}`}
        style={{ background: GREY.well, color: GREY.text }}
      >
        Approve
      </button>
    </div>
  )
}
