"use client"

import { useState } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { IconRail } from "@/components/layout/icon-rail"
import {
  InventoryHub,
  HubSwitcher,
  AlphaFilter,
  ViewToggle,
  FilterButton,
} from "@/components/inventory/inventory-hub"
import { ProductTable } from "@/components/inventory/product-table"
import { InsightPanels } from "@/components/inventory/insight-panels"
import { DistributionHub } from "@/components/distribution/distribution-hub"
import { EmptyOnboarding } from "@/components/states/empty-onboarding"
import { products as initialProducts, campaigns, dispatches } from "@/lib/mock-data"
import { GREY, TYPE } from "@/components/mid-fidelity"
import type { Campaign, HubId, Product } from "@/lib/types"

/**
 * Plus home: rail + header, centred hub switcher, product grid, insight panels.
 * Mid-fidelity greyscale pass. Not final styling.
 */
export default function Page() {
  const [activeHub, setActiveHub] = useState<HubId>("inventory")
  const [products] = useState<Product[]>(initialProducts)
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null)
  const [view, setView] = useState<"box" | "table">("box")

  const sortedProducts = [...products].sort((a, b) => {
    const aOut = a.warehouseQty === 0 ? 0 : 1
    const bOut = b.warehouseQty === 0 ? 0 : 1
    if (aOut !== bOut) return aOut - bOut
    return a.warehouseQty - b.warehouseQty
  })

  function handleStockUpMissingSku(campaign: Campaign) {
    const target = products.find((p) => p.skuName === campaign.missingSkuName)
    setHighlightedProductId(target?.id ?? null)
    setActiveHub("inventory")
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: GREY.canvas }}>
      <AppHeader />

      <div className="flex min-h-0 flex-1 gap-4 p-4">
        <IconRail />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div className="flex-1" />
            <HubSwitcher activeHub={activeHub} onHubChange={setActiveHub} />
            {/* Distribution renders A-Z and Filter beside its hero figure. */}
            <div className="flex flex-1 items-center justify-end gap-2">
              {activeHub === "inventory" && (
                <>
                  <ViewToggle view={view} onViewChange={setView} />
                  <AlphaFilter />
                  <div className="ml-6">
                    <FilterButton />
                  </div>
                </>
              )}
            </div>
          </div>

          {activeHub === "inventory" ? (
            products.length === 0 ? (
              <EmptyOnboarding onAddProduct={() => {}} onImportManifest={() => {}} />
            ) : (
              <div className="flex min-h-0 flex-1 flex-col gap-6">
                <div className="flex shrink-0 flex-col gap-2.5">
                  <div className="flex shrink-0 items-baseline justify-between">
                    <h2 className={TYPE.panelTitle} style={{ color: GREY.faint }}>Warehouse</h2>
                    <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
                      {products.length} SKUs
                    </span>
                  </div>
                  <div className="h-[340px] shrink-0">
                    {view === "box" ? (
                      <InventoryHub
                        products={products}
                        highlightedProductId={highlightedProductId}
                        onStockUp={() => {}}
                        onSeeStatus={() => {}}
                      />
                    ) : (
                      <ProductTable
                        products={sortedProducts}
                        highlightedProductId={highlightedProductId}
                        onStockUp={() => {}}
                      />
                    )}
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-2.5">
                  <h2 className={`shrink-0 ${TYPE.panelTitle}`} style={{ color: GREY.faint }}>
                    Insights
                  </h2>
                  <div className="min-h-0 flex-1">
                    <InsightPanels products={products} campaigns={campaigns} />
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <DistributionHub
                campaigns={campaigns}
                dispatches={dispatches}
                onApproveSubstitute={() => {}}
                onStockUpMissingSku={handleStockUpMissingSku}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
