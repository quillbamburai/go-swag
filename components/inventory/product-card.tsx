import Image from "next/image"
import type { Product } from "@/lib/types"
import { runOutDate } from "@/lib/depletion"
import { packMembership } from "@/lib/mock-data"
import { GREY, GRADIENT, TYPE } from "@/components/mid-fidelity"

/**
 * One SKU card: stock line, photo, pack membership, name, actions.
 * Mid-fidelity greyscale pass — see design-context/. Not final styling.
 * Prompt: prompts/01-inventory-hub.md
 */
export function ProductCard({
  product,
  highlighted = false,
  onStockUp,
  onSeeStatus,
}: {
  product: Product
  highlighted?: boolean
  onStockUp: (product: Product) => void
  onSeeStatus: (product: Product) => void
}) {
  const isOutOfStock = product.warehouseQty === 0
  const runOut = isOutOfStock ? null : runOutDate(product.depletionDays)
  const membership = packMembership[product.id]

  return (
    <article
      className="flex h-full flex-col rounded-2xl p-3 transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      style={{
        background: GREY.panel,
        outline: highlighted ? `1.5px solid ${GREY.text}` : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        {isOutOfStock ? (
          <span
            className={`rounded-full px-2.5 py-1 ${TYPE.control}`}
            style={{ background: GRADIENT, color: "#FFFFFF" }}
          >
            Out of stock
          </span>
        ) : (
          <>
            <span
              className={`rounded-full px-2.5 py-[3px] ${TYPE.rowValue} font-medium`}
              style={{ color: GREY.text, border: `1.5px solid ${GREY.bar}` }}
            >
              {product.warehouseQty} left
            </span>
            {runOut && (
              <span className={TYPE.meta} style={{ color: GREY.muted }}>
                stock up by {runOut}
              </span>
            )}
          </>
        )}
      </div>

      <div className="relative my-2 min-h-0 flex-1 overflow-hidden rounded-xl">
        <Image
          src={product.thumbnailSrc}
          alt={`${product.skuName} — ${product.variant}`}
          fill
          sizes="240px"
          className="object-contain"
        />
      </div>

      {membership && (
        <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
          {membership.events} {membership.events === 1 ? "event" : "events"} · {membership.packs} packs
        </span>
      )}

      <h3
        className={`mt-1 truncate ${TYPE.itemName}`}
        style={{ color: GREY.text }}
      >
        {product.skuName}
      </h3>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className={`truncate ${TYPE.columnHeader}`} style={{ color: GREY.faint }}>
          {product.variant.split("·")[0].trim()}
        </span>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSeeStatus(product)}
            aria-label={`Allocations for ${product.skuName}`}
            title={membership?.names.join(" · ")}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ background: GREY.well, color: GREY.text }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5" strokeLinecap="round" />
              <circle cx="12" cy="7.75" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onStockUp(product)}
            aria-label={`Reorder ${product.skuName}`}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-80"
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
        </div>
      </div>
    </article>
  )
}
