interface OperatingAirline {
  code: string;
  flightNumber: string;
  equipment: string;
  equipmentName: string | null;
}

interface FlightSegment {
  departureDateTime: string;
  arrivalDateTime: string;
  stopQuantity: number;
  flightNumber: string;
  resBookDesigCode: string;
  journeyDuration: string;
  journeyDurationPerMinute: number;
  connectionTimePerMinute: number;
  departureAirportLocationCode: string;
  arrivalAirportLocationCode: string;
  marketingAirlineCode: string;
  cabinClassCode: string;
  operatingAirline: OperatingAirline;
  seatsRemaining: number;
  isCharter: boolean;
  isReturn: boolean;
  baggage: string;
  technicalStops: any[];
}

interface OriginDestinationOption {
  journeyDurationPerMinute: number;
  connectionTimePerMinute: number;
  flightSegments: FlightSegment[];
}

interface PassengerFare {
  baseFare: number;
  totalFare: number;
  serviceTax: number;
  taxes: any[];
  total: number;
  tax: number;
  vat: number;
  baseFareWithMarkup: number;
  totalFareWithMarkupAndVat: number;
  commission: number;
  priceCitizen: number;
}

interface PassengerTypeQuantity {
  passengerType: string;
  quantity: number;
}

interface PtcFareBreakdown {
  passengerFare: PassengerFare;
  passengerTypeQuantity: PassengerTypeQuantity;
}

interface ItinTotalFare {
  totalService: number;
  totalFare: number;
  grandTotalWithoutDiscount: number;
  discountAmount: number | null;
  totalVat: number;
  totalTax: number;
  totalServiceTax: number;
  totalCommission: number;
}

interface AirItineraryPricingInfo {
  fareType: string;
  itinTotalFare: ItinTotalFare;
  ptcFareBreakdown: PtcFareBreakdown[];
  fareInfoes: any[];
}

export interface PricedItinery {
  passportMandatoryType: string;
  domesticCountryCode: string | null;
  isPassportMandatory: boolean;
  isDestinationAddressMandatory: boolean;
  isPassportIssueDateMandatory: boolean;
  directionInd: number;
  refundMethod: string;
  validatingAirlineCode: string;
  fareSourceCode: string;
  hasFareFamilies: boolean;
  airItineraryPricingInfo: AirItineraryPricingInfo;
  originDestinationOptions: OriginDestinationOption[];
  featured: string | null;
  bestExperienceIndex: number;
  isCharter: boolean;
  isSystem: boolean;
  isInstance: boolean;
  isOffer: boolean;
  isSeatServiceMandatory: boolean;
  isMealServiceMandatory: boolean;
}
