"use client";

import { useEffect } from "react";
import { useSEOOptimized } from "@/hooks/useSEOOptimized";

interface DynamicSEOProps {
  page?: string;
}

export default function DynamicSEO({ page }: DynamicSEOProps) {
  const { seoData, loading, updatePageSEO } = useSEOOptimized(page);

  // Update SEO data when route changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      updatePageSEO(window.location.pathname);
    }
  }, []);

  // Apply SEO meta tags when data changes
  useEffect(() => {
    if (seoData && !loading && typeof window !== "undefined") {
      console.log("🔄 Updating meta tags for:", seoData.title);

      // Update document title
      if (seoData.title) {
        document.title = seoData.title;
      }

      // Helper function to update or create meta tags
      const updateMetaTag = (
        selector: string,
        content: string,
        attribute: string = "content"
      ) => {
        let metaElement = document.querySelector(selector);
        if (!metaElement) {
          // Create new meta tag if it doesn't exist
          metaElement = document.createElement("meta");
          if (selector.includes("property=")) {
            const property = selector.match(/property="([^"]+)"/)?.[1];
            if (property) metaElement.setAttribute("property", property);
          } else if (selector.includes("name=")) {
            const name = selector.match(/name="([^"]+)"/)?.[1];
            if (name) metaElement.setAttribute("name", name);
          }
          document.head.appendChild(metaElement);
        }
        metaElement.setAttribute(attribute, content);
      };

      // Update meta description
      if (seoData.description) {
        updateMetaTag('meta[name="description"]', seoData.description);
      }

      // Update meta keywords
      if (seoData.keywords) {
        updateMetaTag('meta[name="keywords"]', seoData.keywords);
      }

      // Update Open Graph tags
      if (seoData.title) {
        updateMetaTag('meta[property="og:title"]', seoData.title);
      }

      if (seoData.description) {
        updateMetaTag('meta[property="og:description"]', seoData.description);
      }

      // Update Twitter tags
      if (seoData.title) {
        updateMetaTag('meta[name="twitter:title"]', seoData.title);
      }

      if (seoData.description) {
        updateMetaTag('meta[name="twitter:description"]', seoData.description);
      }

      // Update canonical URL
      if (seoData.canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement("link");
          canonicalLink.setAttribute("rel", "canonical");
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute("href", seoData.canonical);
      }

      // Handle additional meta tags
      if (seoData.metaTags) {
        updateMetaTag('meta[name="meta-tags"]', seoData.metaTags);
      }

      console.log("✅ Meta tags updated successfully");
    }
  }, [seoData, loading]);

  return null;
}
