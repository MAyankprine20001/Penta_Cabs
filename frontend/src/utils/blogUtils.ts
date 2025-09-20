// Utility functions for blog content processing

export interface BlogImage {
  src: string;
  alt: string;
  index: number;
}

/**
 * Extract all images from blog content
 */
export function extractImagesFromContent(content: string): BlogImage[] {
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi;
  const images: BlogImage[] = [];
  let match;
  let index = 0;

  while ((match = imgRegex.exec(content)) !== null) {
    images.push({
      src: match[1],
      alt: match[2] || 'Blog image',
      index: index++
    });
  }

  return images;
}

/**
 * Get the first image from blog content (for featured image)
 */
export function getFeaturedImage(content: string): string | null {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Remove the first image from content (to avoid duplication with featured image)
 */
export function removeFirstImageFromContent(content: string): string {
  return content.replace(/<img[^>]+src="([^"]+)"[^>]*>/i, '');
}

/**
 * Enhance images in content with better styling
 */
export function enhanceImagesInContent(content: string): string {
  return content.replace(
    /<img([^>]*)>/gi,
    '<img$1 class="rounded-lg shadow-lg my-6 mx-auto max-w-full h-auto">'
  );
}

/**
 * Format date for display
 */
export function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
