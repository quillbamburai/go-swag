import type { CampaignKind, Dispatch, DispatchStatus } from "@/lib/types"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { Panel } from "@/components/inventory/insight-panels"

const STATUS_LABEL: Record<DispatchStatus, string> = {
  "in-transit": "In transit",
  delivered: "Delivered",
  exception: "Exception",
  preparing: "Preparing",
}

/**
 * Status colour comes straight from the design system's semantic roles —
 * no new values. Preparing has no semantic role, so it stays neutral.
 */
const STATUS_COLOR: Record<DispatchStatus, { fg: string; bg: string }> = {
  delivered: { fg: "var(--color-success)", bg: "var(--color-success-surface)" },
  "in-transit": { fg: "var(--color-info)", bg: "var(--color-info-surface)" },
  exception: { fg: "var(--color-danger)", bg: "var(--color-danger-surface)" },
  preparing: { fg: GREY.muted, bg: GREY.well },
}

/**
 * Campaign tags separate the two kinds of send. Both pulled from existing
 * ramps in theme.css rather than introducing new hues.
 */
const CAMPAIGN_COLOR: Record<CampaignKind, { fg: string; bg: string }> = {
  pack: { fg: "var(--color-rock-700)", bg: "var(--color-rock-100)" },
  event: { fg: "var(--color-aqua-squeeze-600)", bg: "var(--color-aqua-squeeze-100)" },
}

/**
 * View State B — live dispatch grid. Compact variant when it sits in the
 * bottom-left slot; full when swapped into the central area.
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function DispatchTable({
  dispatches,
  compact = false,
  onSwitchView,
}: {
  dispatches: Dispatch[]
  compact?: boolean
  onSwitchView?: () => void
}) {
  const columns = compact
    ? ["Recipient", "Campaign", "Status"]
    : ["Recipient", "Destination", "Campaign", "Carrier & method", "Tracking", "Status", "Dispatched"]

  return (
    <Panel label="Orders in transit" showExpand={false}>
      {/* pb-4 so the scroll ends clear of the last row rather than slicing it
          against the panel edge. */}
      <div className="mt-5 min-h-0 w-full min-w-0 flex-1 overflow-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr>
              {columns.map((heading) => (
                <th
                  key={heading}
                  className={`sticky top-0 z-10 pb-2 ${TYPE.columnHeader}`}
                  style={{
                    color: GREY.faint,
                    textAlign: "left",
                    background: GREY.panel,
                    boxShadow: `inset 0 -1px 0 ${GREY.hairline}`,
                  }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dispatches.map((dispatch, i) => (
              <tr
                key={dispatch.id}
                style={{ borderTop: i === 0 ? "none" : `1px solid ${GREY.hairline}` }}
              >
                <td className={`py-2.5 ${TYPE.itemName}`} style={{ color: GREY.text }}>
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${TYPE.columnHeader}`}
                      style={{ background: GREY.well, color: GREY.muted }}
                    >
                      {dispatch.recipient.charAt(0)}
                    </span>
                    {dispatch.recipient}
                  </span>
                </td>

                {!compact && (
                  <td className={TYPE.meta} style={{ color: GREY.muted }}>
                    {dispatch.destination}
                  </td>
                )}

                <td>
                  <span
                    className={`inline-block rounded-full px-2 py-[3px] ${TYPE.columnHeader}`}
                    style={{
                      background: CAMPAIGN_COLOR[dispatch.campaignKind].bg,
                      color: CAMPAIGN_COLOR[dispatch.campaignKind].fg,
                    }}
                  >
                    {dispatch.campaign}
                  </span>
                </td>

                {!compact && (
                  <td className={TYPE.meta} style={{ color: GREY.muted }}>
                    {dispatch.carrier} — {dispatch.method}
                  </td>
                )}

                {!compact && (
                  <td className={TYPE.rowValue} style={{ color: GREY.muted }}>
                    <a href="#" className="underline-offset-2 hover:underline">
                      {dispatch.tracking}
                    </a>
                  </td>
                )}

                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 ${TYPE.meta}`}
                    style={{ color: GREY.text }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: STATUS_COLOR[dispatch.status].fg }}
                    />
                    {STATUS_LABEL[dispatch.status]}
                  </span>
                </td>

                {!compact && (
                  <td className={TYPE.meta} style={{ color: GREY.muted }}>
                    {dispatch.dispatchedAt}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
