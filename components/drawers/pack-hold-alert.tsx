import type { Campaign } from "@/lib/types"
import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"

/**
 * Incomplete pack hold: Approve Substitute | Stock Up {missing SKU}.
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
      className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-md)] px-4 py-3"
      style={{ background: GREY.well, border: `1px solid ${GREY.hairline}` }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{ background: GRADIENT, color: "#FFFFFF" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 8v5" strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
            <path d="M10.3 3.9 2.6 17.5a1.8 1.8 0 0 0 1.6 2.7h15.6a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
          </svg>
        </span>
        <p className={TYPE.meta} style={{ color: GREY.text }}>
          {campaign.holdMessage}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => onStockUpMissingSku(campaign)}
          className={`whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-1.5 transition-opacity hover:opacity-90 ${TYPE.control}`}
          style={{ background: GRADIENT, color: "#FFFFFF" }}
        >
          Stock Up {campaign.missingSkuName}
        </button>
        <button
          type="button"
          onClick={() => onApproveSubstitute(campaign)}
          className={`whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-1.5 transition-opacity hover:opacity-90 ${TYPE.control}`}
          style={{ background: GREY.panel, color: GREY.text, border: `1px solid ${GREY.bar}` }}
        >
          Approve Substitute
        </button>
      </div>
    </div>
  )
}
