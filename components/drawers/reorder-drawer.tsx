"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import type { Campaign, Product } from "@/lib/types"
import { ukSizingMix, campaigns, packMembership, deliveryAddresses } from "@/lib/mock-data"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { LeadTimeWarning } from "@/components/states/lead-time-warning"

/**
 * Low stock → re-order. Suggested quantity from depletion velocity, an editable
 * UK sizing matrix, cost, and a single commit. Nothing is charged automatically.
 *
 * If the factory ready date falls after a campaign this SKU is committed to,
 * LeadTimeWarning appears inline — advisory, never blocking.
 * Prompt: prompts/03-reorder-drawer.md
 */
export function ReorderDrawer({
  product,
  onClose,
  onApprove,
}: {
  product: Product | null
  onClose: () => void
  onApprove: (product: Product, units: number) => void
}) {
  const [qty, setQty] = useState(100)
  const [mix, setMix] = useState(ukSizingMix)
  const [phase, setPhase] = useState<"editing" | "working">("editing")
  const [addressId, setAddressId] = useState(deliveryAddresses[0].id)
  /** New addresses live for the session — enough to show the path works. */
  const [added, setAdded] = useState<typeof deliveryAddresses>([])
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ label: "", detail: "" })

  if (!product || typeof document === "undefined") return null

  const total = qty * product.unitPriceGbp
  const sizes = ["S", "M", "L", "XL"] as const
  const mixTotal = sizes.reduce((sum, s) => sum + mix[s], 0)

  /** The soonest campaign this SKU is committed to. Ordered by calendar date,
      not string — "Nov" sorts before "Oct" alphabetically. */
  const committed = packMembership[product.id]?.names ?? []
  const nextEvent = campaigns
    .filter((c): c is Campaign & { eventDate: string } =>
      committed.includes(c.name) && c.eventDate !== null,
    )
    .sort((a, b) => dayOfYear(a.eventDate) - dayOfYear(b.eventDate))[0]

  const options = [...deliveryAddresses, ...added]

  const saveAddress = () => {
    const label = draft.label.trim()
    const detail = draft.detail.trim()
    if (!label || !detail) return
    const entry = { id: `custom-${Date.now()}`, label, detail, kind: "office" as const }
    setAdded((prev) => [...prev, entry])
    setAddressId(entry.id)
    setAdding(false)
    setDraft({ label: "", detail: "" })
  }

  const approve = () => {
    setPhase("working")
    setTimeout(() => {
      onApprove(product, qty)
      setPhase("editing")
    }, 1100)
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div
        className="drawer-scrim absolute inset-0"
        style={{ background: "rgba(28,28,28,0.32)" }}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className="drawer-panel relative flex h-full w-[420px] flex-col"
        style={{ background: GREY.panel }}
        role="dialog"
        aria-label={`Re-order ${product.skuName}`}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 px-6 pb-4 pt-6">
          <div className="flex flex-col gap-1">
            <span className={TYPE.panelTitle} style={{ color: GREY.faint }}>
              Re-order
            </span>
            <h2 className={TYPE.itemName} style={{ color: GREY.text, fontSize: 18 }}>
              {product.skuName}
            </h2>
            <span className={TYPE.meta} style={{ color: GREY.muted }}>
              {product.variant}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-[#F0F0F0]"
            style={{ color: GREY.muted }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5 19 19M19 5 5 19" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-6">
          {/* Suggested quantity, from 30-day depletion velocity. */}
          <section className="flex flex-col gap-2.5">
            <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
              Suggested quantity
            </span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={qty}
                min={0}
                onChange={(e) => setQty(Math.max(0, Number(e.target.value)))}
                className="w-[110px] rounded-lg px-3 py-2 numeric outline-none"
                style={{
                  background: GREY.well,
                  color: GREY.text,
                  fontFamily: "var(--font-family-display)",
                  fontSize: 20,
                }}
              />
              <span className={TYPE.meta} style={{ color: GREY.muted }}>
                units · based on 30-day velocity
              </span>
            </div>
          </section>

          {/* UK sizing matrix, every cell editable. */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
                UK sizing split
              </span>
              <span
                className={TYPE.meta}
                style={{ color: mixTotal === 100 ? GREY.muted : "var(--color-danger)" }}
              >
                {mixTotal}%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <label key={size} className="flex flex-col gap-1.5">
                  <span className={TYPE.meta} style={{ color: GREY.muted }}>
                    {size}
                  </span>
                  <span
                    className="flex items-center gap-1 rounded-lg px-2.5 py-2"
                    style={{ background: GREY.well }}
                  >
                    <input
                      type="number"
                      value={mix[size]}
                      min={0}
                      max={100}
                      onChange={(e) =>
                        setMix({ ...mix, [size]: Math.max(0, Number(e.target.value)) })
                      }
                      className={`w-full bg-transparent outline-none numeric ${TYPE.rowValue}`}
                      style={{ color: GREY.text }}
                    />
                    <span className={TYPE.meta} style={{ color: GREY.faint }}>
                      %
                    </span>
                  </span>
                  <span className={TYPE.meta} style={{ color: GREY.faint }}>
                    {Math.round((qty * mix[size]) / 100)} units
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Cost. */}
          <section className="flex flex-col gap-2 rounded-xl px-4 py-3.5" style={{ background: GREY.well }}>
            <span className="flex items-baseline justify-between">
              <span className={TYPE.meta} style={{ color: GREY.muted }}>
                Unit price
              </span>
              <span className={TYPE.rowValue} style={{ color: GREY.text }}>
                £{product.unitPriceGbp.toFixed(2)}
              </span>
            </span>
            <span className="flex items-baseline justify-between">
              <span className={TYPE.meta} style={{ color: GREY.muted }}>
                Est. ready
              </span>
              <span className={TYPE.rowValue} style={{ color: GREY.text }}>
                {product.leadTimeReadyDate}
              </span>
            </span>
            <span className="mt-1 flex items-baseline justify-between border-t pt-2.5" style={{ borderColor: GREY.hairline }}>
              <span className={TYPE.itemName} style={{ color: GREY.text }}>
                Total
              </span>
              <span
                className="numeric"
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: 22,
                  color: GREY.text,
                }}
              >
                £{total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </span>
          </section>

          {/* Where it ships to. The warehouse is the default; an office can be
              chosen instead, or a new address added. */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
                Deliver to
              </span>
              {!adding && (
                <button
                  type="button"
                  onClick={() => setAdding(true)}
                  className={`transition-opacity hover:opacity-70 ${TYPE.meta}`}
                  style={{ color: GREY.text, textDecoration: "underline" }}
                >
                  Add new
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              {options.map((a) => {
                const on = a.id === addressId
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAddressId(a.id)}
                    className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors"
                    style={{
                      background: on ? GREY.well : "transparent",
                      outline: on ? `1.5px solid ${GREY.text}` : `1px solid ${GREY.hairline}`,
                    }}
                  >
                    <span
                      className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                      style={{ border: `1.5px solid ${on ? GREY.text : GREY.bar}` }}
                    >
                      {on && (
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: GREY.text }}
                        />
                      )}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className={TYPE.rowValue} style={{ color: GREY.text }}>
                        {a.label}
                      </span>
                      <span className={TYPE.meta} style={{ color: GREY.muted }}>
                        {a.detail}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {adding && (
              <div
                className="flex flex-col gap-2 rounded-xl px-3 py-3"
                style={{ outline: `1px solid ${GREY.hairline}` }}
              >
                <input
                  autoFocus
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  placeholder="Name, e.g. Bristol office"
                  className={`rounded-lg px-2.5 py-2 outline-none ${TYPE.rowValue}`}
                  style={{ background: GREY.well, color: GREY.text }}
                />
                <input
                  value={draft.detail}
                  onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
                  placeholder="Street, city, postcode"
                  className={`rounded-lg px-2.5 py-2 outline-none ${TYPE.meta}`}
                  style={{ background: GREY.well, color: GREY.text }}
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={saveAddress}
                    disabled={!draft.label.trim() || !draft.detail.trim()}
                    className={`rounded-lg px-3 py-1.5 transition-opacity hover:opacity-90 disabled:opacity-40 ${TYPE.control}`}
                    style={{ background: GREY.text, color: GREY.panel }}
                  >
                    Save address
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdding(false)
                      setDraft({ label: "", detail: "" })
                    }}
                    className={`rounded-lg px-3 py-1.5 transition-opacity hover:opacity-70 ${TYPE.control}`}
                    style={{ color: GREY.muted }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          {nextEvent && (
            <LeadTimeWarning
              readyDate={product.leadTimeReadyDate}
              eventName={nextEvent.name}
              eventDate={nextEvent.eventDate}
            />
          )}
        </div>

        {/* Approve is the only commit. */}
        <footer className="shrink-0 border-t px-6 py-4" style={{ borderColor: GREY.hairline }}>
          <button
            type="button"
            onClick={approve}
            disabled={phase === "working"}
            className={`flex h-11 w-full items-center justify-center rounded-lg transition-opacity hover:opacity-90 ${TYPE.control}`}
            style={{ background: GREY.text, color: GREY.panel }}
          >
            {phase === "working" ? (
              <svg className="banner-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-label="Ordering">
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                <path d="M12 3a9 9 0 0 1 9 9" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              `Approve & order ${qty} units`
            )}
          </button>
          <p className={`mt-2 text-center ${TYPE.meta}`} style={{ color: GREY.faint }}>
            Nothing is charged until the factory confirms.
          </p>
        </footer>
      </aside>
    </div>,
    document.body,
  )
}

/** Rough ordinal for a "MMM D" date — enough to order campaigns by calendar. */
function dayOfYear(date: string) {
  const [mon, day] = date.trim().split(/\s+/)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return months.indexOf(mon) * 31 + Number(day)
}
