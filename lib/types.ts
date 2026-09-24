export type HubId = "inventory" | "distribution"

export type ProductionMilestone =
  | "artwork-proofing"
  | "factory-printing"
  | "quality-check"
  | "in-transit"
  | "intake"

export type ProductCardStatus = "low-stock" | "in-production" | "healthy"

export type SizeCode = "S" | "M" | "L" | "XL"

export type Product = {
  id: string
  skuName: string
  variant: string
  thumbnailLabel: string
  thumbnailSrc: string
  warehouseQty: number
  depletionDays: number | null
  pendingUnits: number | null
  pendingArrival: string | null
  status: ProductCardStatus
  unitPriceGbp: number
  leadTimeReadyDate: string
}

export type Campaign = {
  id: string
  name: string
  claimed: number
  total: number
  eventDate: string | null
  onHold: boolean
  holdMessage: string | null
  missingSkuName: string | null
  missingQty: number | null
}

export type DispatchStatus = "in-transit" | "delivered" | "exception" | "preparing"

export type Dispatch = {
  id: string
  recipient: string
  destination: string
  campaign: string
  carrier: string
  method: string
  tracking: string
  status: DispatchStatus
  postageGbp: number
  dispatchedAt: string
}
