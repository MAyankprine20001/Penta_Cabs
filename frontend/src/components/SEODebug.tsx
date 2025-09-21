"use client";

import { useSEOContext } from '@/contexts/SEOContext';
import { getSEOPageName } from '@/utils/pageMapping';

interface SEODebugProps {
  show?: boolean;
}

export default function SEODebug({ show = false }: SEODebugProps) {
  const { seoData, loading, error, getSEOByPath } = useSEOContext();

  if (!show || typeof window === 'undefined') return null;

  const currentPath = window.location.pathname;
  const currentSEO = getSEOByPath(currentPath);

  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
      <div className="space-y-2">
        <div className="font-bold text-yellow-400">SEO Debug Info</div>
        <div><span className="text-gray-400">Loading:</span> {loading ? 'Yes' : 'No'}</div>
        {error && <div><span className="text-red-400">Error:</span> {error}</div>}
        <div><span className="text-gray-400">Total SEO Entries:</span> {seoData.length}</div>
        <div><span className="text-gray-400">Current Path:</span> {currentPath}</div>
        <div><span className="text-gray-400">Mapped Page:</span> {getSEOPageName(currentPath)}</div>
        {currentSEO ? (
          <>
            <div><span className="text-gray-400">Found SEO:</span> ✅</div>
            <div><span className="text-gray-400">Page:</span> {currentSEO.page}</div>
            <div><span className="text-gray-400">Title:</span> {currentSEO.title}</div>
            <div><span className="text-gray-400">Status:</span> 
              <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                currentSEO.status === 'active' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {currentSEO.status}
              </span>
            </div>
          </>
        ) : (
          <div><span className="text-red-400">No SEO Found</span></div>
        )}
      </div>
    </div>
  );
}
