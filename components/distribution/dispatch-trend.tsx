"use client"

import { useState } from "react"
import { dispatchTrend, dispatchSpikes } from "@/lib/mock-data"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { RangeToggle } from "@/components/inventory/insight-panels"

const VIEW_W = 1000
const VIEW_H = 260
const PAD_T = 16
const PAD_B = 8

/**
 * View State A — dispatches over time, with campaign spikes plotted.
 * Mid-fidelity greyscale pass. Not final styling.
 */
export function DispatchTrend({ onSwitchView }: { onSwitchView: () => void }) {
  const [range, setRange] = useState("30D")
  const [hovered, setHovered] = useState<number | null>(null)

  const ceiling = 200
  const stepX = VIEW_W / (dispatchTrend.length - 1)
  const plotH = VIEW_H - PAD_T - PAD_B
  const yOf = (v: number) => PAD_T + plotH - (v / ceiling) * plotH
  const points = dispatchTrend.map((v, i) => `${i * stepX},${yOf(v)}`).join(" ")
  const total = dispatchTrend.reduce((sum, n) => sum + n, 0)

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-start justify-between gap-2">
        <h2 className={TYPE.panelTitle} style={{ color: GREY.faint }}>
          Dispatches over time
        </h2>
        <button
          type="button"
          aria-label="Switch to dispatch grid"
          onClick={onSwitchView}
          className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-[#E4E4E4]"
          style={{ color: GREY.muted }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex shrink-0 items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className={TYPE.heroFigure} style={{ color: GREY.text }}>
            {total.toLocaleString()}
          </p>
          <p className={TYPE.meta} style={{ color: GREY.muted }}>
            Units shipped · last 30 days
          </p>
        </div>
        <RangeToggle ranges={["7D", "30D", "90D", "YTD"]} active={range} onChange={setRange} />
      </div>

      <div className="mt-8 flex min-h-0 w-full min-w-0 flex-1 gap-2.5">
        <div
          className={`flex shrink-0 flex-col justify-between pb-4 text-right ${TYPE.meta}`}
          style={{ color: GREY.faint }}
        >
          <span>{ceiling}</span>
          <span>{ceiling / 2}</span>
          <span>0</span>
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-4 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-px w-full"
                style={{ background: i === 0 ? "transparent" : GREY.hairline }}
              />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="relative min-h-0 w-full flex-1"
            role="img"
            aria-label="Daily outbound dispatch volume over the last 30 days"
          >
            <polyline
              points={points}
              fill="none"
              stroke={GREY.text}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* Spike dots sit outside the stretched svg so they stay circular. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-4">
            {dispatchSpikes.map((spike) => (
              <span
                key={spike.index}
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${(spike.index / (dispatchTrend.length - 1)) * 100}%`,
                  top: `${(yOf(dispatchTrend[spike.index]) / VIEW_H) * 100}%`,
                  background: GREY.text,
                }}
              />
            ))}
          </div>

          {/* Hover targets sit above the svg so tooltips are not clipped. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-4">
            {dispatchSpikes.map((spike) => (
              <div
                key={spike.index}
                className="pointer-events-auto absolute -translate-x-1/2 cursor-default"
                style={{
                  left: `${(spike.index / (dispatchTrend.length - 1)) * 100}%`,
                  top: `${(yOf(dispatchTrend[spike.index]) / VIEW_H) * 100}%`,
                  width: 20,
                  height: 20,
                  marginTop: -10,
                }}
                onMouseEnter={() => setHovered(spike.index)}
                onMouseLeave={() => setHovered(null)}
              >
                {hovered === spike.index && (
                  <div
                    className="pointer-events-none absolute -top-2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5 whitespace-nowrap rounded-lg px-2.5 py-1.5"
                    style={{ background: GREY.text, color: GREY.panel }}
                  >
                    <span className={TYPE.rowValue}>{spike.packs} packs</span>
                    <span className={TYPE.columnHeader} style={{ opacity: 0.7 }}>
                      {spike.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`mt-1.5 flex h-4 justify-between ${TYPE.meta}`} style={{ color: GREY.faint }}>
            <span>30d ago</span>
            <span>20d</span>
            <span>10d</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
