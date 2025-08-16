import api from '@/config/axios';

export interface OutstationCity {
  id: string;
  name: string;
  state?: string;
  isActive?: boolean;
}

export interface OutstationCitiesResponse {
  cityMap: Record<string, string[]>;
  fromCities: string[];
}

export interface IntercitySearchRequest {
  city1: string;
  city2: string;
  tripType: string;
}

export interface IntercitySearchResponse {
  cars: Array<{
    _id: string;
    type: string;
    price: number;
    [key: string]: any;
  }>;
}

export const outstationService = {
  async getAvailableCities(): Promise<OutstationCitiesResponse> {
    try {
      const response = await api.get<OutstationCitiesResponse>('/api/available-outstation-cities');
      return response.data;
    } catch (error) {
      console.error('Error fetching available outstation cities:', error);
      throw error;
    }
  },

  async searchIntercityCabs(searchData: IntercitySearchRequest): Promise<IntercitySearchResponse> {
    try {
      const response = await api.post<IntercitySearchResponse>('/api/intercity/search', searchData);
      return response.data;
    } catch (error) {
      console.error('Error searching intercity cabs:', error);
      throw error;
    }
  }
}; 