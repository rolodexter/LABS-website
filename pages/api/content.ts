import { NextApiRequest, NextApiResponse } from 'next';
import { getAllContent, ContentItem } from '../../lib/content';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = '1', limit = '6', category, excludeSlug } = req.query;
  
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  
  try {
    // Get all content
    const allContent = await getAllContent('knowledge');
    
    // Filter by category if provided
    let filteredContent = allContent;
    if (category) {
      filteredContent = allContent.filter(item => 
        item.meta.category && item.meta.category.includes(category as string)
      );
    }
    
    // Exclude specific slug if provided
    if (excludeSlug) {
      filteredContent = filteredContent.filter(item => 
        item.meta.slug !== excludeSlug
      );
    }
    
    // Sort by last_updated (newest first)
    filteredContent.sort((a, b) => {
      const dateA = new Date(a.meta.last_updated || '');
      const dateB = new Date(b.meta.last_updated || '');
      return dateB.getTime() - dateA.getTime();
    });
    
    // Paginate
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const paginatedContent = filteredContent.slice(startIndex, endIndex);
    
    // Return paginated content and metadata
    res.status(200).json({
      content: paginatedContent,
      pagination: {
        total: filteredContent.length,
        page: pageNumber,
        limit: limitNumber,
        hasMore: endIndex < filteredContent.length
      }
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
}
