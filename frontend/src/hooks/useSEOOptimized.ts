import { useEffect, useState, useCallback } from 'react';
import { useSEOContext } from '@/contexts/SEOContext';
import { SEOData } from '@/services/seoService';
import { getSEOPageName } from '@/utils/pageMapping';

interface UseSEOOptimizedReturn {
  seoData: SEOData | null;
  loading: boolean;
  error: string | null;
  updatePageSEO: (pathname: string) => void;
}

export const useSEOOptimized = (initialPath?: string): UseSEOOptimizedReturn => {
  const { getSEOByPath, loading: contextLoading, error: contextError } = useSEOContext();
  const [currentPath, setCurrentPath] = useState<string>(
    initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  const updatePageSEO = useCallback((pathname: string) => {
    console.log('🔄 Updating SEO for path:', pathname);
    setCurrentPath(pathname);
    const pageSEO = getSEOByPath(pathname);
    console.log('📊 SEO data found:', pageSEO ? 'Yes' : 'No', pageSEO?.title || 'N/A');
    setSeoData(pageSEO);
  }, [getSEOByPath]);

  useEffect(() => {
    // Get SEO data for current path
    const pageSEO = getSEOByPath(currentPath);
    setSeoData(pageSEO);
  }, [currentPath, getSEOByPath]);

  return {
    seoData,
    loading: contextLoading,
    error: contextError,
    updatePageSEO,
  };
};

// Hook for getting SEO data by specific page name
export const useSEOByPage = (pageName: string): SEOData | null => {
  const { getSEOByPage } = useSEOContext();
  return getSEOByPage(pageName);
};

// Hook for getting all SEO data
export const useAllSEOData = () => {
  const { seoData, loading, error, refetch } = useSEOContext();
  return { seoData, loading, error, refetch };
};
