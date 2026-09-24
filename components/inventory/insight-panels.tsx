"use client"

import { useState } from "react"
import Image from "next/image"
import type { Campaign, Product } from "@/lib/types"
import { dispatchVelocity, forecastWeeks } from "@/lib/mock-data"
import { GREY, TYPE, ROW_VALUE_WIDTH } from "@/components/mid-fidelity"

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
}: {
  label: string
  children: React.ReactNode
  onExpand?: () => void
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
          <PanelIconButton label={`Expand ${label}`} onClick={onExpand}>
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </PanelIconButton>
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
  const [hovered, setHovered] = useState<number | null>(null)
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

          <div className="relative flex min-h-0 w-full flex-1 items-end justify-between overflow-hidden">
            {forecastWeeks.map((value, i) => (
              <div
                key={i}
                className="group relative flex h-full shrink-0 cursor-default items-end justify-center"
                style={{ width: 4 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="w-[4px] rounded-full transition-colors"
                  style={{
                    height: `${(value / peak) * 100}%`,
                    background:
                      active === i ? GREY.text : i >= forecastWeeks.length / 2 ? GREY.muted : GREY.bar,
                  }}
                />
                {active === i && (
                  <div
                    className="pointer-events-none absolute -top-1 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5 whitespace-nowrap rounded-lg px-2 py-1.5"
                    style={{ background: GREY.text, color: GREY.panel }}
                  >
                    <span className={TYPE.rowValue}>{value} units</span>
                    <span className={TYPE.columnHeader} style={{ opacity: 0.7 }}>
                      Day {i + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

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
            className="shrink-0 flex flex-col gap-1.5 py-2.5 first:pt-0"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${GREY.hairline}` }}
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
    </Panel>
  )
}

function MostPopularPanel({ products }: { products: Product[] }) {
  const ranked = [...products]
    .map((product) => ({ product, sold: dispatchVelocity[product.id] ?? 0 }))
    .sort((a, b) => b.sold - a.sold)
  const peak = ranked[0]?.sold ?? 1

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
            className="shrink-0 flex items-center gap-3 py-2.5 first:pt-0"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${GREY.hairline}` }}
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg" style={{ background: GREY.well }}>
              <Image src={product.thumbnailSrc} alt="" fill sizes="48px" className="object-contain p-1" />
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
    </Panel>
  )
}

/** Postage spend split by carrier tier. Placeholder data for the mid-fidelity pass. */
const POSTAGE_CATEGORIES = [
  { label: "Next day", value: 1840.5, shipments: 412 },
  { label: "Standard", value: 1216.8, shipments: 968 },
  { label: "International", value: 704.25, shipments: 143 },
  { label: "Tracked 48", value: 358.4, shipments: 286 },
]

function PostagePanel() {
  const [hovered, setHovered] = useState<number | null>(null)
  const total = POSTAGE_CATEGORIES.reduce((sum, c) => sum + c.value, 0)
  const ceiling = Math.max(...POSTAGE_CATEGORIES.map((c) => c.value)) * 1.15

  return (
    <Panel label="Postage">
      <div className="mt-3 flex shrink-0 flex-col gap-0.5">
        <p className={TYPE.heroFigure} style={{ color: GREY.text }}>
          £{total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className={TYPE.meta} style={{ color: GREY.muted }}>Accumulated this month</p>
      </div>

      <div className="mt-8 flex min-h-0 flex-1 flex-col">
        <div
          className="flex shrink-0 items-baseline gap-3 pb-2"
          style={{ borderBottom: `1px solid ${GREY.hairline}` }}
        >
          <span className={`w-[86px] shrink-0 ${TYPE.columnHeader}`} style={{ color: GREY.faint }}>
            Tier
          </span>
          <div className="flex-1" />
          <span
            className={`shrink-0 text-right ${TYPE.columnHeader}`}
            style={{ color: GREY.faint, width: ROW_VALUE_WIDTH }}
          >
            Spend
          </span>
        </div>

        <ul className="flex min-h-0 flex-1 flex-col justify-around">
          {POSTAGE_CATEGORIES.map((category, i) => (
            <li
              key={category.label}
              className="relative flex cursor-default items-center gap-3"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className={`w-[86px] shrink-0 truncate ${TYPE.meta} ${hovered === i ? "font-medium" : ""}`}
                style={{ color: hovered === i ? GREY.text : GREY.muted }}
              >
                {category.label}
              </span>

              <div className="relative flex-1">
                <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: GREY.bar }}>
                  <div
                    className="h-full rounded-full transition-colors"
                    style={{
                      width: `${(category.value / ceiling) * 100}%`,
                      background: GREY.text,
                    }}
                  />
                </div>

                {hovered === i && (
                  <div
                    className="pointer-events-none absolute -top-1.5 left-1/2 z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5 whitespace-nowrap rounded-lg px-2.5 py-1.5"
                    style={{ background: GREY.text, color: GREY.panel }}
                  >
                    <span className={TYPE.rowValue}>{category.shipments} shipments</span>
                    <span className={TYPE.columnHeader} style={{ opacity: 0.7 }}>
                      £{(category.value / category.shipments).toFixed(2)} avg
                    </span>
                  </div>
                )}
              </div>

              <span
                className={`shrink-0 text-right ${TYPE.rowValue}`}
                style={{ width: ROW_VALUE_WIDTH, color: GREY.text }}
              >
                £{category.value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}
