"use client"

import type { Campaign, Dispatch } from "@/lib/types"
import { geographicSplit } from "@/lib/mock-data"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { Panel } from "@/components/inventory/insight-panels"

/**
 * Small metric panels. Fixed content only — title, figure, supporting line.
 * Nothing here scrolls.
 * Mid-fidelity greyscale pass. Not final styling.
 */

function MetricPanel({
  label,
  figure,
  support,
  supportInline = false,
  children,
}: {
  label: string
  figure: string
  support: string
  /** Sets the support text beside the figure, baseline-aligned, instead of beneath it. */
  supportInline?: boolean
  children?: React.ReactNode
}) {
  return (
    <Panel label={label}>
      {supportInline ? (
        <div className="mt-4 flex shrink-0 items-baseline justify-between gap-3">
          <p className={TYPE.heroFigure} style={{ color: GREY.text }}>
            {figure}
          </p>
          <p className={TYPE.meta} style={{ color: GREY.muted }}>
            {support}
          </p>
        </div>
      ) : (
        <div className="mt-4 flex shrink-0 flex-col gap-0.5">
          <p className={TYPE.heroFigure} style={{ color: GREY.text }}>
            {figure}
          </p>
          <p className={TYPE.meta} style={{ color: GREY.muted }}>
            {support}
          </p>
        </div>
      )}
      {children}
    </Panel>
  )
}

export function ClaimLinksPanel({ campaigns }: { campaigns: Campaign[] }) {
  const claimed = campaigns.reduce((sum, c) => sum + c.claimed, 0)
  const total = campaigns.reduce((sum, c) => sum + c.total, 0)
  const pct = Math.round((claimed / total) * 100)

  return (
    <MetricPanel
      label="Claim links"
      figure={`${claimed}/${total}`}
      support={`${campaigns.length} live links · next expires in 4 days`}
    >
      <div className="mt-auto h-[3px] w-full shrink-0 overflow-hidden rounded-full" style={{ background: GREY.bar }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GREY.text }} />
      </div>
    </MetricPanel>
  )
}

export function GeographyPanel() {
  return (
    <MetricPanel label="Geography" figure="2.4" support="Average transit days" supportInline>
      <ul className="mt-auto flex shrink-0 flex-col gap-2">
        {geographicSplit.map((row) => (
          <li key={row.region} className="flex items-center gap-3">
            <span className={`w-[52px] shrink-0 ${TYPE.meta}`} style={{ color: GREY.muted }}>
              {row.region}
            </span>
            <div className="h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: GREY.bar }}>
              <div className="h-full rounded-full" style={{ width: `${row.share}%`, background: GREY.text }} />
            </div>
            <span className={`shrink-0 text-right ${TYPE.rowValue}`} style={{ width: 40, color: GREY.text }}>
              {row.share}%
            </span>
          </li>
        ))}
      </ul>
    </MetricPanel>
  )
}

export function CarrierPanel({ dispatches }: { dispatches: Dispatch[] }) {
  const total = dispatches.reduce((sum, d) => sum + d.postageGbp, 0)
  const perPack = total / dispatches.length

  const byCarrier = dispatches.reduce<Record<string, number>>((acc, d) => {
    acc[d.carrier] = (acc[d.carrier] ?? 0) + 1
    return acc
  }, {})
  const carriers = Object.entries(byCarrier).sort((a, b) => b[1] - a[1])

  return (
    <MetricPanel
      label="Postage"
      figure={`£${total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      support={`Accumulated this month · £${perPack.toFixed(2)} per pack`}
    >
      <div className="mt-auto flex shrink-0 flex-wrap gap-1.5">
        {carriers.map(([carrier, count]) => (
          <span
            key={carrier}
            className={`rounded-full px-2 py-[3px] ${TYPE.columnHeader}`}
            style={{ background: GREY.well, color: GREY.text }}
          >
            {carrier} {Math.round((count / dispatches.length) * 100)}%
          </span>
        ))}
      </div>
    </MetricPanel>
  )
}

export function ExceptionsPanel({
  dispatches,
  onFixAddresses,
}: {
  dispatches: Dispatch[]
  onFixAddresses: () => void
}) {
  const exceptions = dispatches.filter((d) => d.status === "exception")

  return (
    <MetricPanel
      label="Exceptions"
      figure={String(exceptions.length)}
      support={`Address exceptions · ${exceptions.map((d) => d.destination).join(", ")}`}
    >
      <button
        type="button"
        onClick={onFixAddresses}
        className={`mt-auto w-full shrink-0 rounded-lg py-2 transition-opacity hover:opacity-80 ${TYPE.control}`}
        style={{ background: GREY.well, color: GREY.text }}
      >
        Fix addresses
      </button>
    </MetricPanel>
  )
}
