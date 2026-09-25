import { TYPE } from "@/components/mid-fidelity"

/**
 * Factory ready date vs a scheduled event. Shown inside the re-order drawer
 * when the delivery lands after the campaign it is meant to serve. Advisory
 * only — it never blocks Approve & Order.
 * Prompt: prompts/05-edge-states.md
 */
export function LeadTimeWarning({
  readyDate,
  eventName,
  eventDate,
}: {
  readyDate: string
  eventName: string
  eventDate: string
}) {
  const days = dayGap(eventDate, readyDate)
  if (days <= 0) return null

  return (
    <div
      className="flex items-start gap-2.5 rounded-lg px-3 py-2.5"
      style={{ background: "var(--color-warning-surface)" }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-warning)"
        strokeWidth="2"
        className="mt-px shrink-0"
        aria-hidden
      >
        <path d="M12 8v5" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="0.9" fill="var(--color-warning)" stroke="none" />
        <path d="M10.3 3.9 2.6 17.5a1.8 1.8 0 0 0 1.6 2.7h15.6a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
      </svg>
      <p className={TYPE.meta} style={{ color: "var(--color-warning)" }}>
        Delivery estimated {readyDate} — {days} day{days === 1 ? "" : "s"} after your scheduled{" "}
        {eventName}.
      </p>
    </div>
  )
}

/** Days the ready date falls after the event. Dates are "MMM D" strings. */
function dayGap(eventDate: string, readyDate: string) {
  const parse = (d: string) => {
    const [mon, day] = d.trim().split(/\s+/)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return months.indexOf(mon) * 31 + Number(day)
  }
  return parse(readyDate) - parse(eventDate)
}
