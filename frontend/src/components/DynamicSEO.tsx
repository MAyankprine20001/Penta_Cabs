"use client";

import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { getSEOPageName } from '@/utils/pageMapping';

interface DynamicSEOProps {
  page?: string;
}

export default function DynamicSEO({ page }: DynamicSEOProps) {
  // Get the current page pathname if no page prop is provided
  const currentPage = page || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const { seoData, loading } = useSEO(currentPage);

  useEffect(() => {
    if (seoData && !loading) {
      // Update document title
      if (seoData.title) {
        document.title = seoData.title;
      }

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && seoData.description) {
        metaDescription.setAttribute('content', seoData.description);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && seoData.keywords) {
        metaKeywords.setAttribute('content', seoData.keywords);
      }

      // Update Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && seoData.title) {
        ogTitle.setAttribute('content', seoData.title);
      }

      // Update Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription && seoData.description) {
        ogDescription.setAttribute('content', seoData.description);
      }

      // Update Twitter title
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle && seoData.title) {
        twitterTitle.setAttribute('content', seoData.title);
      }

      // Update Twitter description
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription && seoData.description) {
        twitterDescription.setAttribute('content', seoData.description);
      }

      // Add meta tags if they don't exist
      if (seoData.metaTags) {
        const existingMetaTags = document.querySelector('meta[name="meta-tags"]');
        if (!existingMetaTags) {
          const metaTags = document.createElement('meta');
          metaTags.setAttribute('name', 'meta-tags');
          metaTags.setAttribute('content', seoData.metaTags);
          document.head.appendChild(metaTags);
        } else {
          existingMetaTags.setAttribute('content', seoData.metaTags);
        }
      }
    }
  }, [seoData, loading]);

  return null;
}
