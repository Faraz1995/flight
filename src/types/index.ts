export type PricedItinerary = {
  passportMandatoryType: string
  domesticCountryCode: string | null
  isPassportMandatory: boolean
  isDestinationAddressMandatory: boolean
  isPassportIssueDateMandatory: boolean
  directionInd: number
  refundMethod: string
  validatingAirlineCode: string
  fareSourceCode: string
  hasFareFamilies: boolean
  airItineraryPricingInfo: AirItineraryPricingInfo
  originDestinationOptions: OriginDestinationOption[]
  featured: any
  bestExperienceIndex: number
  isCharter: boolean
  isSystem: boolean
  isInstance: boolean
  isOffer: boolean
  isSeatServiceMandatory: boolean
  isMealServiceMandatory: boolean
}

type AirItineraryPricingInfo = {
  fareType: string
  itinTotalFare: ItinTotalFare
  ptcFareBreakdown: PtcFareBreakdown[]
  fareInfoes: any[]
}

type ItinTotalFare = {
  totalService: number
  totalFare: number
  grandTotalWithoutDiscount: number
  discountAmount: number | null
  totalVat: number
  totalTax: number
  totalServiceTax: number
  totalCommission: number
}

type PtcFareBreakdown = {
  passengerFare: PassengerFare
  passengerTypeQuantity: PassengerTypeQuantity
}

type PassengerFare = {
  baseFare: number
  totalFare: number
  serviceTax: number
  taxes: any[]
  total: number
  tax: number
  vat: number
  baseFareWithMarkup: number
  totalFareWithMarkupAndVat: number
  commission: number
  priceCitizen: number
}

type PassengerTypeQuantity = {
  passengerType: string
  quantity: number
}

type OriginDestinationOption = {
  journeyDurationPerMinute: number
  connectionTimePerMinute: number
  flightSegments: FlightSegment[]
}

type FlightSegment = {
  departureDateTime: string
  arrivalDateTime: string
  stopQuantity: number
  flightNumber: string
  resBookDesigCode: string
  journeyDuration: string
  journeyDurationPerMinute: number
  connectionTimePerMinute: number
  departureAirportLocationCode: string
  arrivalAirportLocationCode: string
  marketingAirlineCode: string
  cabinClassCode: string
  operatingAirline: OperatingAirline
  seatsRemaining: number | null
  isCharter: boolean
  isReturn: boolean
  baggage: string | null
  technicalStops: any[]
}

type OperatingAirline = {
  code: string
  flightNumber: string
  equipment: string
  equipmentName: string | null
}
