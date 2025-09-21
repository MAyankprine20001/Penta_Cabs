"use client";

import { useSEO } from '@/hooks/useSEO';
import { getSEOPageName } from '@/utils/pageMapping';

interface SEOStatusProps {
  currentPath?: string;
}

export default function SEOStatus({ currentPath }: SEOStatusProps) {
  const pathname = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const mappedPage = getSEOPageName(pathname);
  const { seoData, loading, error } = useSEO(pathname);

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg text-sm">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
          <span>Loading SEO...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-800 text-white p-3 rounded-lg shadow-lg text-sm">
        <div className="flex items-center space-x-2">
          <span>⚠️</span>
          <span>SEO Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg text-sm max-w-xs">
      <div className="space-y-1">
        <div className="font-semibold text-yellow-400">SEO Status</div>
        <div><span className="text-gray-400">Path:</span> {pathname}</div>
        <div><span className="text-gray-400">Mapped:</span> {mappedPage}</div>
        {seoData && (
          <>
            <div><span className="text-gray-400">Page:</span> {seoData.page}</div>
            <div><span className="text-gray-400">Title:</span> {seoData.title}</div>
            <div><span className="text-gray-400">Status:</span> 
              <span className={`ml-1 px-2 py-0.5 rounded text-xs ${
                seoData.status === 'active' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {seoData.status}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
