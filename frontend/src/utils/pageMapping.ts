// Page mapping utility to match frontend routes with SEO data page names

export interface PageMapping {
  [key: string]: string;
}

// Map frontend routes to SEO page names (matching API data)
export const PAGE_MAPPING: PageMapping = {
  // Home page
  '/': 'home',
  '/home': 'home',
  
  // About page
  '/about': 'about us',
  '/about-us': 'about us',
  
  // Contact page
  '/contact': 'contact penta',
  '/contact-us': 'contact penta',
  
  // Blog pages
  '/blog': 'blog',
  
  // Routes pages
  '/routes': 'routes',
  '/popular-routes': 'routes',
  
  // Booking pages
  '/cab-booking': 'cab booking',
  '/cab-lists': 'cab lists',
  '/cab-detail': 'cab detail',
  '/intercity-booking': 'intercity booking',
  '/outstation-booking': 'outstation booking',
  '/confirm': 'confirm',
  
  // Admin pages
  '/admin': 'admin',
  
  // Other pages
  '/popular_route_info': 'popular route info',
  '/test-api': 'test api',
  '/test-booking': 'test booking',
};

// Function to get SEO page name from current pathname
export const getSEOPageName = (pathname: string): string => {
  // Remove query parameters and hash
  const cleanPath = pathname.split('?')[0].split('#')[0];
  
  // Check exact match first
  if (PAGE_MAPPING[cleanPath]) {
    return PAGE_MAPPING[cleanPath];
  }
  
  // Check for partial matches (for dynamic routes)
  for (const [route, seoPage] of Object.entries(PAGE_MAPPING)) {
    if (cleanPath.startsWith(route) && route !== '/') {
      return seoPage;
    }
  }
  
  // Default to home if no match found
  return 'home';
};

// Function to get page name from route (for admin purposes)
export const getPageNameFromRoute = (pathname: string): string => {
  const cleanPath = pathname.split('?')[0].split('#')[0];
  
  // Convert path to readable page name
  const segments = cleanPath.split('/').filter(Boolean);
  
  if (segments.length === 0) return 'Home';
  
  return segments
    .map(segment => 
      segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(' - ');
};

// Reverse mapping for admin - get all possible SEO page names
export const getAvailableSEOPages = (): string[] => {
  return Array.from(new Set(Object.values(PAGE_MAPPING)));
};
