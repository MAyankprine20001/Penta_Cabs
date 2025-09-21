"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { seoService, SEOData } from '@/services/seoService';
import { getSEOPageName } from '@/utils/pageMapping';

interface SEOContextType {
  seoData: SEOData[];
  loading: boolean;
  error: string | null;
  getSEOByPage: (pageName: string) => SEOData | null;
  getSEOByPath: (pathname: string) => SEOData | null;
  refetch: () => Promise<void>;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

interface SEOProviderProps {
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
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
        setError(response.message || 'Failed to fetch SEO data');
      }
    } catch (err) {
      console.error('Error fetching SEO data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setSeoData([]);
    } finally {
      setLoading(false);
    }
  };

  const getSEOByPage = (pageName: string): SEOData | null => {
    if (!seoData || seoData.length === 0) return null;
    
    // First try exact match
    let found = seoData.find(item => 
      item.page.toLowerCase() === pageName.toLowerCase() && item.status === 'active'
    );
    
    // If not found, try case-insensitive match
    if (!found) {
      found = seoData.find(item => 
        item.page.toLowerCase() === pageName.toLowerCase()
      );
    }
    
    // If still not found, try partial match
    if (!found) {
      found = seoData.find(item => 
        item.page.toLowerCase().includes(pageName.toLowerCase()) ||
        pageName.toLowerCase().includes(item.page.toLowerCase())
      );
    }
    
    return found || null;
  };

  const getSEOByPath = (pathname: string): SEOData | null => {
    const pageName = getSEOPageName(pathname);
    return getSEOByPage(pageName);
  };

  useEffect(() => {
    fetchAllSEOData();
  }, []);

  const contextValue: SEOContextType = {
    seoData,
    loading,
    error,
    getSEOByPage,
    getSEOByPath,
    refetch: fetchAllSEOData,
  };

  return (
    <SEOContext.Provider value={contextValue}>
      {children}
    </SEOContext.Provider>
  );
};

export const useSEOContext = (): SEOContextType => {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEOContext must be used within a SEOProvider');
  }
  return context;
};
