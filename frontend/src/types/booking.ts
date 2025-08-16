// src/types/booking.ts (Updated to include return date)
export type ServiceType = 'OUTSTATION' | 'LOCAL' | 'AIRPORT';
export type TripType = 'ONEWAY' | 'ROUNDWAY';
export type PickupDropType = 'PICKUP' | 'DROP';

export interface BookingFormData {
  serviceType: ServiceType;
  tripType?: TripType;
  pickupDropType?: PickupDropType;
  from: string;
  to: string;
  airport: string;
  dropAddress: string;
  city: string;
  package: string;
  date: string;
  time: string;
  pickupTime: string;
  returnDate?: string; // New field for round trip return date
  name: string; // New field for customer name
  phoneNumber: string; // New field for customer phone number
}
