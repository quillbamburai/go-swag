import type { Campaign, Dispatch, Product } from "./types"

export const ukSizingMix: Record<"S" | "M" | "L" | "XL", number> = {
  S: 15,
  M: 35,
  L: 35,
  XL: 15,
}

export const products: Product[] = [
  {
    id: "tshirt-teal",
    skuName: "Teal Crew T-Shirt",
    variant: "Custom print · Organic cotton",
    thumbnailLabel: "TEE",
    thumbnailSrc: "/products/tshirt-teal.png",
    warehouseQty: 10,
    depletionDays: 10,
    pendingUnits: null,
    pendingArrival: null,
    status: "low-stock",
    unitPriceGbp: 18,
    leadTimeReadyDate: "Oct 14",
  },
  {
    id: "sweatshirt-sky-blue",
    skuName: "Sky Blue Crewneck",
    variant: "Sky blue · Organic cotton",
    thumbnailLabel: "SWT",
    thumbnailSrc: "/products/sweatshirt-sky-blue.png",
    warehouseQty: 0,
    depletionDays: 0,
    pendingUnits: null,
    pendingArrival: null,
    status: "low-stock",
    unitPriceGbp: 28,
    leadTimeReadyDate: "Oct 14",
  },
  {
    id: "backpack-classic-black",
    skuName: "Classic Backpack",
    variant: "Black · 15L",
    thumbnailLabel: "BAG",
    thumbnailSrc: "/products/backpack-classic-black.png",
    warehouseQty: 42,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 34,
    leadTimeReadyDate: "Oct 21",
  },
  {
    id: "rolltop-backpack-olive",
    skuName: "Rolltop Backpack",
    variant: "Olive · Water-resistant",
    thumbnailLabel: "BAG",
    thumbnailSrc: "/products/rolltop-backpack-olive.png",
    warehouseQty: 6,
    depletionDays: 18,
    pendingUnits: 60,
    pendingArrival: "Oct 14",
    status: "in-production",
    unitPriceGbp: 42,
    leadTimeReadyDate: "Oct 14",
  },
  {
    id: "rolltop-backpack-black",
    skuName: "Rolltop Backpack",
    variant: "Black · Water-resistant",
    thumbnailLabel: "BAG",
    thumbnailSrc: "/products/rolltop-backpack-black.png",
    warehouseQty: 27,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 42,
    leadTimeReadyDate: "Oct 21",
  },
  {
    id: "backpack-bungee-black",
    skuName: "Bungee Backpack",
    variant: "Black · Laptop compartment",
    thumbnailLabel: "BAG",
    thumbnailSrc: "/products/backpack-bungee-black.png",
    warehouseQty: 8,
    depletionDays: 12,
    pendingUnits: null,
    pendingArrival: null,
    status: "low-stock",
    unitPriceGbp: 38,
    leadTimeReadyDate: "Oct 18",
  },
  {
    id: "duffel-bag-olive",
    skuName: "Weekend Duffel",
    variant: "Olive · 45L",
    thumbnailLabel: "DUF",
    thumbnailSrc: "/products/duffel-bag-olive.png",
    warehouseQty: 15,
    depletionDays: null,
    pendingUnits: 40,
    pendingArrival: "Oct 20",
    status: "in-production",
    unitPriceGbp: 46,
    leadTimeReadyDate: "Oct 20",
  },
  {
    id: "laptop-sleeve-olive",
    skuName: "Laptop Sleeve",
    variant: "Olive · 13-14 inch",
    thumbnailLabel: "SLV",
    thumbnailSrc: "/products/laptop-sleeve-olive.png",
    warehouseQty: 54,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 16,
    leadTimeReadyDate: "Oct 21",
  },
  {
    id: "wash-bag-black",
    skuName: "Toiletry Wash Bag",
    variant: "Black · Water-resistant",
    thumbnailLabel: "BAG",
    thumbnailSrc: "/products/wash-bag-black.png",
    warehouseQty: 0,
    depletionDays: 0,
    pendingUnits: null,
    pendingArrival: null,
    status: "low-stock",
    unitPriceGbp: 14,
    leadTimeReadyDate: "Oct 16",
  },
  {
    id: "tumbler-bamboo-lid",
    skuName: "Insulated Tumbler",
    variant: "Black · Bamboo lid",
    thumbnailLabel: "CUP",
    thumbnailSrc: "/products/tumbler-bamboo-lid.png",
    warehouseQty: 31,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 12,
    leadTimeReadyDate: "Oct 21",
  },
  {
    id: "bucket-hat-navy",
    skuName: "Bucket Hat",
    variant: "Navy · One size",
    thumbnailLabel: "HAT",
    thumbnailSrc: "/products/bucket-hat-navy.png",
    warehouseQty: 22,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 15,
    leadTimeReadyDate: "Oct 21",
  },
  {
    id: "beanie-black",
    skuName: "Ribbed Beanie",
    variant: "Black · One size",
    thumbnailLabel: "HAT",
    thumbnailSrc: "/products/beanie-black.png",
    warehouseQty: 9,
    depletionDays: 14,
    pendingUnits: null,
    pendingArrival: null,
    status: "low-stock",
    unitPriceGbp: 11,
    leadTimeReadyDate: "Oct 17",
  },
  {
    id: "notebook-canvas",
    skuName: "Canvas Notebook",
    variant: "Charcoal · A5",
    thumbnailLabel: "NBK",
    thumbnailSrc: "/products/notebook-canvas.png",
    warehouseQty: 68,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 9,
    leadTimeReadyDate: "Oct 21",
  },
  {
    id: "power-bank-silver",
    skuName: "Power Bank",
    variant: "Silver · 10,000mAh",
    thumbnailLabel: "PWR",
    thumbnailSrc: "/products/power-bank-silver.png",
    warehouseQty: 0,
    depletionDays: 0,
    pendingUnits: null,
    pendingArrival: null,
    status: "low-stock",
    unitPriceGbp: 24,
    leadTimeReadyDate: "Oct 14",
  },
  {
    id: "lunch-box-set",
    skuName: "Lunch Box Set",
    variant: "Black · Cutlery included",
    thumbnailLabel: "LNC",
    thumbnailSrc: "/products/lunch-box-set.png",
    warehouseQty: 19,
    depletionDays: null,
    pendingUnits: null,
    pendingArrival: null,
    status: "healthy",
    unitPriceGbp: 19,
    leadTimeReadyDate: "Oct 21",
  },
]

export const campaigns: Campaign[] = [
  {
    id: "q4-onboarding",
    name: "Q4 Onboarding Batch",
    claimed: 18,
    total: 25,
    eventDate: "Oct 11",
    onHold: true,
    holdMessage: "15 Onboarding Packs on hold — Missing 15 Sky Blue Crewnecks.",
    missingSkuName: "Sky Blue Crewneck",
    missingQty: 15,
  },
  {
    id: "q4-offsite",
    name: "Q4 Offsite",
    claimed: 42,
    total: 60,
    eventDate: "Oct 17",
    onHold: false,
    holdMessage: null,
    missingSkuName: null,
    missingQty: null,
  },
  {
    id: "partner-summit",
    name: "Partner Summit",
    claimed: 88,
    total: 120,
    eventDate: "Nov 04",
    onHold: false,
    holdMessage: null,
    missingSkuName: null,
    missingQty: null,
  },
  {
    id: "new-starter-nov",
    name: "New Starter Packs",
    claimed: 9,
    total: 30,
    eventDate: "Nov 18",
    onHold: false,
    holdMessage: null,
    missingSkuName: null,
    missingQty: null,
  },
]

/** Which campaigns/packs each SKU is allocated to. */
export const packMembership: Record<string, { events: number; packs: number; names: string[] }> = {
  "sweatshirt-sky-blue": { events: 2, packs: 40, names: ["Q4 Onboarding Batch", "New Starter Packs"] },
  "tshirt-teal": { events: 3, packs: 115, names: ["Q4 Onboarding Batch", "Q4 Offsite", "Partner Summit"] },
  "tumbler-bamboo-lid": { events: 2, packs: 85, names: ["Q4 Offsite", "Partner Summit"] },
  "notebook-canvas": { events: 2, packs: 90, names: ["Partner Summit", "New Starter Packs"] },
  "beanie-black": { events: 1, packs: 60, names: ["Q4 Offsite"] },
  "backpack-classic-black": { events: 1, packs: 30, names: ["New Starter Packs"] },
  "bucket-hat-navy": { events: 1, packs: 60, names: ["Q4 Offsite"] },
  "laptop-sleeve-olive": { events: 1, packs: 120, names: ["Partner Summit"] },
  "power-bank-silver": { events: 2, packs: 145, names: ["Q4 Offsite", "Partner Summit"] },
  "wash-bag-black": { events: 1, packs: 25, names: ["Q4 Onboarding Batch"] },
  "lunch-box-set": { events: 1, packs: 30, names: ["New Starter Packs"] },
  "rolltop-backpack-black": { events: 1, packs: 120, names: ["Partner Summit"] },
  "rolltop-backpack-olive": { events: 1, packs: 60, names: ["Q4 Offsite"] },
  "backpack-bungee-black": { events: 1, packs: 25, names: ["Q4 Onboarding Batch"] },
  "duffel-bag-olive": { events: 1, packs: 60, names: ["Q4 Offsite"] },
}

/** Units dispatched over the trailing 30 days — what "popular" actually means here. */
export const dispatchVelocity: Record<string, number> = {
  "tshirt-teal": 264,
  "sweatshirt-sky-blue": 198,
  "tumbler-bamboo-lid": 145,
  "notebook-canvas": 132,
  "beanie-black": 96,
  "backpack-classic-black": 74,
  "bucket-hat-navy": 61,
  "laptop-sleeve-olive": 48,
  "power-bank-silver": 44,
  "wash-bag-black": 37,
  "lunch-box-set": 29,
  "rolltop-backpack-black": 22,
  "rolltop-backpack-olive": 18,
  "backpack-bungee-black": 15,
  "duffel-bag-olive": 11,
}

/** Projected daily dispatch volume, next 12 weeks (84 days). Index 0 = today. */
export const forecastWeeks: number[] = [
  58, 64, 55, 71, 82, 76, 45, 61, 69, 59, 78, 88, 81, 48, 66, 73, 63, 84, 94, 86, 52, 71, 79,
  68, 90, 101, 92, 56, 76, 85, 74, 97, 108, 99, 60, 82, 91, 80, 104, 116, 106, 64, 88, 98, 86,
  112, 124, 114, 69, 94, 105, 92, 119, 133, 122, 74, 101, 112, 98, 127, 142, 130, 79, 108, 120,
  105, 136, 152, 139, 84, 115, 128, 112, 145, 162, 148, 90, 123, 137, 120, 155, 173, 158, 96,
]

export const dispatches: Dispatch[] = [
  {
    id: "shp-1001",
    recipient: "Amelia Chen",
    destination: "London, UK",
    campaign: "Onboarding Pack",
    campaignKind: "pack",
    carrier: "DHL Express",
    method: "Next Day",
    tracking: "15501234567890",
    status: "in-transit",
    postageGbp: 8.5,
    dispatchedAt: "12 Oct · 09:24",
  },
  {
    id: "shp-1002",
    recipient: "Marcus Webb",
    destination: "Manchester, UK",
    campaign: "CES 2027",
    campaignKind: "event",
    carrier: "DPD",
    method: "Tracked 48",
    tracking: "15501234567891",
    status: "delivered",
    postageGbp: 4.2,
    dispatchedAt: "12 Oct · 09:31",
  },
  {
    id: "shp-1003",
    recipient: "Priya Raman",
    destination: "Berlin, DE",
    campaign: "Promotion Pack",
    campaignKind: "pack",
    carrier: "DHL Express",
    method: "International",
    tracking: "15501234567892",
    status: "in-transit",
    postageGbp: 14.8,
    dispatchedAt: "12 Oct · 10:02",
  },
  {
    id: "shp-1004",
    recipient: "Tom Okafor",
    destination: "Dublin, IE",
    campaign: "MWC Barcelona",
    campaignKind: "event",
    carrier: "FedEx",
    method: "International",
    tracking: "15501234567893",
    status: "exception",
    postageGbp: 12.35,
    dispatchedAt: "12 Oct · 10:15",
  },
  {
    id: "shp-1005",
    recipient: "Sofia Almeida",
    destination: "Lisbon, PT",
    campaign: "Retirement Pack",
    campaignKind: "pack",
    carrier: "DHL Express",
    method: "International",
    tracking: "15501234567894",
    status: "delivered",
    postageGbp: 13.9,
    dispatchedAt: "12 Oct · 11:40",
  },
  {
    id: "shp-1006",
    recipient: "James Whitfield",
    destination: "Leeds, UK",
    campaign: "SXSW 2027",
    campaignKind: "event",
    carrier: "DPD",
    method: "Tracked 48",
    tracking: "15501234567895",
    status: "preparing",
    postageGbp: 4.2,
    dispatchedAt: "13 Oct · 08:05",
  },
  {
    id: "shp-1007",
    recipient: "Nina Kowalski",
    destination: "Warsaw, PL",
    campaign: "Onboarding Pack",
    campaignKind: "pack",
    carrier: "FedEx",
    method: "International",
    tracking: "15501234567896",
    status: "in-transit",
    postageGbp: 11.75,
    dispatchedAt: "13 Oct · 08:22",
  },
  {
    id: "shp-1008",
    recipient: "Daniel Park",
    destination: "New York, US",
    campaign: "CES 2027",
    campaignKind: "event",
    carrier: "DHL Express",
    method: "International",
    tracking: "15501234567897",
    status: "exception",
    postageGbp: 22.4,
    dispatchedAt: "13 Oct · 09:10",
  },
  {
    id: "shp-1009",
    recipient: "Hannah Blake",
    destination: "Bristol, UK",
    campaign: "Promotion Pack",
    campaignKind: "pack",
    carrier: "DPD",
    method: "Next Day",
    tracking: "15501234567898",
    status: "delivered",
    postageGbp: 6.9,
    dispatchedAt: "13 Oct · 09:55",
  },
  {
    id: "shp-1010",
    recipient: "Oliver Grant",
    destination: "Edinburgh, UK",
    campaign: "SXSW 2027",
    campaignKind: "event",
    carrier: "DPD",
    method: "Tracked 48",
    tracking: "15501234567899",
    status: "preparing",
    postageGbp: 4.2,
    dispatchedAt: "13 Oct · 10:30",
  },
]

/** Six dispatch streams per month, drawn as a stepped-opacity bar group. */
export const packStreams: string[] = [
  "Onboarding",
  "Promotion",
  "Retirement",
  "Events",
  "Campaigns",
  "Ad hoc",
]

/** Monthly dispatch counts, one value per stream. */
/**
 * Departments ordering swag, in bar order within each month group. A mid-size
 * tech company: the conference events and lifecycle packs in this file belong
 * to the same business.
 */
export const departments = [
  "Engineering",
  "Sales",
  "Marketing",
  "Customer Success",
  "People",
  "Operations",
] as const

/** Units dispatched per department, per month — one value per department. */
export const monthlyPacks: { month: string; values: number[] }[] = [
  { month: "Nov 26", values: [91, 80, 134, 105, 85, 63] },
  { month: "Dec 26", values: [242, 201, 281, 312, 255, 170] },
  { month: "Jan 27", values: [365, 303, 423, 384, 334, 272] },
  { month: "Feb 27", values: [188, 164, 232, 205, 171, 120] },
  { month: "Mar 27", values: [274, 241, 318, 289, 246, 183] },
  { month: "Apr 27", values: [212, 187, 268, 231, 198, 141] },
  { month: "May 27", values: [331, 288, 392, 356, 302, 228] },
  { month: "Jun 27", values: [156, 138, 196, 174, 149, 108] },
  { month: "Jul 27", values: [298, 262, 349, 318, 271, 205] },
  { month: "Aug 27", values: [204, 179, 258, 224, 191, 137] },
  { month: "Sep 27", values: [386, 338, 447, 408, 351, 264] },
  { month: "Oct 27", values: [248, 218, 312, 276, 235, 172] },
]

/** Pack-type lines drawn over the departmental bars — the chart's second
    dimension: which kind of pack drove the volume, not which team ordered it. */
/**
 * Department trend lines, taken directly from the "BUILT — Distribution" frame
 * (Vector 38 / 39 / 40). Each line is a three-segment cubic bezier, stored
 * normalised: x and y both run 0→1 across the plot, so the same geometry
 * redraws at any chart size. Values are the Figma path data divided by the
 * chart group's 1287 × 161 bounds, with each vector's own y-offset folded in
 * (38 starts 28px down the band, 40 starts 52px down, 39 at the top).
 */
export const packTypeTrend: {
  packType: string
  style: "solid" | "light" | "dotted"
  /** Units per month, sampled from the curve below — the shape is the source. */
  values: number[]
  /** [x, y] anchors and control points, normalised 0→1. */
  curve: { p0: [number, number]; segs: [number, number, number, number, number, number][] }
}[] = [
  {
    packType: "Onboarding",
    values: [580, 520, 390, 220, 90, 10, 30, 90, 180, 290, 400, 500],
    style: "dotted",
    // Vector 39 — dips to the floor mid-chart, then climbs hard to the ceiling.
    curve: {
      p0: [0, 0.4627],
      segs: [
        [0.2079, 0.4627, 0.2933, 0.9683, 0.4870, 0.9967],
        [0.6425, 0.9547, 0.7827, 0.7292, 1, 0.5],
      ],
    },
  },
  {
    packType: "Promotions",
    values: [510, 550, 620, 730, 820, 880, 910, 900, 880, 850, 830, 810],
    style: "solid",
    // Vector 38 — the 2px line: rises steeply out of the low left, then flattens.
    curve: {
      p0: [0, 0.5416],
      segs: [
        [0.2079, 0.5416, 0.2933, 0.2505, 0.4870, 0.1862],
        [0.6425, 0.1345, 0.7827, 0.2624, 1, 0.2624],
      ],
    },
  },
  {
    packType: "Retirement",
    values: [510, 540, 590, 660, 720, 740, 730, 650, 560, 470, 400, 360],
    style: "light",
    // Vector 40 — peaks in the middle, then plunges to the lowest point right.
    curve: {
      p0: [0, 0.5391],
      segs: [
        [0.2079, 0.5391, 0.2929, 0.3230, 0.4870, 0.3230],
        [0.6268, 0.3230, 0.7827, 0.6759, 1, 0.6759],
      ],
    },
  },
]

/** Events view — lead time between order and event date, against factory lead time. */
export const FACTORY_LEAD_DAYS = 14

export const eventLeadTimes: { event: string; date: string; leadDays: number; packs: number }[] = [
  { event: "Q4 Onboarding Batch", date: "Oct 11", leadDays: 9, packs: 25 },
  { event: "Q4 Offsite", date: "Oct 17", leadDays: 21, packs: 60 },
  { event: "Partner Summit", date: "Nov 04", leadDays: 32, packs: 120 },
  { event: "New Starter Packs", date: "Nov 18", leadDays: 11, packs: 30 },
  { event: "London Tech Week", date: "Dec 02", leadDays: 26, packs: 180 },
]

/** Outbound share by region. */
export const geographicSplit: { region: string; share: number }[] = [
  { region: "UK", share: 60 },
  { region: "EU", share: 25 },
  { region: "US", share: 15 },
]

/** Claim-link completion per pack type — the three donuts in the Claim Links panel. */
export const claimRates: { label: string; pct: number }[] = [
  { label: "Onboarding", pct: 87 },
  { label: "Promotion", pct: 48 },
  { label: "Retirement", pct: 18 },
]

/**
 * Destination split for the Country Location panel. `delta` is the
 * period-on-period movement shown beside each share.
 */
export const countryLocation: { country: string; share: number; delta: number }[] = [
  { country: "C.Europe", share: 27, delta: 1.2 },
  { country: "US", share: 23, delta: 3.2 },
  { country: "UK", share: 50, delta: 2.2 },
]
