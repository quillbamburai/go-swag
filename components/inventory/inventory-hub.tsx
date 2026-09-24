"use client"

import type { Product } from "@/lib/types"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { ProductCard } from "./product-card"

/**
 * View 1 — warehouse product grid. Out-of-stock sorted first.
 * Mid-fidelity greyscale pass. Not final styling.
 * Prompt: prompts/01-inventory-hub.md
 */
export function InventoryHub({
  products,
  highlightedProductId,
  onStockUp,
  onSeeStatus,
}: {
  products: Product[]
  highlightedProductId?: string | null
  onStockUp: (product: Product) => void
  onSeeStatus: (product: Product) => void
}) {
  const sorted = [...products].sort((a, b) => {
    const aOut = a.warehouseQty === 0 ? 0 : 1
    const bOut = b.warehouseQty === 0 ? 0 : 1
    if (aOut !== bOut) return aOut - bOut
    return a.warehouseQty - b.warehouseQty
  })

  return (
    <div className="flex h-full gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {sorted.map((product) => (
        <div key={product.id} className="h-full w-[240px] shrink-0">
          <ProductCard
            product={product}
            highlighted={product.id === highlightedProductId}
            onStockUp={onStockUp}
            onSeeStatus={onSeeStatus}
          />
        </div>
      ))}
    </div>
  )
}

export function HubSwitcher({
  activeHub,
  onHubChange,
}: {
  activeHub: string
  onHubChange: (hub: "inventory" | "distribution") => void
}) {
  return (
    <div className="flex items-center gap-6">
      <HubTab label="Inventory" active={activeHub === "inventory"} onClick={() => onHubChange("inventory")} />
      <HubTab label="Distribution" active={activeHub === "distribution"} onClick={() => onHubChange("distribution")} />
    </div>
  )
}

function HubTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pb-1 transition-opacity hover:opacity-70 ${TYPE.control} font-medium`}
      style={{
        color: active ? GREY.text : GREY.muted,
        borderBottom: `1.5px solid ${active ? GREY.text : "transparent"}`,
      }}
    >
      {label}
    </button>
  )
}

export function ViewToggle({
  view,
  onViewChange,
}: {
  view: "box" | "table"
  onViewChange: (view: "box" | "table") => void
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: GREY.well }}>
      <ViewButton label="Box view" active={view === "box"} onClick={() => onViewChange("box")}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </ViewButton>
      <ViewButton label="Table view" active={view === "table"} onClick={() => onViewChange("table")}>
        <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
      </ViewButton>
    </div>
  )
}

function ViewButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="flex h-6 w-6 items-center justify-center rounded-md transition-colors"
      style={{
        background: active ? GREY.panel : "transparent",
        color: active ? GREY.text : GREY.faint,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {children}
      </svg>
    </button>
  )
}

export function FilterButton() {
  return (
    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-opacity hover:opacity-70 ${TYPE.control}`}
      style={{ background: GREY.well, color: GREY.text }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
      </svg>
      Filter
    </button>
  )
}

export function AlphaFilter() {
  return (
    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-opacity hover:opacity-70 ${TYPE.control}`}
      style={{ background: GREY.well, color: GREY.text }}
    >
      A–Z
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
