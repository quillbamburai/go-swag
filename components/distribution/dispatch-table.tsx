import type { Dispatch, DispatchStatus } from "@/lib/types"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { Panel } from "@/components/inventory/insight-panels"

const STATUS_LABEL: Record<DispatchStatus, string> = {
  "in-transit": "In transit",
  delivered: "Delivered",
  exception: "Exception",
  preparing: "Preparing",
}

/** Dot fill encodes status while the palette is still greyscale. */
const STATUS_DOT: Record<DispatchStatus, string> = {
  delivered: GREY.text,
  "in-transit": GREY.muted,
  preparing: GREY.bar,
  exception: GREY.text,
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
    <Panel label="Orders in transit" onExpand={onSwitchView}>
      <div className="mt-5 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full border-collapse">
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
                    style={{ background: GREY.well, color: GREY.text }}
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
                      style={{
                        background: STATUS_DOT[dispatch.status],
                        outline:
                          dispatch.status === "exception" ? `1.5px solid ${GREY.text}` : undefined,
                        outlineOffset: dispatch.status === "exception" ? "1.5px" : undefined,
                      }}
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
