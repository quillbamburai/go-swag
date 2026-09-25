"use client"

import type { Campaign, Dispatch } from "@/lib/types"
import { claimRates, countryLocation } from "@/lib/mock-data"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { DataTooltip, useHoverIndex } from "@/components/data-tooltip"
import { Panel } from "@/components/inventory/insight-panels"

/** From the Figma panel components: donut track, and the positive-delta green. */
const DONUT_TRACK = "#D5D5D5"
const DELTA_UP = "#347A32"
const TIGHT = "var(--font-inter-tight)"
/** Warm accent shared by the donuts, the share bar and the hold banner. */
const ACCENT = "var(--color-panel-accent)"

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
  // Fixed at the designed height — the column scrolls vertically rather than
  // compressing the panels to fit.
  return (
    <div className="h-[219px] shrink-0">
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
    </div>
  )
}

/** One 70px donut, 60% inner radius — geometry from the Figma component. */
function Donut({ pct, size = 70 }: { pct: number; size?: number }) {
  const r = size / 2
  const stroke = r * 0.4           // innerRadius 0.6 leaves a 40% ring
  const radius = r - stroke / 2
  const circ = 2 * Math.PI * radius
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={r} cy={r} r={radius} fill="none" stroke={DONUT_TRACK} strokeWidth={stroke} />
      <circle
        cx={r}
        cy={r}
        r={radius}
        fill="none"
        stroke={ACCENT}
        strokeWidth={stroke}
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        transform={`rotate(-90 ${r} ${r})`}
      />
    </svg>
  )
}

export function ClaimLinksPanel({ campaigns }: { campaigns: Campaign[] }) {
  const { index: hovered, anchor, bind } = useHoverIndex()

  return (
    <div className="h-[219px] shrink-0">
      <Panel label="Claim links">
        {/* Labels y65, donuts y100, percentages y185 — from the component. */}
        <div className="mt-[19px] flex shrink-0 items-start justify-between">
          {claimRates.map((c, i) => (
            <div key={c.label} className="flex cursor-default flex-col items-center gap-[15px]" {...bind(i)}>
              <span style={{ fontFamily: TIGHT, fontSize: 12, lineHeight: "20px", color: "#232426" }}>
                {c.label}
              </span>
              <Donut pct={c.pct} />
              <span className={TYPE.meta} style={{ color: GREY.muted }}>
                {c.pct}%
              </span>
            </div>
          ))}
        </div>

        {hovered !== null && (
          <DataTooltip
            anchor={anchor}
            value={`${claimRates[hovered].pct}% claimed`}
            detail={`${claimRates[hovered].label} packs`}
          />
        )}
      </Panel>
    </div>
  )
}

export function CountryLocationPanel() {
  const { index: hovered, anchor, bind } = useHoverIndex()
  const total = countryLocation.reduce((s, c) => s + c.share, 0)

  return (
    <div className="h-[219px] shrink-0">
      <Panel label="Country location">
        {/* 22px stacked bar beside the rows, both starting y66. */}
        <div className="mt-[36px] flex min-h-0 shrink-0 gap-4">
          <div className="flex w-[22px] shrink-0 flex-col overflow-hidden">
            {countryLocation.map((c, i) => (
              <div
                key={c.country}
                style={{
                  height: `${(c.share / total) * 133}px`,
                  background: ACCENT,
                  opacity: [0.25, 0.5, 1][i],
                }}
              />
            ))}
          </div>

          <ul className="flex flex-1 flex-col gap-3">
            {countryLocation.map((c, i) => (
              <li
                key={c.country}
                className="flex cursor-default items-center border-t pt-[6px]"
                style={{ borderColor: "#E4E4E4" }}
                {...bind(i)}
              >
                <span
                  className="mr-3 h-[8px] w-[9px] shrink-0 rounded-full"
                  style={
                    i === countryLocation.length - 1
                      ? { background: GREY.text }
                      : { background: ACCENT, opacity: [0.25, 0.5][i] }
                  }
                />
                <span
                  className="flex-1"
                  style={{ fontFamily: TIGHT, fontSize: 14, lineHeight: "20px", color: "#000" }}
                >
                  {c.country}
                </span>
                <span
                  className="w-[46px] shrink-0"
                  style={{
                    fontFamily: TIGHT,
                    fontSize: 18,
                    fontWeight: 500,
                    lineHeight: "28px",
                    letterSpacing: "-0.36px",
                    color: "#000",
                  }}
                >
                  {c.share}%
                </span>
                <span className="flex shrink-0 items-center gap-1" style={{ color: DELTA_UP }}>
                  <svg width="9" height="8" viewBox="0 0 9 8" fill="none" aria-hidden>
                    <path d="M4.5 0.5 L4.5 7.5 M1.5 3.5 L4.5 0.5 L7.5 3.5" stroke={DELTA_UP} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: TIGHT, fontSize: 14, lineHeight: "20px" }}>{c.delta}%</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {hovered !== null && (
          <DataTooltip
            anchor={anchor}
            value={`${countryLocation[hovered].share}% of shipments`}
            detail={`${countryLocation[hovered].country} · up ${countryLocation[hovered].delta}%`}
          />
        )}
      </Panel>
    </div>
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
  const { index: hovered, anchor, bind } = useHoverIndex()

  return (
    <div className="h-[219px] shrink-0">
      <Panel label="Postage">
        {/* Figure 32px / -6px tracking, tags as black pills — from the component. */}
        <p
          className="mt-[33px] shrink-0 numeric"
          style={{
            fontFamily: "var(--font-family-display)",
            fontWeight: "var(--font-weight-semibold)",
            fontSize: 32,
            lineHeight: "28px",
            letterSpacing: "var(--letter-spacing-tightest)",
            color: GREY.text,
          }}
        >
          £{total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className={`mt-[46px] shrink-0 ${TYPE.meta}`} style={{ color: GREY.muted }}>
          Accumulated this month · £{perPack.toFixed(2)} per pack
        </p>

        <div className="mt-auto flex shrink-0 flex-wrap gap-[6px]">
          {carriers.map(([carrier, count], i) => (
            <span
              key={carrier}
              className="cursor-default rounded px-2 py-[6px]"
              style={{
                background: "var(--color-tag-carrier)",
                color: "#000000",
                fontFamily: TIGHT,
                fontSize: 11,
                fontWeight: 500,
                lineHeight: "12px",
                letterSpacing: "0.22px",
                textTransform: "uppercase",
              }}
              {...bind(i)}
            >
              {carrier}  {Math.round((count / dispatches.length) * 100)} %
            </span>
          ))}
        </div>

        {hovered !== null && (
          <DataTooltip
            anchor={anchor}
            value={`${carriers[hovered][1]} shipments`}
            detail={carriers[hovered][0]}
          />
        )}
      </Panel>
    </div>
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
        style={{ background: "#000000", color: "#FFFFFF" }}
      >
        Fix addresses
      </button>
    </MetricPanel>
  )
}
