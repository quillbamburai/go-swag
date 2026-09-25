"use client"

import { useLayoutEffect, useRef, useState } from "react"
import {
  monthlyPacks,
  packStreams,
  departmentTrend,
  eventLeadTimes,
  FACTORY_LEAD_DAYS,
} from "@/lib/mock-data"
import { GREY, TYPE, CHART_ACCENT } from "@/components/mid-fidelity"
import { DataTooltip, useHoverIndex } from "@/components/data-tooltip"
import { RangeToggle } from "@/components/inventory/insight-panels"

type View = "packs" | "events"

/** Per-bar opacity within a month group, measured from the design. */
const BAR_OPACITY = [1, 1, 0.8, 0.6, 0.4, 0.2]
/** Deeper step of the chart ramp — 72 bars at chrome-white/500 read as glare. */
const BAR_FILL = "var(--color-chrome-white-700)"
const BAR_W = 10
/** Gap between month groups. */
const GROUP_GAP = 48
/** A month group fades to this when another month is focused. */
const GROUP_DIM = 0.4

const LINE_STYLE = {
  solid: { width: 1.5, opacity: 1, dash: undefined as string | undefined },
  light: { width: 1, opacity: 0.55, dash: undefined as string | undefined },
  dotted: { width: 1, opacity: 0.55, dash: "2 3" },
}
/** The legend always shows a plain rule, whatever the line's plotted style. */
const LEGEND_STROKE = { width: 1.5, dash: undefined as string | undefined }


/**
 * Draw a department curve at the given size. The geometry is stored normalised
 * (0→1 on both axes, straight from the Figma vectors) so it is simply scaled —
 * nothing is re-interpolated or smoothed here.
 */
function curvePath(
  curve: (typeof departmentTrend)[number]["curve"],
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

export function DispatchTrend({ onSwitchView }: { onSwitchView: () => void }) {
  const [view, setView] = useState<View>("packs")

  return (
    <div className="flex h-full flex-col pl-[31px] pr-8">
      {/* h-0 so the tabs float and the chart header can rise to meet the top of
          the rail's first icon; the tabs still render at their own position. */}
      <div className="relative z-10 flex h-0 shrink-0 items-start justify-end gap-5">
        <button
          type="button"
          onClick={() => setView("events")}
          className={`transition-opacity hover:opacity-70 ${TYPE.control}`}
          style={{ color: view === "events" ? GREY.text : GREY.faint }}
        >
          Events
        </button>
        <button
          type="button"
          onClick={() => setView("packs")}
          className={`pb-0.5 transition-opacity hover:opacity-70 ${TYPE.control}`}
          style={{
            color: view === "packs" ? GREY.text : GREY.faint,
            borderBottom: `1px solid ${view === "packs" ? GREY.text : "transparent"}`,
          }}
        >
          Packs
        </button>
      </div>

      {view === "packs" ? <PacksView /> : <EventsView />}
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
  const [line, setLine] = useState<number | null>(null)
  const total = monthlyPacks.reduce((s, m) => s + m.values.reduce((a, b) => a + b, 0), 0)
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
      {/* Lifts the header block toward the top of the rail's first icon while
          staying clear of the hub switcher above. pointer-events-none on the
          row keeps the switcher clickable; the legend re-enables its own. */}
      <div className="pointer-events-none -mt-[28px] flex shrink-0 items-start justify-between gap-4">
        <div className="flex flex-col">
          {/* 21px / 11px — measured from the Dispatches-over-time component. */}
          <h2 className={`mb-[21px] ${TYPE.panelTitle}`} style={{ color: GREY.faint }}>
            Dispatches over time
          </h2>
          <p
            className="mb-[11px] numeric"
            style={{
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "var(--text-h3-size)",
              lineHeight: "var(--text-h3-line-height)",
              letterSpacing: "var(--letter-spacing-tightest)",
              color: GREY.text,
            }}
          >
            {total.toLocaleString()}
          </p>
          <p className={TYPE.meta} style={{ color: GREY.muted }}>
            Units shipped · rolling 12 months
          </p>
        </div>

        {/* mt-[78px] keeps the legend below the Events/Packs tabs while the
            hero block above it sits high against the rail. */}
        <div className="pointer-events-auto mt-[78px] flex shrink-0 items-center gap-8">
          {departmentTrend.map((d) => {
            const st = LINE_STYLE[d.style]
            return (
              <span
                key={d.department}
                className="flex cursor-default items-center gap-2"
                onMouseEnter={() => setLine(departmentTrend.indexOf(d))}
                onMouseLeave={() => setLine(null)}
              >
                <svg width="24" height="2" aria-hidden>
                  <line
                    x1="0" y1="1" x2="24" y2="1"
                    stroke={GREY.text}
                    strokeWidth={LEGEND_STROKE.width}
                  />
                </svg>
                <span className={TYPE.meta} style={{ color: GREY.muted }}>
                  {d.department}
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
                {departmentTrend.map((d, li) => {
                  const st = LINE_STYLE[d.style]
                  const dim = line !== null && line !== li
                  return (
                    <path
                      key={d.department}
                      d={curvePath(d.curve, contentW, lineTop, lineBand)}
                      fill="none"
                      stroke={GREY.text}
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
                        onMouseEnter={() => setBar({ m: i, s: j })}
                        onMouseLeave={() => setBar(null)}
                      >
                        <div
                          className="w-full transition-opacity"
                          style={{
                            height: `${(value / peak) * 100}%`,
                            background: BAR_FILL,
                            opacity: isBar ? 1 : BAR_OPACITY[j],
                            outline: isBar ? `1px solid ${GREY.text}` : undefined,
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
