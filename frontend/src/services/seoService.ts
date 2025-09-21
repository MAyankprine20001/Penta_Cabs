import { environment } from '@/config/environment';

export interface SEOData {
  _id?: string;
  id?: string; // For compatibility with existing components
  page: string;
  title: string;
  description: string;
  keywords: string;
  metaTags: string;
  canonical?: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SEOApiResponse {
  success: boolean;
  data?: SEOData | SEOData[];
  message?: string;
  error?: string;
}

class SEOService {
  private baseUrl = environment.baseUrl;

  // Get all SEO data
  async getAllSEOData(): Promise<SEOApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/seo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all SEO data:', error);
      return {
        success: false,
        message: 'Error fetching SEO data',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get SEO data by page name
  async getSEODataByPage(page: string): Promise<SEOApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/seo/page/${encodeURIComponent(page)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching SEO data by page:', error);
      return {
        success: false,
        message: 'Error fetching SEO data for page',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Create new SEO data (admin only)
  async createSEOData(seoData: Omit<SEOData, '_id' | 'createdAt' | 'updatedAt' | 'lastUpdated'>): Promise<SEOApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seoData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating SEO data:', error);
      return {
        success: false,
        message: 'Error creating SEO data',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Update SEO data (admin only)
  async updateSEOData(id: string, seoData: Partial<SEOData>): Promise<SEOApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/seo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seoData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating SEO data:', error);
      return {
        success: false,
        message: 'Error updating SEO data',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Delete SEO data (admin only)
  async deleteSEOData(id: string): Promise<SEOApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/seo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting SEO data:', error);
      return {
        success: false,
        message: 'Error deleting SEO data',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Toggle SEO status (admin only)
  async toggleSEOStatus(id: string): Promise<SEOApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/seo/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error toggling SEO status:', error);
      return {
        success: false,
        message: 'Error toggling SEO status',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Helper method to get default SEO data for fallback
  getDefaultSEOData(): SEOData {
    return {
      page: 'Home',
      title: 'Penta Cab - Premium Taxi Services in India | Book Online',
      description: 'Experience premium taxi service with Penta Cab. Professional drivers, luxury vehicles, 24/7 availability. Book now for airport transfers, city rides, and outstation trips.',
      keywords: 'taxi service, cab booking, airport transfer, luxury transportation, reliable taxi, 24/7 cab service, outstation taxi, corporate transportation, premium cab service',
      metaTags: 'taxi booking, cab service, reliable transport, online booking, 24/7 support',
      status: 'active',
      lastUpdated: new Date().toISOString()
    };
  }
}

export const seoService = new SEOService();
