
// src/hooks/useBookingForm.ts (Updated with return date validation)
'use client';

import { useState } from 'react';
import { BookingFormData, ServiceType, TripType, PickupDropType } from '@/types/booking';
import { useRouter } from 'next/navigation';

export const useBookingForm = () => {
  const [activeService, setActiveService] = useState<ServiceType>('OUTSTATION');
  const [activeTripType, setActiveTripType] = useState<TripType>('ONEWAY');
  const [activePickupDrop, setActivePickupDrop] = useState<PickupDropType>('PICKUP');
  const router = useRouter();
  
  const [bookingData, setBookingData] = useState<BookingFormData>({
    serviceType: 'AIRPORT',
    tripType: 'ONEWAY',
    pickupDropType: 'PICKUP',
    from: '',
    to: '',
    airport: '',
    dropAddress: '',
    city: '',
    package: '',
    date: '03-06-25',
    time: '11:00 PM',
    pickupTime: '11:00 PM',
    returnDate: '',
    name: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setBookingData(prev => ({ 
      ...prev, 
      [field]: value,
      // Auto-clear return date if switching from ROUNDWAY to ONEWAY
      ...(field === 'tripType' && value === 'ONEWAY' ? { returnDate: '' } : {})
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Helper function to compare dates in DD-MM-YY format
  const isDateBefore = (date1: string, date2: string): boolean => {
    if (!date1 || !date2) return false;
    
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('-');
      const fullYear = year.length === 2 ? `20${year}` : year;
      return new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
    };
    
    return parseDate(date1) < parseDate(date2);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Common validations for all services
    if (!bookingData.name) newErrors.name = 'Name is required';
    if (!bookingData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!bookingData.date) newErrors.date = 'Date is required';
    if (!bookingData.time && !bookingData.pickupTime) newErrors.time = 'Time is required';

    if (activeService === 'AIRPORT') {
      if (!bookingData.airport) newErrors.airport = 'Airport selection is required';
      if (!bookingData.dropAddress) newErrors.dropAddress = 'Drop address is required';
    } else if (activeService === 'OUTSTATION') {
      if (!bookingData.from) newErrors.from = 'From city is required';
      if (!bookingData.to) newErrors.to = 'To city is required';
      if (bookingData.from === bookingData.to && bookingData.from) {
        newErrors.to = 'Destination must be different from origin';
      }
      
      // Round trip specific validations
      if (activeTripType === 'ROUNDWAY') {
        if (!bookingData.returnDate) {
          newErrors.returnDate = 'Return date is required for round trip';
        } else if (isDateBefore(bookingData.returnDate, bookingData.date)) {
          newErrors.returnDate = 'Return date cannot be before departure date';
        }
      }
    } else if (activeService === 'LOCAL') {
      if (!bookingData.city) newErrors.city = 'City selection is required';
      if (!bookingData.package) newErrors.package = 'Package selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async () => {
  if (!validateForm()) return;

  setIsSubmitting(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Booking Data:', bookingData);
    
    // Convert booking data to URL search params
    const searchParams = new URLSearchParams();
    Object.entries(bookingData).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    
    router.push(`/cab-lists?${searchParams.toString()}`);

  } catch (error) {
    console.error('Error searching cabs:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Auto-update service type and trip type when switching
  const handleServiceChange = (service: ServiceType) => {
    setActiveService(service);
    setBookingData(prev => ({ 
      ...prev, 
      serviceType: service,
      // Reset trip-specific fields when changing service
      ...(service !== 'OUTSTATION' ? { returnDate: '' } : {})
    }));
  };

  const handleTripTypeChange = (tripType: TripType) => {
    setActiveTripType(tripType);
    setBookingData(prev => ({ 
      ...prev, 
      tripType,
      // Clear return date if switching to one-way
      ...(tripType === 'ONEWAY' ? { returnDate: '' } : {})
    }));
  };

  return {
    activeService,
    setActiveService: handleServiceChange,
    activeTripType,
    setActiveTripType: handleTripTypeChange,
    activePickupDrop,
    setActivePickupDrop,
    bookingData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};