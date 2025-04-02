import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';
import KnowledgePreview from '../../../components/KnowledgePreview';

// This function runs on the server at request time
export async function getServerSideProps({ params, req }) {
  // Basic preview protection - you might want to add more robust authentication
  const isPreviewAllowed = process.env.NODE_ENV === 'development' || 
                          req.headers.referer?.includes('localhost') ||
                          req.headers.host.includes('preview.');

  if (!isPreviewAllowed) {
    return {
      notFound: true
    };
  }

  try {
    // Try to find the MDX file in the content directory
    const contentDir = path.join(process.cwd(), 'content/knowledge');
    const files = await fs.readdir(contentDir, { recursive: true });
    
    const mdxFile = files.find(file => {
      const parsed = path.parse(file);
      return parsed.ext === '.mdx' && file.includes(params.slug);
    });

    if (!mdxFile) {
      return {
        notFound: true
      };
    }

    const content = await fs.readFile(path.join(contentDir, mdxFile), 'utf8');

    return {
      props: {
        content,
        slug: params.slug
      }
    };
  } catch (error) {
    console.error('Error loading preview content:', error);
    return {
      notFound: true
    };
  }
}

export default function PreviewPage({ content, slug }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <KnowledgePreview content={content} />
    </div>
  );
}
