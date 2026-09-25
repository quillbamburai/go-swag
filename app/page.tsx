"use client"

import { useState } from "react"
import { TopRow } from "@/components/layout/top-row"
import { IconRail } from "@/components/layout/icon-rail"
import {
  InventoryHub,
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
      <div className="flex min-h-0 flex-1 gap-4 p-4">
        <IconRail />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Open layout: no header bar — the top row sits on the canvas.
              Inventory's controls sit beside the search; Distribution renders
              its own beside the hero figure. */}
          <TopRow activeHub={activeHub} onHubChange={setActiveHub}>
            {activeHub === "inventory" && (
              <>
                <ViewToggle view={view} onViewChange={setView} />
                <AlphaFilter />
                <FilterButton />
              </>
            )}
          </TopRow>

          {activeHub === "inventory" ? (
            products.length === 0 ? (
              <EmptyOnboarding onAddProduct={() => {}} onImportManifest={() => {}} />
            ) : (
              /* pt-8 replaces the separation the old control row used to give;
                 without it "Warehouse" sits hard under the tabs. */
              <div className="flex min-h-0 flex-1 flex-col gap-6 pt-8">
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

                {/* Fixed height so the panels don't stretch to swallow
                    leftover vertical space when anything above them changes. */}
                <div className="flex shrink-0 flex-col gap-2.5">
                  <h2 className={`shrink-0 ${TYPE.panelTitle}`} style={{ color: GREY.faint }}>
                    Insights
                  </h2>
                  <div className="h-[434px] shrink-0">
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
