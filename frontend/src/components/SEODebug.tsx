"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSEOContext } from "@/contexts/SEOContext";

export default function SEODebug() {
  const pathname = usePathname();
  const { seoData, loading, getSEOByPath } = useSEOContext();
  const [currentTitle, setCurrentTitle] = useState<string>("");

  useEffect(() => {
    setCurrentTitle(document.title);
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(document.title);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentSEO = getSEOByPath(pathname);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">🔍 SEO Debug</div>
      <div>
        <strong>Path:</strong> {pathname}
      </div>
      <div>
        <strong>Current Title:</strong> {currentTitle}
      </div>
      <div>
        <strong>Loading:</strong> {loading ? "Yes" : "No"}
      </div>
      <div>
        <strong>SEO Data Count:</strong> {seoData.length}
      </div>
      <div>
        <strong>Current SEO:</strong> {currentSEO ? "Found" : "Not Found"}
      </div>
      {currentSEO && (
        <>
          <div>
            <strong>Page:</strong> {currentSEO.page}
          </div>
          <div>
            <strong>Title:</strong> {currentSEO.title}
          </div>
        </>
      )}
    </div>
  );
}
