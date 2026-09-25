"use client"

import { useLayoutEffect, useRef, useState } from "react"
import {
  monthlyPacks,
  departments,
  packStreams,
  packTypeTrend,
  eventLeadTimes,
  FACTORY_LEAD_DAYS,
} from "@/lib/mock-data"
import { GREY, TYPE, CHART_ACCENT } from "@/components/mid-fidelity"
import { DataTooltip, useHoverIndex } from "@/components/data-tooltip"
import { RangeToggle } from "@/components/inventory/insight-panels"
import { FilterButton } from "@/components/inventory/inventory-hub"

type View = "packs" | "events"

/** Per-bar opacity within a month group, measured from the design. */
const BAR_OPACITY = [1, 1, 0.8, 0.6, 0.4, 0.2]
/** Matches the metric panels' accent so the two regions read as one system. */
const BAR_FILL = "var(--color-panel-accent)"
const BAR_W = 10
/** Gap between month groups. */
const GROUP_GAP = 48
/** A month group fades to this when another month is focused. */
const GROUP_DIM = 0.4

const LINE_STYLE = {
  /* Promotions is the highlighted series — bees-wax/500 reads clearly at
     1.5px against the canvas, where the lighter tag yellow does not. */
  solid: { width: 1.5, opacity: 1, dash: undefined as string | undefined, color: "var(--color-bees-wax-500)" },
  light: { width: 1, opacity: 0.55, dash: undefined as string | undefined, color: GREY.text },
  dotted: { width: 1, opacity: 0.55, dash: "2 3", color: GREY.text },
}


/**
 * Draw a department curve at the given size. The geometry is stored normalised
 * (0→1 on both axes, straight from the Figma vectors) so it is simply scaled —
 * nothing is re-interpolated or smoothed here.
 */
function curvePath(
  curve: (typeof packTypeTrend)[number]["curve"],
  w: number,
  top: number,
  band: number,
): string {
  const X = (n: number) => n * w
  const Y = (n: number) => top + n * band
  let d = `M ${X(curve.p0[0])} ${Y(curve.p0[1])}`
  for (const [c1x, c1y, c2x, c2y, x, y] of curve.segs) {
    d += ` C ${X(c1x)} ${Y(c1y)}, ${X(c2x)} ${Y(c2y)}, ${X(x)} ${Y(y)}`
  }
  return d
}

/**
 * From/to month-year range for the chart. Replaces the A-Z sort, which is an
 * Inventory concept — a time series is bounded by dates, not sorted.
 */
function DateRange({ from, to }: { from: string; to: string }) {
  const Field = ({ value }: { value: string }) => (
    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-opacity hover:opacity-70 ${TYPE.control}`}
      style={{ background: GREY.well, color: GREY.text }}
    >
      {value}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )

  return (
    <span className="flex items-center gap-2">
      <Field value={from} />
      <span className={TYPE.meta} style={{ color: GREY.muted }}>
        to
      </span>
      <Field value={to} />
    </span>
  )
}

export function DispatchTrend({ onSwitchView }: { onSwitchView: () => void }) {
  const [view, setView] = useState<View>("packs")

  return (
    <div className="flex h-full flex-col pl-[31px] pr-8">
      <PacksView />
    </div>
  )
}

function PacksView() {
  const { index: hovered, anchor, bind } = useHoverIndex()
  const plotRef = useRef<HTMLDivElement>(null)
  const [plotH, setPlotH] = useState(280)

  useLayoutEffect(() => {
    const el = plotRef.current
    if (!el) return
    const measure = () => setPlotH(el.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const [bar, setBar] = useState<{ m: number; s: number } | null>(null)
  const [barAnchor, setBarAnchor] = useState<HTMLElement | null>(null)
  const [line, setLine] = useState<number | null>(null)
  const total = 1837
  const dataMax = Math.max(...monthlyPacks.flatMap((m) => m.values))
  const peak = Math.ceil((dataMax * 1.02) / 50) * 50

  /** In the design the line band is 161px of a 302px chart, starting 28px in —
      so the curves occupy the middle 53%, running through the bars. */
  const lineTop = plotH * 0.09
  const lineBand = plotH * 0.53

  /** One geometry model shared by the lines, the bars and the month labels. */
  const groupW = BAR_W * 6
  const slotW = groupW + GROUP_GAP
  const contentW = monthlyPacks.length * slotW - GROUP_GAP

  return (
    <>
      {/* Open layout: the label and controls sit left, the hero figure is
          centred over the chart it heads, and the legend runs beneath. */}
      <div className="relative mt-10 shrink-0">
        <h2 className={TYPE.panelTitle} style={{ color: GREY.text }}>
          Dispatches over time
        </h2>

        {/* 24px between the range and the filter: they act on the chart in
            different ways, so the gap reads them as separate controls. */}
        <div className="mt-[28px] flex items-center gap-6">
          <DateRange from={monthlyPacks[0].month} to={monthlyPacks[monthlyPacks.length - 1].month} />
          <FilterButton />
        </div>

        {/* Centred on the plot, not the column. -top-[22px] pulls the figure
            up so its optical centre sits on the label/tabs line — the three
            read as one row across the screen. pointer-events-none keeps the
            controls behind it clickable. */}
        <div className="pointer-events-none absolute inset-x-0 top-[10px] flex flex-col items-center">
          <p
            className="numeric"
            style={{
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: 64,
              lineHeight: "64px",
              letterSpacing: "var(--letter-spacing-tightest)",
              color: GREY.text,
            }}
          >
            {total.toLocaleString()}
          </p>
          {/* Same treatment as the legend keys below the chart. */}
          <p className={`mt-[19px] text-center ${TYPE.meta}`} style={{ color: GREY.text }}>
            Units shipped
          </p>
        </div>
      </div>

      <div className="mt-[53px] flex shrink-0 items-start justify-between gap-4">
        {/* One group; the highlighted series is ordered last within it. */}
        <div className="flex shrink-0 items-center gap-8">

          {[...packTypeTrend]
            .sort((a, b) => Number(a.style === "solid") - Number(b.style === "solid"))
            .map((d) => {
            const st = LINE_STYLE[d.style]
            return (
              <span
                key={d.packType}
                className="flex cursor-default items-center gap-2"
                onMouseEnter={() => setLine(packTypeTrend.indexOf(d))}
                onMouseLeave={() => setLine(null)}
              >
                <svg width="24" height="4" aria-hidden>
                  <line
                    x1="0" y1="2" x2="24" y2="2"
                    stroke={st.color}
                    strokeWidth={st.width}
                    strokeDasharray={st.dash}
                    opacity={st.opacity}
                  />
                </svg>
                <span className={TYPE.meta} style={{ color: GREY.muted }}>
                  {d.packType}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      {/* Cancels the header's gutter: the plot runs full-bleed so the bars can
          scroll under the right-hand column. */}
      <div className="-ml-[31px] -mr-8 mt-6 flex min-h-0 w-auto min-w-0 flex-1 gap-3 pl-[31px]">
        <div
          className={`w-[26px] shrink-0 flex flex-col justify-between pb-6 text-right ${TYPE.meta}`}
          style={{ color: GREY.faint }}
        >
          <span />
          <span>{Math.round(peak / 2)}</span>
          <span>0</span>
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-px w-full" style={{ background: i === 1 ? GREY.hairline : "transparent" }} />
            ))}
          </div>


          {/* One scrolling region: lines, bars and labels move together. */}
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div ref={plotRef} className="relative flex min-h-0 flex-1 items-end" style={{ width: contentW, gap: GROUP_GAP }}>
              <svg
                className="pointer-events-none absolute inset-0"
                style={{ width: contentW, height: plotH }}
                viewBox={`0 0 ${contentW} ${plotH}`}
                aria-hidden
              >
                {packTypeTrend.map((d, li) => {
                  const st = LINE_STYLE[d.style]
                  const dim = line !== null && line !== li
                  return (
                    <path
                      key={d.packType}
                      className="chart-line"
                      style={{ animationDelay: `${260 + li * 90}ms` }}
                      d={curvePath(d.curve, contentW, lineTop, lineBand)}
                      fill="none"
                      stroke={st.color}
                      strokeWidth={line === li ? st.width + 1 : st.width}
                      strokeDasharray={st.dash}
                      opacity={dim ? 0.15 : st.opacity}
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  )
                })}
              </svg>

              {monthlyPacks.map((month, i) => (
                <div
                  key={month.month}
                  className="flex h-full shrink-0 cursor-default items-end justify-center transition-opacity"
                  style={{ width: groupW, opacity: hovered === null || hovered === i ? 1 : GROUP_DIM }}
                  {...bind(i)}
                >
                  {month.values.map((value, j) => {
                    const isBar = bar?.m === i && bar?.s === j
                    return (
                      <div
                        key={j}
                        className="h-full shrink-0 cursor-default"
                        style={{ width: BAR_W, display: "flex", alignItems: "flex-end" }}
                        onMouseEnter={(e) => {
                          setBar({ m: i, s: j })
                          setBarAnchor(e.currentTarget)
                        }}
                        onMouseLeave={() => {
                          setBar(null)
                          setBarAnchor(null)
                        }}
                      >
                        <div
                          className="chart-bar w-full transition-opacity"
                          style={{
                            height: `${(value / peak) * 100}%`,
                            background: BAR_FILL,
                            opacity: isBar ? 1 : BAR_OPACITY[j],
                            outline: isBar ? `1px solid ${GREY.text}` : undefined,
                            /* Stagger across months, then across bars within
                               each month, so the chart fills left to right. */
                            animationDelay: `${i * 30 + j * 8}ms`,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            <div
              className={`mt-2 flex h-4 shrink-0 ${TYPE.meta}`}
              style={{ width: contentW, gap: GROUP_GAP, color: GREY.faint }}
            >
              {monthlyPacks.map((m) => (
                <span key={m.month} className="shrink-0 text-center" style={{ width: groupW }}>
                  {m.month}
                </span>
              ))}
            </div>

            {bar && barAnchor && (
              <DataTooltip
                anchor={barAnchor}
                value={`${monthlyPacks[bar.m].values[bar.s].toLocaleString()} units`}
                detail={`${departments[bar.s]} · ${monthlyPacks[bar.m].month}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function EventsView() {
  const { index: hovered, anchor, bind } = useHoverIndex()
  const peak = 40
  const atRisk = eventLeadTimes.filter((e) => e.leadDays < FACTORY_LEAD_DAYS).length

  return (
    <>
      <div className="pointer-events-none -mt-[28px] flex shrink-0 items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className={TYPE.panelTitle} style={{ color: GREY.faint }}>
            Lead time
          </h2>
          <p
            className="numeric"
            style={{
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "var(--text-h3-size)",
              lineHeight: "var(--text-h3-line-height)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: GREY.text,
            }}
          >
            {atRisk}
          </p>
          <p className={TYPE.meta} style={{ color: GREY.muted }}>
            Events ordered inside the {FACTORY_LEAD_DAYS}-day factory lead time
          </p>
        </div>
        {/* Matches the Packs legend: sits below the Events/Packs tabs. */}
        <div className="pointer-events-auto mt-[78px]">
          <RangeToggle ranges={["Qtr", "Half", "Yr"]} active="Yr" />
        </div>
      </div>

      <div className="mt-6 flex min-h-0 w-full min-w-0 flex-1 gap-3 pr-[38px]">
        <div
          className={`w-[26px] shrink-0 flex flex-col justify-between pb-6 text-right ${TYPE.meta}`}
          style={{ color: GREY.faint }}
        >
          <span>{peak}d</span>
          <span>{peak / 2}d</span>
          <span>0</span>
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-px w-full" style={{ background: i === 1 ? GREY.hairline : "transparent" }} />
            ))}
          </div>

          <div className="relative flex min-h-0 flex-1 items-end gap-3">
            {eventLeadTimes.map((e, i) => (
              <div
                key={e.event}
                className="flex h-full flex-1 cursor-default items-end justify-center transition-opacity"
                style={{ opacity: hovered === null || hovered === i ? 1 : GROUP_DIM }}
                {...bind(i)}
              >
                <div
                  className="transition-opacity"
                  style={{
                    width: 56,
                    height: `${(e.leadDays / peak) * 100}%`,
                    background: e.leadDays < FACTORY_LEAD_DAYS ? GREY.text : CHART_ACCENT,
                    outline: hovered === i ? `1px solid ${GREY.text}` : undefined,
                    outlineOffset: hovered === i ? 1 : undefined,
                  }}
                />
              </div>
            ))}

            <div
              className="pointer-events-none absolute inset-x-0 flex items-center"
              style={{ bottom: `${(FACTORY_LEAD_DAYS / peak) * 100}%` }}
            >
              <div className="flex-1" style={{ borderTop: `1px dashed ${GREY.text}`, opacity: 0.4 }} />
              <span className={`ml-2 shrink-0 ${TYPE.meta}`} style={{ color: GREY.muted }}>
                Factory lead time
              </span>
            </div>
          </div>

          {hovered !== null && (
            <DataTooltip
              anchor={anchor}
              value={`${eventLeadTimes[hovered].leadDays} days lead`}
              detail={`${eventLeadTimes[hovered].event} · ${eventLeadTimes[hovered].packs} packs`}
            />
          )}

          <div className={`mt-2 flex h-4 gap-3 ${TYPE.meta}`} style={{ color: GREY.faint }}>
            {eventLeadTimes.map((e) => (
              <span key={e.event} className="flex-1 truncate text-center">
                {e.event}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
