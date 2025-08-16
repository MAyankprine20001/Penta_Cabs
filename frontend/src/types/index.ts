// src/types/index.ts

// ==================== NAVIGATION TYPES ====================
export interface NavItem {
  label: string;
  description : string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavItem[];
  icon?: React.ComponentType<{ className?: string }> | string;
  badge?: string;
  external?: boolean;
}

export interface MegaMenuSection {
  title: string;
  items: NavItem[];
}

// ==================== CONTACT & BUSINESS INFO ====================
export interface ContactInfo {
  phone: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface Location {
  name: string;
  address: string;
  phone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ==================== SERVICE TYPES ====================
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  priceType?: 'fixed' | 'per_km' | 'per_hour' | 'starting_from';
  duration?: string;
  capacity?: number;
  popular?: boolean;
  available24x7?: boolean;
  categories: ServiceCategory[];
}

export type ServiceCategory = 
  | 'airport_transfer' 
  | 'city_rides' 
  | 'outstation' 
  | 'corporate' 
  | 'wedding' 
  | 'emergency' 
  | 'luxury';

export interface ServicePackage {
  id: string;
  name: string;
  services: string[]; // Service IDs
  discountPercentage: number;
  validUntil?: Date;
  description: string;
}

// ==================== VEHICLE & FLEET TYPES ====================
export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  capacity: number;
  features: string[];
  pricePerKm: number;
  pricePerHour?: number;
  basePrice: number;
  images: string[];
  available: boolean;
  fuelType: 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid';
  airConditioned: boolean;
  luggage: number; // number of bags
}

export type VehicleType = 
  | 'hatchback' 
  | 'sedan' 
  | 'suv' 
  | 'luxury' 
  | 'van' 
  | 'bus' 
  | 'tempo'
  | 'innova'
  | 'innovacrystal';

// ==================== BOOKING TYPES ====================
export interface BookingFormData {
  // Trip Details
  pickup: string;
  destination: string;
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  tripType: 'one_way' | 'round_trip' | 'multi_city';
  
  // Passenger Details
  passengers: number;
  luggage?: number;
  
  // Service Details
  serviceType: string;
  vehicleType?: VehicleType;
  
  // Customer Details
  name: string;
  phone: string;
  email: string;
  alternatePhone?: string;
  
  // Additional Info
  specialRequests?: string;
  paymentMethod?: PaymentMethod;
  couponCode?: string;
  
  // Preferences
  driverPreference?: 'male' | 'female' | 'any';
  pickupInstructions?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerInfo: CustomerInfo;
  tripDetails: TripDetails;
  vehicleInfo: Vehicle;
  driverInfo?: Driver;
  status: BookingStatus;
  pricing: BookingPricing;
  createdAt: Date;
  updatedAt: Date;
  estimatedArrival?: Date;
  actualArrival?: Date;
  completedAt?: Date;
  rating?: number;
  feedback?: string;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'driver_assigned' 
  | 'driver_arrived' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'refunded';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  alternatePhone?: string;
}

export interface TripDetails {
  pickup: LocationPoint;
  destination: LocationPoint;
  date: Date;
  time: string;
  distance: number; // in km
  estimatedDuration: number; // in minutes
  tripType: 'one_way' | 'round_trip' | 'multi_city';
  specialRequests?: string;
}

export interface LocationPoint {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  landmark?: string;
}

export interface BookingPricing {
  basePrice: number;
  distancePrice: number;
  timePrice?: number;
  tolls?: number;
  taxes: number;
  discount?: number;
  couponDiscount?: number;
  totalPrice: number;
  currency: string;
  breakdown: PriceBreakdown[];
}

export interface PriceBreakdown {
  label: string;
  amount: number;
  type: 'charge' | 'discount' | 'tax';
}

export type PaymentMethod = 
  | 'cash' 
  | 'card' 
  | 'upi' 
  | 'wallet' 
  | 'net_banking' 
  | 'emi';

// ==================== DRIVER TYPES ====================
export interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  experience: string;
  rating: number;
  totalRides: number;
  avatar: string;
  licenseNumber: string;
  vehicleAssigned?: string; // Vehicle ID
  specialties: string[];
  languages: string[];
  verified: boolean;
  available: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  documents: {
    license: string;
    aadhar: string;
    pan?: string;
    vehicleRC?: string;
    insurance?: string;
  };
}

// ==================== TESTIMONIAL & REVIEW TYPES ====================
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  location?: string;
  avatar?: string;
  date: Date;
  verified: boolean;
  service?: string;
  tripType?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  driverId: string;
  rating: number;
  comment?: string;
  aspects: {
    punctuality: number;
    cleanliness: number;
    behavior: number;
    vehicleCondition: number;
    overall: number;
  };
  date: Date;
  helpful: number; // number of people who found this helpful
}

// ==================== API TYPES ====================
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>; // for validation errors
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    filters?: Record<string, any>;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// ==================== COMPONENT PROPS TYPES ====================
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  className?: string;
}

export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date' | 'time';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface SelectProps extends FormFieldProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// ==================== UTILITY TYPES ====================
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'driver' | 'admin';
  verified: boolean;
  createdAt: Date;
  preferences?: {
    theme: Theme;
    notifications: boolean;
    language: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface AppConfig {
  appName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  apiUrl: string;
  features: {
    realTimeTracking: boolean;
    multiplePayments: boolean;
    scheduling: boolean;
    corporateBooking: boolean;
  };
}

// ==================== FORM VALIDATION TYPES ====================
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormState<T> {
  values: T;
  errors: FormErrors;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ==================== SEARCH & FILTER TYPES ====================
export interface SearchFilters {
  query?: string;
  serviceType?: ServiceCategory[];
  vehicleType?: VehicleType[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: boolean;
  location?: string;
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  filters: SearchFilters;
  suggestions?: string[];
}