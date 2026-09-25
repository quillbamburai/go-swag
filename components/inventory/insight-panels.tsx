"use client"

import { useState } from "react"
import Image from "next/image"
import type { Campaign, Product } from "@/lib/types"
import { dispatchVelocity, forecastWeeks } from "@/lib/mock-data"
import { GREY, TYPE, ROW_VALUE_WIDTH, CHART_ACCENT } from "@/components/mid-fidelity"
import { DataTooltip, useHoverIndex } from "@/components/data-tooltip"
import { asset } from "@/lib/asset"

export function InsightPanels({ products, campaigns }: { products: Product[]; campaigns: Campaign[] }) {
  return (
    <div className="flex h-full gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="h-full w-[760px] shrink-0">
        <ForecastPanel />
      </div>
      <div className="h-full w-[420px] shrink-0">
        <EventsPanel campaigns={campaigns} />
      </div>
      <div className="h-full w-[420px] shrink-0">
        <MostPopularPanel products={products} />
      </div>
      <div className="h-full w-[420px] shrink-0">
        <PostagePanel />
      </div>
    </div>
  )
}

export function Panel({
  label,
  children,
  onExpand,
  showExpand = true,
}: {
  label: string
  children: React.ReactNode
  onExpand?: () => void
  /** Set false to drop the expand arrow from the panel header. */
  showExpand?: boolean
}) {
  return (
    <section
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl px-4 py-3.5"
      style={{ background: GREY.panel }}
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <h2 className={TYPE.panelTitle} style={{ color: GREY.faint }}>{label}</h2>
        <div className="flex shrink-0 items-center gap-1">
          <PanelIconButton label={`Filter ${label}`}>
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </PanelIconButton>
          {showExpand && (
            <PanelIconButton label={`Expand ${label}`} onClick={onExpand}>
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </PanelIconButton>
          )}
        </div>
      </div>
      {children}
    </section>
  )
}

export function PanelIconButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-[#F0F0F0]"
      style={{ color: GREY.muted }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {children}
      </svg>
    </button>
  )
}

function ForecastPanel() {
  const { index: hovered, anchor, bind } = useHoverIndex()
  /** Fixed ceiling above the real max so bars never reach the top of the plot. */
  const peak = 200
  const total = forecastWeeks.reduce((sum, n) => sum + n, 0)
  const active = hovered ?? null

  return (
    <Panel label="Forecast">
      <div className="mt-3 flex shrink-0 items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className={TYPE.heroFigure} style={{ color: GREY.text }}>
            {total.toLocaleString()}
          </p>
          <p className={TYPE.meta} style={{ color: GREY.muted }}>Units dispatching · next 12 weeks</p>
        </div>
        <RangeToggle />
      </div>

      <div className="mt-8 flex min-h-0 w-full min-w-0 flex-1 gap-2.5">
        <div
          className={`flex shrink-0 flex-col justify-between pb-4 text-right ${TYPE.meta}`}
          style={{ color: GREY.faint }}
        >
          <span>{peak}</span>
          <span>{Math.round(peak / 2)}</span>
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

          {/* Scrolls horizontally: the bars keep a fixed pitch rather than
              squeezing to fit, so a long forecast stays readable. Bars are 4px
              on a 7px pitch, so the divider sits at half the series. */}
          <div className="relative flex min-h-0 w-full flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative flex h-full items-end gap-[4px]" style={{ paddingTop: 18 }}>
              {/* Divides delivered from forecast. */}
              <span
                className="pointer-events-none absolute bottom-0 z-10"
                style={{
                  top: 18,
                  left: `${(forecastWeeks.length / 2) * 9 - 2}px`,
                  borderLeft: `1px dashed ${GREY.muted}`,
                }}
                aria-hidden
              />
              <span
                className={`pointer-events-none absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap ${TYPE.meta}`}
                style={{ left: `${(forecastWeeks.length / 2) * 9 - 2}px`, color: GREY.muted }}
                aria-hidden
              >
                Today
              </span>

            {forecastWeeks.map((value, i) => (
              <div
                key={i}
                className="group relative flex h-full shrink-0 cursor-default items-end justify-center"
                style={{ width: 5 }}
                {...bind(i)}
              >
                <div
                  className="chart-bar w-[5px] transition-colors"
                  style={{
                    height: `${(value / peak) * 100}%`,
                    background:
                      active === i ? GREY.text : i >= forecastWeeks.length / 2 ? CHART_ACCENT : GREY.bar,
                    /* 84 bars, so a tight stagger — the sweep reads as one
                       motion rather than a queue. */
                    animationDelay: `${i * 8}ms`,
                  }}
                />
              </div>
            ))}
            </div>
          </div>

          {hovered !== null && (
            <DataTooltip
              anchor={anchor}
              value={`${forecastWeeks[hovered]} units`}
              detail={`Day ${hovered + 1}`}
            />
          )}

          <div className={`mt-1.5 flex h-4 justify-between ${TYPE.meta}`} style={{ color: GREY.faint }}>
            <span>Wk 1</span>
            <span>Wk 4</span>
            <span>Wk 8</span>
            <span>Wk 12</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}

export function RangeToggle({
  ranges = ["Wk", "Mo", "Qtr", "Yr"],
  active = "Qtr",
  onChange,
}: {
  ranges?: string[]
  active?: string
  onChange?: (range: string) => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      {ranges.map((range) => (
        <button
          key={range}
          type="button"
          onClick={() => onChange?.(range)}
          className={`pb-0.5 transition-opacity hover:opacity-70 ${TYPE.control}`}
          style={{
            color: range === active ? GREY.text : GREY.faint,
            borderBottom: `1px solid ${range === active ? GREY.text : "transparent"}`,
          }}
        >
          {range}
        </button>
      ))}
    </div>
  )
}

function EventsPanel({ campaigns }: { campaigns: Campaign[] }) {
  const { index: hovered, anchor, bind } = useHoverIndex()

  return (
    <Panel label="Events">
      <div
        className="mt-8 flex shrink-0 items-baseline justify-between gap-3 pb-2"
        style={{ borderBottom: `1px solid ${GREY.hairline}` }}
      >
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>Campaign</span>
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>Packs claimed</span>
      </div>

      <ul className="mt-5 flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {campaigns.map((campaign, i) => (
          <li
            key={campaign.id}
            className="shrink-0 flex cursor-default flex-col gap-1.5 py-2.5 first:pt-0"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${GREY.hairline}` }}
            {...bind(i)}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={`truncate ${TYPE.itemName}`}
                style={{ color: GREY.text }}
              >
                {campaign.name}
              </span>
              <span className={TYPE.meta} style={{ color: GREY.faint }}>{campaign.eventDate}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: GREY.bar }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(campaign.claimed / campaign.total) * 100}%`, background: GREY.text }}
                />
              </div>
              <span
                className={`shrink-0 text-right ${TYPE.rowValue}`}
              style={{ width: ROW_VALUE_WIDTH, color: GREY.text }}
              >
                {campaign.claimed}/{campaign.total}
              </span>
            </div>

            {campaign.onHold && campaign.missingSkuName && (
              <span className={TYPE.meta} style={{ color: GREY.muted }}>
                Short {campaign.missingQty} · {campaign.missingSkuName}
              </span>
            )}
          </li>
        ))}
      </ul>

      {hovered !== null && (
        <DataTooltip
          anchor={anchor}
          value={`${campaigns[hovered].claimed} of ${campaigns[hovered].total} claimed`}
          detail={`Event ${campaigns[hovered].eventDate}`}
        />
      )}
    </Panel>
  )
}

function MostPopularPanel({ products }: { products: Product[] }) {
  const ranked = [...products]
    .map((product) => ({ product, sold: dispatchVelocity[product.id] ?? 0 }))
    .sort((a, b) => b.sold - a.sold)
  const peak = ranked[0]?.sold ?? 1
  const { index: hovered, anchor, bind } = useHoverIndex()

  return (
    <Panel label="Most Popular">
      <div
        className="mt-8 flex shrink-0 items-baseline justify-between gap-3 pb-2"
        style={{ borderBottom: `1px solid ${GREY.hairline}` }}
      >
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>Product</span>
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>Amount delivered</span>
      </div>

      <ul className="mt-5 flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ranked.map(({ product, sold }, i) => (
          <li
            key={product.id}
            className="shrink-0 flex cursor-default items-center gap-3 py-2.5 first:pt-0"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${GREY.hairline}` }}
            {...bind(i)}
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg" style={{ background: GREY.well }}>
              <Image src={asset(product.thumbnailSrc)} alt="" fill sizes="48px" className="object-contain p-1" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span
                className={`truncate ${TYPE.itemName}`}
                style={{ color: GREY.text }}
              >
                {product.skuName}
              </span>
              <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: GREY.bar }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(sold / peak) * 100}%`, background: GREY.text }}
                />
              </div>
            </div>

            <span
              className={`shrink-0 text-right ${TYPE.rowValue}`}
              style={{ width: ROW_VALUE_WIDTH, color: GREY.text }}
            >
              {sold}
            </span>
          </li>
        ))}
      </ul>

      {hovered !== null && ranked[hovered] && (
        <DataTooltip
          anchor={anchor}
          value={`${ranked[hovered].sold} delivered`}
          detail={ranked[hovered].product.skuName}
        />
      )}
    </Panel>
  )
}

/** Postage spend split by carrier tier. Placeholder data for the mid-fidelity pass. */
const POSTAGE_CATEGORIES = [
  { label: "Next day", value: 1840.5, shipments: 412 },
  { label: "Standard", value: 1216.8, shipments: 968 },
  { label: "International", value: 704.25, shipments: 143 },
  { label: "Tracked 48", value: 358.4, shipments: 286 },
  { label: "Special", value: 118.9, shipments: 24 },
]

const BAR_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-family-body)",
  fontSize: "12px",
  lineHeight: "20px",
  writingMode: "vertical-rl",
  transform: "translateX(-50%) rotate(180deg)",
}

function PostagePanel() {
  const { index: hovered, anchor, bind } = useHoverIndex()
  const total = POSTAGE_CATEGORIES.reduce((sum, c) => sum + c.value, 0)

  /** Axis steps derived from the data, rounded up to a clean interval.
      The ceiling sits just above the tallest bar so bars fill the plot. */
  const peak = Math.max(...POSTAGE_CATEGORIES.map((c) => c.value))
  const step = 500
  const ceiling = Math.ceil(peak / step) * step
  /** Skip the ceiling line itself; the tallest bar already marks that level. */
  const ticks = Array.from({ length: ceiling / step - 1 }, (_, i) => ceiling - (i + 1) * step)
  const money = (v: number) =>
    v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <Panel label="Postage">
      <div className="mt-4 flex shrink-0 flex-col gap-3">
        <p
          className="numeric"
          style={{
            fontFamily: "var(--font-family-display)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--text-h4-size)",
            lineHeight: "var(--text-h4-line-height)",
            letterSpacing: "var(--letter-spacing-tight)",
            color: GREY.text,
          }}
        >
          £{money(total)}
        </p>
        <p className={TYPE.meta} style={{ color: GREY.muted }}>
          Accumulated this month
        </p>
      </div>

      <div className="mt-5 flex justify-end">
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
          Spend
        </span>
      </div>

      <div className="relative mt-2 min-h-0 flex-1">
        {/* Gridlines with the value axis on the right. */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {ticks.map((tick) => (
            <div key={tick} className="flex items-center gap-2">
              <div className="h-px flex-1" style={{ background: GREY.hairline }} />
              <span
                className={`shrink-0 ${TYPE.meta}`}
                style={{ color: GREY.faint, fontSize: "10px", lineHeight: "12px" }}
              >
                £{(tick / 1000).toLocaleString("en-GB", { maximumFractionDigits: 1 })}k
              </span>
            </div>
          ))}
        </div>

        {/* Bars sit on a shared baseline, inset from the axis column. */}
        <div className="absolute inset-y-0 left-0 right-12 flex items-end gap-1">
          {POSTAGE_CATEGORIES.map((category, i) => {
            const pct = (category.value / ceiling) * 100
            return (
              <div
                key={category.label}
                className="relative flex h-full w-[38px] shrink-0 cursor-default items-end"
                {...bind(i)}
              >
                <div
                  className="w-full transition-opacity"
                  style={{
                    height: `${pct}%`,
                    background: CHART_ACCENT,
                    opacity: hovered === null || hovered === i ? 1 : 0.55,
                  }}
                />

                {/* The label reads bottom-to-top from the bar's foot. A short bar
                    lets it run past the top, so it is drawn twice: dark for the
                    part over the panel, white for the part over the bar. */}
                <span
                  className="pointer-events-none absolute bottom-2 left-1/2 whitespace-nowrap"
                  style={{ ...BAR_LABEL, color: GREY.text }}
                >
                  {category.label}
                </span>
                <span
                  className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden"
                  style={{ height: `${pct}%` }}
                  aria-hidden
                >
                  <span
                    className="absolute bottom-2 left-1/2 whitespace-nowrap"
                    style={{ ...BAR_LABEL, color: "#FFFFFF" }}
                  >
                    {category.label}
                  </span>
                </span>

              </div>
            )
          })}
        </div>

        {hovered !== null && (
          <DataTooltip
            anchor={anchor}
            value={`£${money(POSTAGE_CATEGORIES[hovered].value)}`}
            detail={`${POSTAGE_CATEGORIES[hovered].shipments} shipments`}
          />
        )}
      </div>

      <div className="mt-2 flex shrink-0">
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
          Tier
        </span>
      </div>
    </Panel>
  )
}
