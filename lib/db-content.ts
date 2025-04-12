/**
 * Database-backed Content Management System
 * 
 * This utility provides functions to interact with the centralized content database
 * for the rolodexterLABS website. It replaces the file-based approach with a robust,
 * super-fast database system to handle high-volume content publishing (30-100 articles daily).
 */

import { prisma } from './prisma';
import type { ContentItem, Tag, Category } from '@prisma/client';

// Types for content operations
export type ContentWithRelations = ContentItem & {
  tags: Tag[];
  categories: Category[];
};

/**
 * Get the most recent content items
 * @param count Number of items to return
 * @returns Array of content items sorted by modification time (newest first)
 */
export async function getRecentContent(count = 30): Promise<ContentWithRelations[]> {
  try {
    const items = await prisma.contentItem.findMany({
      where: {
        published: true,
      },
      include: {
        tags: true,
        categories: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: count,
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching recent content:', error);
    return [];
  }
}

/**
 * Get content by slug
 * @param slug The slug of the content item
 * @returns The content item or null if not found
 */
export async function getContentBySlug(slug: string): Promise<ContentWithRelations | null> {
  try {
    const item = await prisma.contentItem.findUnique({
      where: {
        slug,
      },
      include: {
        tags: true,
        categories: true,
      },
    });
    
    return item;
  } catch (error) {
    console.error(`Error fetching content with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get content by type
 * @param type The type of content (article, knowledge, project, etc.)
 * @param count Number of items to return
 * @returns Array of content items of the specified type
 */
export async function getContentByType(type: string, count = 30): Promise<ContentWithRelations[]> {
  try {
    const items = await prisma.contentItem.findMany({
      where: {
        type,
        published: true,
      },
      include: {
        tags: true,
        categories: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: count,
    });
    
    return items;
  } catch (error) {
    console.error(`Error fetching content of type ${type}:`, error);
    return [];
  }
}

/**
 * Get featured content
 * @param count Number of items to return
 * @returns Array of featured content items
 */
export async function getFeaturedContent(count = 5): Promise<ContentWithRelations[]> {
  try {
    const items = await prisma.contentItem.findMany({
      where: {
        published: true,
        featured: true,
      },
      include: {
        tags: true,
        categories: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: count,
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return [];
  }
}

/**
 * Get content by tag
 * @param tagName The name of the tag
 * @param count Number of items to return
 * @returns Array of content items with the specified tag
 */
export async function getContentByTag(tagName: string, count = 30): Promise<ContentWithRelations[]> {
  try {
    const items = await prisma.contentItem.findMany({
      where: {
        published: true,
        tags: {
          some: {
            name: tagName,
          },
        },
      },
      include: {
        tags: true,
        categories: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: count,
    });
    
    return items;
  } catch (error) {
    console.error(`Error fetching content with tag ${tagName}:`, error);
    return [];
  }
}

/**
 * Get content by category
 * @param categoryName The name of the category
 * @param count Number of items to return
 * @returns Array of content items in the specified category
 */
export async function getContentByCategory(categoryName: string, count = 30): Promise<ContentWithRelations[]> {
  try {
    const items = await prisma.contentItem.findMany({
      where: {
        published: true,
        categories: {
          some: {
            name: categoryName,
          },
        },
      },
      include: {
        tags: true,
        categories: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: count,
    });
    
    return items;
  } catch (error) {
    console.error(`Error fetching content with category ${categoryName}:`, error);
    return [];
  }
}

/**
 * Create a new content item
 * @param data The content item data
 * @returns The created content item
 */
export async function createContent(data: {
  title: string;
  slug: string;
  type: string;
  content: string;
  excerpt?: string;
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  categories?: string[];
}): Promise<ContentItem | null> {
  try {
    // Process tags
    const tagConnections = data.tags 
      ? {
          connectOrCreate: data.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }
          }))
        }
      : undefined;
    
    // Process categories
    const categoryConnections = data.categories
      ? {
          connectOrCreate: data.categories.map(category => ({
            where: { name: category },
            create: { name: category, slug: category.toLowerCase().replace(/\s+/g, '-') }
          }))
        }
      : undefined;
    
    // Create the content item
    const contentItem = await prisma.contentItem.create({
      data: {
        title: data.title,
        slug: data.slug,
        type: data.type,
        content: data.content,
        excerpt: data.excerpt || '',
        published: data.published !== undefined ? data.published : true,
        featured: data.featured || false,
        tags: tagConnections,
        categories: categoryConnections,
      },
    });
    
    return contentItem;
  } catch (error) {
    console.error('Error creating content:', error);
    return null;
  }
}

/**
 * Update an existing content item
 * @param id The ID of the content item to update
 * @param data The updated content item data
 * @returns The updated content item
 */
export async function updateContent(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    type: string;
    content: string;
    excerpt: string;
    published: boolean;
    featured: boolean;
    tags: string[];
    categories: string[];
  }>
): Promise<ContentItem | null> {
  try {
    // Process tags if provided
    const tagConnections = data.tags 
      ? {
          set: [], // Clear existing connections
          connectOrCreate: data.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }
          }))
        }
      : undefined;
    
    // Process categories if provided
    const categoryConnections = data.categories
      ? {
          set: [], // Clear existing connections
          connectOrCreate: data.categories.map(category => ({
            where: { name: category },
            create: { name: category, slug: category.toLowerCase().replace(/\s+/g, '-') }
          }))
        }
      : undefined;
    
    // Update the content item
    const contentItem = await prisma.contentItem.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.published !== undefined && { published: data.published }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(tagConnections && { tags: tagConnections }),
        ...(categoryConnections && { categories: categoryConnections }),
        updatedAt: new Date(),
      },
    });
    
    return contentItem;
  } catch (error) {
    console.error(`Error updating content with ID ${id}:`, error);
    return null;
  }
}

/**
 * Delete a content item
 * @param id The ID of the content item to delete
 * @returns True if deletion was successful, false otherwise
 */
export async function deleteContent(id: string): Promise<boolean> {
  try {
    await prisma.contentItem.delete({
      where: { id },
    });
    
    return true;
  } catch (error) {
    console.error(`Error deleting content with ID ${id}:`, error);
    return false;
  }
}

/**
 * Search content items
 * @param query The search query
 * @param count Number of items to return
 * @returns Array of content items matching the search query
 */
export async function searchContent(query: string, count = 30): Promise<ContentWithRelations[]> {
  try {
    const items = await prisma.contentItem.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { tags: { some: { name: { contains: query, mode: 'insensitive' } } } },
          { categories: { some: { name: { contains: query, mode: 'insensitive' } } } },
        ],
      },
      include: {
        tags: true,
        categories: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: count,
    });
    
    return items;
  } catch (error) {
    console.error(`Error searching content with query ${query}:`, error);
    return [];
  }
}
