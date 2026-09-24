/**
 * Temporary greyscale scaffold for the mid-fidelity pass.
 * Colour only — every type style now comes from styles/theme.css.
 * Delete this file once the colour system is ratified.
 */

export const GREY = {
  canvas: "#EFEFEF",
  panel: "#FFFFFF",
  well: "#F7F7F7",
  chrome: "#1C1C1C",
  text: "#1C1C1C",
  muted: "#8A8A8A",
  faint: "#B8B8B8",
  hairline: "#E8E8E8",
  bar: "#DCDCDC",
} as const

/**
 * Sampled from the user's reference button. NOT in tokens.json or theme.css —
 * no purple/violet exists anywhere in the agreed palette. Token decision is open.
 */
export const GRADIENT = "linear-gradient(90deg, #E2617A 0%, #B56CC4 55%, #9B6BEE 100%)"

/**
 * Type roles → design-system styles. Seven jobs, six styles, all from the
 * Swag type sheet. Components reference these class names; nothing sets
 * font-size, line-height or tracking by hand.
 */
export const TYPE = {
  /** 1 · Panel / section title — FORECAST, WAREHOUSE */
  panelTitle: "text-subheading-xs",
  /** 2 · Column header — CAMPAIGN, PACKS CLAIMED, TIER */
  columnHeader: "text-subheading-2xs",
  /** 3 · Hero figure — one per panel. Sora H5. */
  heroFigure: "text-hero-figure numeric",
  /** 4 · Row value — the aligned right-hand column */
  rowValue: "text-paragraph-s numeric",
  /** 5 · Item name — product and campaign names */
  itemName: "text-paragraph-s font-medium",
  /** 6 · Supporting meta — dates, variants, axis ticks */
  meta: "text-paragraph-xs",
  /** 7 · Interactive — buttons, tabs, filters */
  control: "text-button-s",
} as const

/** Fixed width for the row-value column, so right edges align across panels. */
export const ROW_VALUE_WIDTH = 72
