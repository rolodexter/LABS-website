/**
 * Custom image loader for Next.js
 * This ensures images are loaded correctly in both development and production environments
 */
export default function imageLoader({ src, width, quality }) {
  // For absolute URLs (external images), return as-is
  if (src.startsWith('http')) {
    return src;
  }
  
  // For logo files, serve them directly without any transformations
  if (src.includes('logos/') || src.startsWith('/logos/')) {
    return src;
  }

  // For other local images, maintain the path
  // Remove any leading slash to prevent double slashes
  const path = src.startsWith('/') ? src.slice(1) : src;
  return `/${path}`;
}