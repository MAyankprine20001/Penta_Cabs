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