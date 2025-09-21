"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSEOContext } from "@/contexts/SEOContext";
import { SEOData } from "@/services/seoService";

// Default SEO data as fallback (matching backend structure)
const DEFAULT_SEO_DATA: Record<string, SEOData> = {
  home: {
    page: "home",
    title: "Penta Cab - Premium Taxi Services in India | Book Online",
    description:
      "Book reliable taxi services with Penta Cab. Airport transfers, local rides, and outstation trips across India. 24/7 customer support and competitive pricing.",
    keywords:
      "taxi booking, cab service, airport transfer, local rides, outstation trips, India taxi, online booking",
    metaTags:
      "taxi booking, cab service, reliable transport, online booking, 24/7 support",
    status: "active",
    lastUpdated: new Date().toISOString(),
  },
  "about us": {
    page: "about us",
    title: "About Penta Cab - Your Trusted Travel Partner Since 2010",
    description:
      "Learn about Penta Cab's journey, mission, and commitment to providing safe and comfortable taxi services. Meet our team and discover our values.",
    keywords:
      "about penta cab, taxi company, travel partner, company history, our team, mission vision",
    metaTags:
      "about us, company history, taxi service provider, our team, mission vision",
    status: "active",
    lastUpdated: new Date().toISOString(),
  },
  "contact penta": {
    page: "contact penta",
    title: "Contact Penta Cab - Customer Support & Booking Help",
    description:
      "Contact Penta Cab for bookings, support, or inquiries. We're here to help with your travel needs. Call, email, or visit our office.",
    keywords:
      "contact penta cab, customer support, booking help, customer service, phone number, email support",
    metaTags:
      "contact us, customer service, booking support, help center, customer care",
    status: "active",
    lastUpdated: new Date().toISOString(),
  },
  blog: {
    page: "blog",
    title: "Penta Cab Blog | Travel Tips, News & Updates",
    description:
      "Read our latest blog posts about travel tips, taxi booking guides, city information, and Penta Cab news. Stay updated with travel insights.",
    keywords:
      "travel blog, taxi tips, booking guide, travel news, city information, Penta Cab blog",
    metaTags:
      "travel blog, taxi tips, booking guide, travel insights, city guides",
    status: "active",
    lastUpdated: new Date().toISOString(),
  },
};

// Route to page name mapping (matching backend data)
const ROUTE_TO_PAGE: Record<string, string> = {
  "/": "home",
  "/home": "home",
  "/about": "about us",
  "/contact": "contact penta",
  "/blog": "blog",
  "/cab-booking": "Cab Booking",
  "/cab-lists": "Cab Lists",
  "/cab-detail": "Cab Detail",
  "/intercity-booking": "Intercity Booking",
  "/outstation-booking": "Outstation Booking",
  "/routes": "Routes",
  "/popular_route_info": "popular_route_info",
  "/confirm": "Confirm",
  "/admin": "Admin",
};

export default function SEOManager() {
  const pathname = usePathname();
  const { getSEOByPath, loading, seoData } = useSEOContext();
  const [currentSEO, setCurrentSEO] = useState<SEOData | null>(null);

  // Get page name from pathname
  const getPageName = (path: string): string => {
    const cleanPath = path.split("?")[0].split("#")[0];
    return ROUTE_TO_PAGE[cleanPath] || "Home";
  };

  // Update meta tags
  const updateMetaTags = (seo: SEOData) => {
    if (typeof window === "undefined") return;

    console.log("🔄 Updating meta tags for:", seo.title);

    // Update document title
    if (seo.title) {
      document.title = seo.title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (
      selector: string,
      content: string,
      attribute: string = "content"
    ) => {
      let metaElement = document.querySelector(selector);
      if (!metaElement) {
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
    if (seo.description) {
      updateMetaTag('meta[name="description"]', seo.description);
    }

    // Update meta keywords
    if (seo.keywords) {
      updateMetaTag('meta[name="keywords"]', seo.keywords);
    }

    // Update Open Graph tags
    if (seo.title) {
      updateMetaTag('meta[property="og:title"]', seo.title);
    }

    if (seo.description) {
      updateMetaTag('meta[property="og:description"]', seo.description);
    }

    // Update Twitter tags
    if (seo.title) {
      updateMetaTag('meta[name="twitter:title"]', seo.title);
    }

    if (seo.description) {
      updateMetaTag('meta[name="twitter:description"]', seo.description);
    }

    console.log("✅ Meta tags updated successfully");
  };

  // Handle route changes
  useEffect(() => {
    const pageName = getPageName(pathname);
    console.log("🔄 Route changed to:", pathname, "Page:", pageName);

    // Try to get SEO data from API first
    let seoData = getSEOByPath(pathname);

    // If no data from API, use fallback
    if (!seoData && !loading) {
      console.log("⚠️ No SEO data from API, using fallback for:", pageName);
      seoData = DEFAULT_SEO_DATA[pageName] || DEFAULT_SEO_DATA["home"];
    }

    if (seoData) {
      setCurrentSEO(seoData);
      updateMetaTags(seoData);
    }
  }, [pathname, getSEOByPath, loading]);

  // Update when SEO data loads
  useEffect(() => {
    if (!loading && seoData.length > 0 && pathname) {
      const pageName = getPageName(pathname);
      let seoDataForPage = getSEOByPath(pathname);

      if (!seoDataForPage) {
        seoDataForPage = DEFAULT_SEO_DATA[pageName] || DEFAULT_SEO_DATA["home"];
      }

      if (seoDataForPage) {
        setCurrentSEO(seoDataForPage);
        updateMetaTags(seoDataForPage);
      }
    }
  }, [loading, seoData, pathname, getSEOByPath]);

  return null;
}
