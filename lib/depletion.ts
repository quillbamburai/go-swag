/** Reference "today" so the mid-fidelity mock renders stable dates. */
const TODAY = new Date("2026-10-01T00:00:00Z")

export function runOutDate(depletionDays: number | null): string | null {
  if (depletionDays === null) return null
  const date = new Date(TODAY)
  date.setUTCDate(date.getUTCDate() + depletionDays)
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })
}
