/**
 * rolodexterLABS - Ultra Minimalist Knowledge Platform
 * 
 * A completely clean, white front page with minimal content.
 * 
 * @author rolodexterLABS
 * @version 4.0.0
 * @updated April 2, 2025
 */

import React from 'react';
import MinimalLayout from '@/components/layout/MinimalLayout';
import { getRecentContent } from '@/lib/db-content';
import { GetStaticProps } from 'next';
import { getSampleKnowledgeFiles } from '@/utils/fileUtils';

interface HomeProps {
  contentItems: {
    id: string;
    title: string;
    slug: string;
    updatedAt: string;
  }[];
}

export default function Home({ contentItems }: HomeProps) {
  return (
    <MinimalLayout
      title="rolodexterLABS | Recent Content"
      description="The 30 most recently modified content items"
    >
      {contentItems.map((item) => (
        <div key={item.id}>
          <a href={item.slug}>{item.title}</a>
        </div>
      ))}
    </MinimalLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Try to get content from the database
    const dbContent = await getRecentContent(30);
    
    if (dbContent.length > 0) {
      // If we have content in the database, use it
      const contentItems = dbContent.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        updatedAt: item.updatedAt.toISOString()
      }));
      
      return {
        props: { contentItems },
        revalidate: 60 // Revalidate every minute for fresh content
      };
    }
  } catch (error) {
    console.error('Error fetching content from database:', error);
    // If database fetch fails, we'll fall back to sample data
  }
  
  // Fallback to sample data if database is empty or fetch fails
  const sampleFiles = getSampleKnowledgeFiles(30);
  const contentItems = sampleFiles.map(file => ({
    id: Math.random().toString(36).substring(2, 15),
    title: file.title,
    slug: file.slug,
    updatedAt: file.modifiedTime.toISOString()
  }));
  
  return {
    props: { contentItems },
    revalidate: 3600 // Revalidate every hour for sample data
  };
}
