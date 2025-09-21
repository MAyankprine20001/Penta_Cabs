import { useEffect, useState } from 'react';
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

  const updatePageSEO = (pathname: string) => {
    setCurrentPath(pathname);
    const pageSEO = getSEOByPath(pathname);
    setSeoData(pageSEO);
  };

  useEffect(() => {
    // Get SEO data for current path
    const pageSEO = getSEOByPath(currentPath);
    setSeoData(pageSEO);
  }, [currentPath, getSEOByPath]);

  // Listen for route changes (for client-side navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleRouteChange = () => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        updatePageSEO(newPath);
      }
    };

    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', handleRouteChange);

    // For Next.js app router, we can also listen to pathname changes
    // This will be handled by the component that uses this hook

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [currentPath]);

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
