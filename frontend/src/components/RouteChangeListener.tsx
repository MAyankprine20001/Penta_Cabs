"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSEOOptimized } from "@/hooks/useSEOOptimized";

export default function RouteChangeListener() {
  const { updatePageSEO } = useSEOOptimized();
  const pathname = usePathname();

  // Handle route changes using Next.js usePathname hook
  useEffect(() => {
    if (pathname) {
      updatePageSEO(pathname);
    }
  }, [pathname, updatePageSEO]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Handle initial page load
    updatePageSEO(window.location.pathname);

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      // Small delay to ensure pathname has updated
      setTimeout(() => {
        updatePageSEO(window.location.pathname);
      }, 100);
    };

    // Add event listeners
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [updatePageSEO]);

  return null;
}
