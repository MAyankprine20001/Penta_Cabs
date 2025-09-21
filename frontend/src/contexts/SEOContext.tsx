"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { seoService, SEOData } from "@/services/seoService";
import { getSEOPageName } from "@/utils/pageMapping";

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

      console.log("🔄 Fetching SEO data from API...");
      const response = await seoService.getAllSEOData();

      if (response.success && Array.isArray(response.data)) {
        console.log(
          "✅ SEO data fetched successfully:",
          response.data.length,
          "items"
        );
        setSeoData(response.data);
      } else {
        console.log("❌ Failed to fetch SEO data:", response.message);
        setSeoData([]);
        setError(response.message || "Failed to fetch SEO data");
      }
    } catch (err) {
      console.error("❌ Error fetching SEO data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setSeoData([]);
    } finally {
      setLoading(false);
    }
  };

  const getSEOByPage = (pageName: string): SEOData | null => {
    if (!seoData || seoData.length === 0) {
      console.log(
        "🔍 SEO data not available, returning null for page:",
        pageName
      );
      return null;
    }

    console.log(
      "🔍 Searching for page:",
      pageName,
      "in SEO data:",
      seoData.length,
      "items"
    );

    // First try exact match
    let found = seoData.find(
      (item) =>
        item.page.toLowerCase() === pageName.toLowerCase() &&
        item.status === "active"
    );

    // If not found, try case-insensitive match
    if (!found) {
      found = seoData.find(
        (item) => item.page.toLowerCase() === pageName.toLowerCase()
      );
    }

    // If still not found, try partial match
    if (!found) {
      found = seoData.find(
        (item) =>
          item.page.toLowerCase().includes(pageName.toLowerCase()) ||
          pageName.toLowerCase().includes(item.page.toLowerCase())
      );
    }

    console.log(
      "📊 SEO result for",
      pageName,
      ":",
      found ? "Found" : "Not found",
      found?.title || "N/A"
    );
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
    <SEOContext.Provider value={contextValue}>{children}</SEOContext.Provider>
  );
};

export const useSEOContext = (): SEOContextType => {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error("useSEOContext must be used within a SEOProvider");
  }
  return context;
};
