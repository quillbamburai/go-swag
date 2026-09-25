import Image from "next/image"
import type { Product } from "@/lib/types"
import { runOutDate } from "@/lib/depletion"
import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"
import { asset } from "@/lib/asset"

/**
 * Table view of the same SKUs. Mid-fidelity greyscale pass. Not final styling.
 */
export function ProductTable({
  products,
  highlightedProductId,
  onStockUp,
}: {
  products: Product[]
  highlightedProductId?: string | null
  onStockUp: (product: Product) => void
}) {
  return (
    <div className="h-full overflow-y-auto rounded-2xl px-4" style={{ background: GREY.panel }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Product", "Variant", "In stock", "Stock up by", ""].map((heading, i) => (
              <th
                key={heading || i}
                className={`sticky top-0 z-10 py-3 text-left ${TYPE.columnHeader}`}
                style={{
                  color: GREY.faint,
                  textAlign: i === 2 || i === 3 ? "right" : "left",
                  background: GREY.panel,
                  boxShadow: `inset 0 -1px 0 ${GREY.hairline}`,
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isOutOfStock = product.warehouseQty === 0
            const runOut = isOutOfStock ? null : runOutDate(product.depletionDays)
            return (
              <tr
                key={product.id}
                style={{
                  borderBottom: `1px solid ${GREY.hairline}`,
                  outline: product.id === highlightedProductId ? `1.5px solid ${GREY.text}` : undefined,
                }}
              >
                <td className="py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                      <Image src={asset(product.thumbnailSrc)} alt="" fill sizes="36px" className="object-contain" />
                    </div>
                    <span className={TYPE.itemName} style={{ color: GREY.text }}>{product.skuName}</span>
                  </div>
                </td>
                <td className={TYPE.meta} style={{ color: GREY.muted }}>{product.variant}</td>
                <td className={`text-right ${TYPE.rowValue}`} style={{ color: GREY.text }}>
                  {isOutOfStock ? (
                    <span
                      className={`rounded-full px-2 py-[3px] ${TYPE.control}`}
                      style={{ background: GRADIENT, color: "#FFFFFF" }}
                    >
                      Out of stock
                    </span>
                  ) : (
                    product.warehouseQty
                  )}
                </td>
                <td className={`text-right ${TYPE.rowValue}`} style={{ color: GREY.muted }}>
                  {runOut ?? "—"}
                </td>
                <td className="py-2.5 pl-3 text-right">
                  <button
                    type="button"
                    onClick={() => onStockUp(product)}
                    aria-label={`Reorder ${product.skuName}`}
                    className="ml-auto flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                    style={
                      isOutOfStock
                        ? { background: GRADIENT, color: "#FFFFFF" }
                        : { background: GREY.well, color: GREY.text }
                    }
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
