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
  { month: "Nov 26", values: [121, 82, 195, 65, 169, 131] },
  { month: "Dec 26", values: [79, 210, 73, 189, 83, 89] },
  { month: "Jan 27", values: [233, 379, 123, 159, 306, 423] },
  { month: "Feb 27", values: [340, 262, 511, 112, 461, 216] },
  { month: "Mar 27", values: [164, 152, 240, 473, 181, 365] },
  { month: "Apr 27", values: [342, 235, 305, 111, 110, 168] },
  { month: "May 27", values: [300, 358, 177, 268, 224, 172] },
  { month: "Jun 27", values: [120, 207, 194, 286, 247, 132] },
  { month: "Jul 27", values: [239, 67, 127, 194, 73, 141] },
  { month: "Aug 27", values: [46, 161, 178, 143, 198, 96] },
  { month: "Sep 27", values: [264, 171, 168, 236, 223, 365] },
  { month: "Oct 27", values: [202, 228, 168, 237, 281, 143] },
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
  /** Units per month. These sum to each month's bar total — the lines explain
      the bars beneath them: which kind of pack drove that month's volume. */
  values: number[]
  /** [x, y] anchors and control points, normalised 0→1. Derived from `values`
      by Catmull-Rom interpolation, so the curve passes through every monthly
      point rather than being drawn independently of the data. */
  curve: { p0: [number, number]; segs: [number, number, number, number, number, number][] }
}[] = [
  {
    packType: "Onboarding",
    style: "dotted",
    values: [353, 374, 816, 795, 482, 283, 277, 220, 183, 231, 528, 583],
    curve: {
      p0: [0, 0.6474],
      segs: [
        [0.0151, 0.643, 0.0606, 0.7176, 0.0909, 0.6212],
        [0.1212, 0.5248, 0.1515, 0.1567, 0.1818, 0.069],
        [0.2121, -0.0187, 0.2424, 0.0257, 0.2727, 0.0952],
        [0.303, 0.1648, 0.3333, 0.3797, 0.3636, 0.4863],
        [0.3939, 0.5929, 0.4242, 0.6922, 0.4545, 0.7349],
        [0.4848, 0.7776, 0.5152, 0.7293, 0.5455, 0.7424],
        [0.5758, 0.7555, 0.6061, 0.794, 0.6364, 0.8136],
        [0.6667, 0.8332, 0.697, 0.8621, 0.7273, 0.8598],
        [0.7576, 0.8575, 0.7879, 0.8717, 0.8182, 0.7999],
        [0.8485, 0.7281, 0.8788, 0.5021, 0.9091, 0.4288],
        [0.9394, 0.3555, 0.9849, 0.3715, 1, 0.3601],
      ],
    },
  },
  {
    packType: "Promotions",
    style: "solid",
    values: [126, 135, 412, 696, 764, 701, 805, 534, 280, 194, 259, 208],
    curve: {
      p0: [0, 0.931],
      segs: [
        [0.0151, 0.9291, 0.0606, 0.9793, 0.0909, 0.9198],
        [0.1212, 0.8602, 0.1515, 0.6905, 0.1818, 0.5737],
        [0.2121, 0.4569, 0.2424, 0.2922, 0.2727, 0.2189],
        [0.303, 0.1456, 0.3333, 0.1349, 0.3636, 0.1339],
        [0.3939, 0.1328, 0.4242, 0.2211, 0.4545, 0.2126],
        [0.4848, 0.2041, 0.5152, 0.0479, 0.5455, 0.0827],
        [0.5758, 0.1175, 0.6061, 0.312, 0.6364, 0.4213],
        [0.6667, 0.5306, 0.697, 0.6678, 0.7273, 0.7386],
        [0.7576, 0.8094, 0.7879, 0.8417, 0.8182, 0.8461],
        [0.8485, 0.8505, 0.8788, 0.7678, 0.9091, 0.7649],
        [0.9394, 0.762, 0.9849, 0.818, 1, 0.8286],
      ],
    },
  },
  {
    packType: "Retirement",
    style: "light",
    values: [283, 213, 395, 411, 329, 287, 417, 431, 377, 397, 640, 467],
    curve: {
      p0: [0, 0.7349],
      segs: [
        [0.0151, 0.7495, 0.0606, 0.8456, 0.0909, 0.8223],
        [0.1212, 0.799, 0.1515, 0.6362, 0.1818, 0.595],
        [0.2121, 0.5538, 0.2424, 0.5613, 0.2727, 0.575],
        [0.303, 0.5887, 0.3333, 0.6516, 0.3636, 0.6774],
        [0.3939, 0.7032, 0.4242, 0.7482, 0.4545, 0.7299],
        [0.4848, 0.7116, 0.5152, 0.5975, 0.5455, 0.5675],
        [0.5758, 0.5375, 0.6061, 0.5417, 0.6364, 0.55],
        [0.6667, 0.5583, 0.697, 0.6103, 0.7273, 0.6174],
        [0.7576, 0.6245, 0.7879, 0.6472, 0.8182, 0.5925],
        [0.8485, 0.5378, 0.8788, 0.3035, 0.9091, 0.2889],
        [0.9394, 0.2743, 0.9849, 0.469, 1, 0.505],
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

/** Where a re-order can be delivered. The warehouse is the default: stock
    lands there and is picked into packs from there. */
export const deliveryAddresses: {
  id: string
  label: string
  detail: string
  kind: "warehouse" | "office"
}[] = [
  {
    id: "goswag-warehouse",
    label: "Go Swag warehouse",
    detail: "Unit 7, Trafford Park · Manchester M17 1AB",
    kind: "warehouse",
  },
  {
    id: "london-office",
    label: "London office",
    detail: "48 Rivington Street · London EC2A 3QP",
    kind: "office",
  },
  {
    id: "manchester-office",
    label: "Manchester office",
    detail: "12 Deansgate · Manchester M3 2FF",
    kind: "office",
  },
]
