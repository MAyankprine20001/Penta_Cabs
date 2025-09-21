"use client";

import { useEffect } from 'react';
import { useSEOOptimized } from '@/hooks/useSEOOptimized';

export default function RouteChangeListener() {
  const { updatePageSEO } = useSEOOptimized();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle initial page load
    updatePageSEO(window.location.pathname);

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      updatePageSEO(window.location.pathname);
    };

    // Listen for route changes (for Next.js app router)
    const handleRouteChange = () => {
      updatePageSEO(window.location.pathname);
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    
    // For Next.js app router, we can also listen to pathname changes
    // This will be triggered when navigation occurs
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setTimeout(() => handleRouteChange(), 0);
    };

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      setTimeout(() => handleRouteChange(), 0);
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [updatePageSEO]);

  return null;
}
