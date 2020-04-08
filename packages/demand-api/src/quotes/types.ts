export type QuotesAvailabilityParams = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: string
}

export type QuotesAvailabilityResponse = {
  availabilities?: {
    availability_id?: string
    fleet_id?: string
    vehicle_class?: string
    supplier_name?: string
    logo_url?: string
    description?: string
    phone_number?: string
    rating?: number
    terms_conditions_url?: string
    category_name?: string
    integrated_fleet?: boolean
  }[]
  categories?: string[]
}
