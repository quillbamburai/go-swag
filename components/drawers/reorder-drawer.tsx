"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import type { Campaign, Product } from "@/lib/types"
import { ukSizingMix, campaigns, packMembership, deliveryAddresses } from "@/lib/mock-data"
import { GREY, TYPE } from "@/components/mid-fidelity"
import { LeadTimeWarning } from "@/components/states/lead-time-warning"

/**
 * Low stock → re-order, as a four-step process.
 *
 *   Order    quantity and the UK sizing split
 *   Address  where the stock is delivered
 *   Payment  method, then the commit
 *   Done     confirmation with a receipt
 *
 * Nothing is charged until Place order on the payment step — every step before
 * it is reversible, and Back never loses what was entered.
 * Prompt: prompts/03-reorder-drawer.md
 */

type Step = "order" | "address" | "payment" | "done"

const STEPS: { id: Step; label: string }[] = [
  { id: "order", label: "Order" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
]

const CARDS = [
  { id: "visa-4821", brand: "Visa", last4: "4821", expiry: "04/28" },
  { id: "amex-1009", brand: "Amex", last4: "1009", expiry: "11/27" },
]

export function ReorderDrawer({
  product,
  onClose,
  onApprove,
}: {
  product: Product | null
  onClose: () => void
  onApprove: (product: Product, units: number) => void
}) {
  const [step, setStep] = useState<Step>("order")
  const [qty, setQty] = useState(100)
  const [mix, setMix] = useState(ukSizingMix)
  const [addressId, setAddressId] = useState(deliveryAddresses[0].id)
  const [added, setAdded] = useState<typeof deliveryAddresses>([])
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ label: "", detail: "" })
  const [cardId, setCardId] = useState(CARDS[0].id)
  const [poRef, setPoRef] = useState("")
  const [placing, setPlacing] = useState(false)
  const [orderRef, setOrderRef] = useState("")
  /** Kept so the confirmation stays readable after the parent clears its
      product on approve — otherwise the drawer unmounts mid-receipt. */
  const [placed, setPlaced] = useState<Product | null>(null)

  const shown = product ?? placed
  if (!shown || typeof document === "undefined") return null

  const sizes = ["S", "M", "L", "XL"] as const
  const mixTotal = sizes.reduce((sum, s) => sum + mix[s], 0)
  const goods = qty * shown.unitPriceGbp
  const shipping = 48
  const vat = Math.round((goods + shipping) * 0.2 * 100) / 100
  const total = goods + shipping + vat

  const options = [...deliveryAddresses, ...added]
  const address = options.find((a) => a.id === addressId) ?? options[0]
  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0]

  /** The soonest campaign this SKU is committed to, by calendar date. */
  const committed = packMembership[shown.id]?.names ?? []
  const nextEvent = campaigns
    .filter((c): c is Campaign & { eventDate: string } =>
      committed.includes(c.name) && c.eventDate !== null,
    )
    .sort((a, b) => dayOfYear(a.eventDate) - dayOfYear(b.eventDate))[0]

  const money = (v: number) =>
    v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

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

  const placeOrder = () => {
    setPlacing(true)
    setTimeout(() => {
      setOrderRef(`GS-${Math.floor(10000 + Math.random() * 89999)}`)
      setPlaced(shown)
      setStep("done")
      setPlacing(false)
      onApprove(shown, qty)
    }, 1500)
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

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
        aria-label={`Re-order ${shown.skuName}`}
      >
        <header className="flex shrink-0 flex-col gap-4 px-6 pb-4 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
                {step === "done" ? "Order placed" : "Re-order"}
              </span>
              <h2 className={TYPE.itemName} style={{ color: GREY.text, fontSize: 18 }}>
                {shown.skuName}
              </h2>
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
          </div>

          {/* Where you are in the process. Hidden once the order is placed —
              there is nothing left to step through. */}
          {step !== "done" && (
            <ol className="flex items-center gap-1.5">
              {STEPS.map((s, i) => {
                const reached = i <= stepIndex
                const here = i === stepIndex
                return (
                  <li key={s.id} className="flex flex-1 flex-col gap-1.5">
                    <span
                      className="h-[3px] w-full rounded-full"
                      style={{ background: reached ? GREY.text : GREY.bar }}
                    />
                    <span className={TYPE.meta} style={{ color: here ? GREY.text : GREY.faint }}>
                      {s.label}
                    </span>
                  </li>
                )
              })}
            </ol>
          )}
        </header>

        {/* 40px between sections — measured from the Figma frame, where the
            sections sit 36-44px apart. Tighter than this reads congested. */}
        <div className="flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto px-6 pb-6">
          {step === "order" && (
            <>
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
                    aria-label="Quantity"
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
                      {/* The field holds the unit count; the share sits
                          beneath it, as in the Figma frame. */}
                      <span
                        className="flex items-center gap-1 rounded-lg px-2.5 py-2"
                        style={{ background: GREY.well }}
                      >
                        <input
                          type="number"
                          value={Math.round((qty * mix[size]) / 100)}
                          min={0}
                          onChange={(e) => {
                            const units = Math.max(0, Number(e.target.value))
                            const pct = qty > 0 ? Math.round((units / qty) * 100) : 0
                            setMix({ ...mix, [size]: pct })
                          }}
                          aria-label={`${size} units`}
                          className={`w-full bg-transparent outline-none numeric ${TYPE.rowValue}`}
                          style={{ color: GREY.text }}
                        />
                        <span className={TYPE.meta} style={{ color: GREY.faint }}>
                          units
                        </span>
                      </span>
                      <span className={TYPE.meta} style={{ color: GREY.faint }}>
                        {mix[size]}%
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <section
                className="flex flex-col gap-2 rounded-xl px-4 py-3.5"
                style={{ background: GREY.well }}
              >
                <Line label="Unit price" value={`£${shown.unitPriceGbp.toFixed(2)}`} />
                <Line label="Est. ready" value={shown.leadTimeReadyDate} />
                <span
                  className="mt-1 flex items-baseline justify-between border-t pt-2.5"
                  style={{ borderColor: GREY.hairline }}
                >
                  <span className={TYPE.itemName} style={{ color: GREY.text }}>
                    Goods
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
                    £{money(goods)}
                  </span>
                </span>
              </section>

              {/* Sits closer than a section break: it qualifies the cost
                  above rather than standing on its own. */}
              {nextEvent && (
                <div className="-mt-6">
                  <LeadTimeWarning
                    readyDate={shown.leadTimeReadyDate}
                    eventName={nextEvent.name}
                    eventDate={nextEvent.eventDate}
                  />
                </div>
              )}
            </>
          )}

          {step === "address" && (
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
                {options.map((a) => (
                  <Choice
                    key={a.id}
                    on={a.id === addressId}
                    onSelect={() => setAddressId(a.id)}
                    title={a.label}
                    detail={a.detail}
                  />
                ))}
              </div>

              {adding && (
                <div
                  className="mt-1 flex flex-col gap-2 rounded-xl px-3 py-3"
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
          )}

          {step === "payment" && (
            <>
              <section className="flex flex-col gap-2.5">
                <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
                  Pay with
                </span>
                <div className="flex flex-col gap-1.5">
                  {CARDS.map((c) => (
                    <Choice
                      key={c.id}
                      on={c.id === cardId}
                      onSelect={() => setCardId(c.id)}
                      title={`${c.brand} ending ${c.last4}`}
                      detail={`Expires ${c.expiry}`}
                    />
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-2.5">
                <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
                  PO reference
                </span>
                <input
                  value={poRef}
                  onChange={(e) => setPoRef(e.target.value)}
                  placeholder="Optional — appears on the invoice"
                  className={`rounded-lg px-3 py-2.5 outline-none ${TYPE.rowValue}`}
                  style={{ background: GREY.well, color: GREY.text }}
                />
              </section>

              {/* The whole order, one last time, before anything is charged. */}
              <section
                className="flex flex-col gap-2 rounded-xl px-4 py-3.5"
                style={{ background: GREY.well }}
              >
                <Line label={`${qty} units · ${shown.skuName}`} value={`£${money(goods)}`} />
                <Line label="Shipping" value={`£${money(shipping)}`} />
                <Line label="VAT (20%)" value={`£${money(vat)}`} />
                <span
                  className="mt-1 flex items-baseline justify-between border-t pt-2.5"
                  style={{ borderColor: GREY.hairline }}
                >
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
                    £{money(total)}
                  </span>
                </span>
              </section>

              <section className="flex flex-col gap-3">
                <Summary label="Deliver to" title={address.label} detail={address.detail} />
                <Summary label="Est. ready" title={shown.leadTimeReadyDate} />
              </section>

              {nextEvent && (
                <LeadTimeWarning
                  readyDate={shown.leadTimeReadyDate}
                  eventName={nextEvent.name}
                  eventDate={nextEvent.eventDate}
                />
              )}
            </>
          )}

          {step === "done" && (
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex flex-col items-center gap-3 py-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "var(--color-success-surface)" }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-success)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <p className={TYPE.itemName} style={{ color: GREY.text, fontSize: 16 }}>
                  Order placed
                </p>
                <p className={`text-center ${TYPE.meta}`} style={{ color: GREY.muted }}>
                  {qty} units of {shown.skuName} are in production.
                  <br />
                  Estimated ready {shown.leadTimeReadyDate}.
                </p>
              </div>

              <section
                className="flex flex-col gap-2 rounded-xl px-4 py-3.5"
                style={{ background: GREY.well }}
              >
                <Line label="Order reference" value={orderRef} />
                <Line label="Paid with" value={`${card.brand} ···· ${card.last4}`} />
                {poRef.trim() && <Line label="PO reference" value={poRef.trim()} />}
                <span
                  className="mt-1 flex items-baseline justify-between border-t pt-2.5"
                  style={{ borderColor: GREY.hairline }}
                >
                  <span className={TYPE.itemName} style={{ color: GREY.text }}>
                    Charged
                  </span>
                  <span className={TYPE.rowValue} style={{ color: GREY.text }}>
                    £{money(total)}
                  </span>
                </span>
              </section>

              <Summary label="Delivering to" title={address.label} detail={address.detail} />
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t px-6 py-4" style={{ borderColor: GREY.hairline }}>
          {step === "order" && (
            <Primary onClick={() => setStep("address")} disabled={qty < 1}>
              Continue to address
            </Primary>
          )}

          {step === "address" && (
            <div className="flex items-center gap-2">
              <Secondary onClick={() => setStep("order")}>Back</Secondary>
              <Primary onClick={() => setStep("payment")}>Continue to payment</Primary>
            </div>
          )}

          {step === "payment" && (
            <>
              <div className="flex items-center gap-2">
                <Secondary onClick={() => setStep("address")} disabled={placing}>
                  Back
                </Secondary>
                <Primary onClick={placeOrder} disabled={placing}>
                  {placing ? (
                    <svg
                      className="banner-spinner"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-label="Placing order"
                    >
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                      <path d="M12 3a9 9 0 0 1 9 9" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    `Place order · £${money(total)}`
                  )}
                </Primary>
              </div>
              <p className={`mt-2 text-center ${TYPE.meta}`} style={{ color: GREY.faint }}>
                Your card is charged when the factory confirms.
              </p>
            </>
          )}

          {step === "done" && (
            <div className="flex items-center gap-2">
              <Secondary onClick={onClose}>Done</Secondary>
              <Primary onClick={onClose}>View receipt</Primary>
            </div>
          )}
        </footer>
      </aside>
    </div>,
    document.body,
  )
}

/** A label and its value on one baseline — the drawer's workhorse row. */
function Line({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-baseline justify-between gap-3">
      <span className={TYPE.meta} style={{ color: GREY.muted }}>
        {label}
      </span>
      <span className={`shrink-0 ${TYPE.rowValue}`} style={{ color: GREY.text }}>
        {value}
      </span>
    </span>
  )
}

/** A selectable card — an address or a payment method. */
function Choice({
  on,
  onSelect,
  title,
  detail,
}: {
  on: boolean
  onSelect: () => void
  title: string
  detail: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={on}
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
        {on && <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREY.text }} />}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className={TYPE.rowValue} style={{ color: GREY.text }}>
          {title}
        </span>
        <span className={TYPE.meta} style={{ color: GREY.muted }}>
          {detail}
        </span>
      </span>
    </button>
  )
}

/** A read-back of something chosen on an earlier step. */
function Summary({ label, title, detail }: { label: string; title: string; detail?: string }) {
  return (
    <span className="flex flex-col gap-0.5">
      <span className={TYPE.columnHeader} style={{ color: GREY.faint }}>
        {label}
      </span>
      <span className={TYPE.rowValue} style={{ color: GREY.text }}>
        {title}
      </span>
      {detail && (
        <span className={TYPE.meta} style={{ color: GREY.muted }}>
          {detail}
        </span>
      )}
    </span>
  )
}

function Primary({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-11 w-full flex-1 items-center justify-center rounded-lg transition-opacity hover:opacity-90 disabled:opacity-40 ${TYPE.control}`}
      style={{ background: GREY.text, color: GREY.panel }}
    >
      {children}
    </button>
  )
}

function Secondary({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-11 shrink-0 items-center justify-center rounded-lg px-5 transition-colors hover:bg-[#F0F0F0] disabled:opacity-40 ${TYPE.control}`}
      style={{ color: GREY.text, outline: `1px solid ${GREY.hairline}` }}
    >
      {children}
    </button>
  )
}

/** Rough ordinal for a "MMM D" date — enough to order campaigns by calendar. */
function dayOfYear(date: string) {
  const [mon, day] = date.trim().split(/\s+/)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.indexOf(mon) * 31 + Number(day)
}
