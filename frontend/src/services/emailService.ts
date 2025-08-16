import api from '@/config/axios';

// Types for email requests
export interface EmailRequestData {
  email: string;
  route: string;
  cab?: {
    available: boolean;
    price: number;
    _id: string;
    type?: string;
  };
  car?: {
    type: string;
    available: boolean;
    price: number;
    _id: string;
  };
  traveller: {
    name: string;
    mobile: string;
    email: string;
    pickup?: string;
    drop?: string;
    pickupAddress?: string;
    dropAddress?: string;
    remark?: string;
    gst?: string;
  };
  date?: string;
  time?: string;
  serviceType?: string;
  otherLocation?: string;
}

// New types for booking requests
export interface BookingRequestData {
  serviceType: 'AIRPORT' | 'LOCAL' | 'OUTSTATION';
  traveller: {
    name: string;
    email: string;
    mobile: string;
    pickup?: string;
    drop?: string;
    pickupAddress?: string;
    dropAddress?: string;
    remark?: string;
    gst?: string;
    whatsapp: boolean;
    gstDetails: boolean;
  };
  route: string;
  cab: {
    type: string;
    price: number;
    _id: string;
  };
  date?: string;
  time?: string;
  estimatedDistance?: string;
  paymentMethod: string;
}

export interface DriverDetails {
  name: string;
  whatsappNumber: string;
  vehicleNumber: string;
}

// Airport Email Service
export const sendAirportEmail = async (data: EmailRequestData) => {
  try {
    const response = await api.post('/api/send-airport-email', data);
    return response.data;
  } catch (error) {
    console.error('Error sending airport email:', error);
    throw error;
  }
};

// Local Email Service
export const sendLocalEmail = async (data: EmailRequestData) => {
  try {
    const response = await api.post('/send-local-email', data);
    return response.data;
  } catch (error) {
    console.error('Error sending local email:', error);
    throw error;
  }
};

// Outstation/Intercity Email Service
export const sendIntercityEmail = async (data: EmailRequestData) => {
  try {
    const response = await api.post('/send-intercity-email', data);
    return response.data;
  } catch (error) {
    console.error('Error sending intercity email:', error);
    throw error;
  }
};

// Create a new booking request
export const createBookingRequest = async (data: BookingRequestData) => {
  try {
    const response = await api.post('/api/create-booking-request', data);
    return response.data;
  } catch (error) {
    console.error('Error creating booking request:', error);
    throw error;
  }
};

// Get all booking requests for admin
export const getBookingRequests = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/booking-requests?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking requests:', error);
    throw error;
  }
};

// Update booking request status
export const updateBookingStatus = async (id: string, status: string, adminNotes?: string) => {
  try {
    const response = await api.put(`/api/booking-requests/${id}/status`, { status, adminNotes });
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

// Add driver details to accepted booking
export const addDriverDetails = async (id: string, driverDetails: DriverDetails) => {
  try {
    const response = await api.put(`/api/booking-requests/${id}/driver-details`, { driverDetails });
    return response.data;
  } catch (error) {
    console.error('Error adding driver details:', error);
    throw error;
  }
};

// Send decline email
export const sendDeclineEmail = async (email: string, route: string, reason?: string) => {
  try {
    const response = await api.post('/api/send-decline-email', { email, route, reason });
    return response.data;
  } catch (error) {
    console.error('Error sending decline email:', error);
    throw error;
  }
};

// Helper function to prepare email data based on booking type
export const prepareEmailData = (
  bookingData: any,
  formData: any,
  serviceType: 'AIRPORT' | 'LOCAL' | 'OUTSTATION'
): EmailRequestData => {
  const baseData = {
    email: formData.email,
    traveller: {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      remark: formData.remark || '',
      gst: formData.gstDetails ? (formData.gst || 'GST Details Required') : '',
    },
  };

  switch (serviceType) {
    case 'AIRPORT':
      // Determine route based on pickup/drop type
      let route = '';
      if (bookingData.pickupDropType === 'PICKUP') {
        route = `Pickup from ${bookingData.airport}`;
      } else {
        route = `Drop to ${bookingData.airport}`;
      }

      return {
        ...baseData,
        route: route,
        cab: {
          type: bookingData.selectedCabType || 'sedan',
          available: true,
          price: parseInt(bookingData.selectedCabPrice) || 0,
          _id: bookingData.selectedCabId || '',
        },
        traveller: {
          ...baseData.traveller,
          pickup: formData.pickup || bookingData.address || '',
          drop: formData.drop || bookingData.airport || '',
        },
        date: bookingData.date,
        time: bookingData.time || bookingData.pickupTime,
        serviceType: bookingData.pickupDropType?.toLowerCase() || 'drop',
        otherLocation: bookingData.address || '',
      };

    case 'LOCAL':
      return {
        ...baseData,
        route: `${bookingData.city} | ${bookingData.duration || '4hr'}/${bookingData.estimatedDistance || '40km'} | ${bookingData.date} ${bookingData.time || bookingData.pickupTime}`,
        car: {
          type: bookingData.selectedCabType || 'sedan',
          available: true,
          price: parseInt(bookingData.selectedCabPrice) || 0,
          _id: bookingData.selectedCabId || '',
        },
        traveller: {
          ...baseData.traveller,
          pickupAddress: formData.pickup || bookingData.pickupAddress || '',
          dropAddress: formData.drop || bookingData.dropAddress || '',
        },
      };

    case 'OUTSTATION':
      return {
        ...baseData,
        route: `${bookingData.from} ➡️ ${bookingData.to}`,
        cab: {
          type: bookingData.selectedCabType || 'suv',
          available: true,
          price: parseInt(bookingData.selectedCabPrice) || 0,
          _id: bookingData.selectedCabId || '',
        },
        traveller: {
          ...baseData.traveller,
          pickup: formData.pickup || bookingData.pickupAddress || '',
          drop: formData.drop || bookingData.dropAddress || '',
        },
      };

    default:
      throw new Error(`Unsupported service type: ${serviceType}`);
  }
};

// Helper function to prepare booking request data
export const prepareBookingRequestData = (
  bookingData: any,
  formData: any,
  serviceType: 'AIRPORT' | 'LOCAL' | 'OUTSTATION',
  paymentMethod: string
): BookingRequestData => {
  const baseData = {
    serviceType,
    traveller: {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      remark: formData.remark || '',
      gst: formData.gstDetails ? (formData.gst || 'GST Details Required') : '',
      whatsapp: formData.whatsapp || false,
      gstDetails: formData.gstDetails || false,
    },
    paymentMethod,
  };

  switch (serviceType) {
    case 'AIRPORT':
      let route = '';
      if (bookingData.pickupDropType === 'PICKUP') {
        route = `Pickup from ${bookingData.airport}`;
      } else {
        route = `Drop to ${bookingData.airport}`;
      }

      return {
        ...baseData,
        route: route,
        cab: {
          type: bookingData.selectedCabType || 'sedan',
          price: parseInt(bookingData.selectedCabPrice) || 0,
          _id: bookingData.selectedCabId || '',
        },
        traveller: {
          ...baseData.traveller,
          pickup: formData.pickup || bookingData.address || '',
          drop: formData.drop || bookingData.airport || '',
        },
        date: bookingData.date,
        time: bookingData.time || bookingData.pickupTime,
      };

    case 'LOCAL':
      return {
        ...baseData,
        route: `${bookingData.city} | ${bookingData.duration || '4hr'}/${bookingData.estimatedDistance || '40km'} | ${bookingData.date} ${bookingData.time || bookingData.pickupTime}`,
        cab: {
          type: bookingData.selectedCabType || 'sedan',
          price: parseInt(bookingData.selectedCabPrice) || 0,
          _id: bookingData.selectedCabId || '',
        },
        traveller: {
          ...baseData.traveller,
          pickup: formData.pickup || bookingData.pickupAddress || '',
          drop: formData.drop || bookingData.dropAddress || '',
        },
        date: bookingData.date,
        time: bookingData.time || bookingData.pickupTime,
        estimatedDistance: bookingData.estimatedDistance || '40km',
      };

    case 'OUTSTATION':
      return {
        ...baseData,
        route: `${bookingData.from} ➡️ ${bookingData.to}`,
        cab: {
          type: bookingData.selectedCabType || 'suv',
          price: parseInt(bookingData.selectedCabPrice) || 0,
          _id: bookingData.selectedCabId || '',
        },
        traveller: {
          ...baseData.traveller,
          pickup: formData.pickup || bookingData.pickupAddress || '',
          drop: formData.drop || bookingData.dropAddress || '',
        },
        date: bookingData.date,
        time: bookingData.time || bookingData.pickupTime,
        estimatedDistance: bookingData.estimatedDistance || '',
      };

    default:
      throw new Error(`Unsupported service type: ${serviceType}`);
  }
}; 