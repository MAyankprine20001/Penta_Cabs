import { useState, useEffect } from 'react';
import { seoService, SEOData } from '@/services/seoService';

export interface UseSEOReturn {
  seoData: SEOData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSEO = (page?: string): UseSEOReturn => {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSEOData = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (page) {
        response = await seoService.getSEODataByPage(page);
      } else {
        // If no page specified, get all SEO data and find the first one or use default
        const allResponse = await seoService.getAllSEOData();
        if (allResponse.success && Array.isArray(allResponse.data) && allResponse.data.length > 0) {
          // Find the first active SEO data or use the first one
          const activeSEO = allResponse.data.find(item => item.status === 'active') || allResponse.data[0];
          response = { success: true, data: activeSEO };
        } else {
          // Use default SEO data as fallback
          response = { success: true, data: seoService.getDefaultSEOData() };
        }
      }

      if (response.success && response.data) {
        setSeoData(Array.isArray(response.data) ? response.data[0] : response.data);
      } else {
        // Fallback to default SEO data
        setSeoData(seoService.getDefaultSEOData());
      }
    } catch (err) {
      console.error('Error fetching SEO data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback to default SEO data
      setSeoData(seoService.getDefaultSEOData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOData();
  }, [page]);

  return {
    seoData,
    loading,
    error,
    refetch: fetchSEOData
  };
};

export const useAllSEO = () => {
  const [seoData, setSeoData] = useState<SEOData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllSEOData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await seoService.getAllSEOData();

      if (response.success && Array.isArray(response.data)) {
        setSeoData(response.data);
      } else {
        setSeoData([]);
      }
    } catch (err) {
      console.error('Error fetching all SEO data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setSeoData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSEOData();
  }, []);

  return {
    seoData,
    loading,
    error,
    refetch: fetchAllSEOData
  };
};
