import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import MinimalLayout from '@/components/layout/MinimalLayout';
import { getSampleKnowledgeFiles } from '@/utils/fileUtils';

interface KnowledgeFileProps {
  title: string;
  content: string;
  slug: string[];
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export default function KnowledgeFile({ title, content, slug }: KnowledgeFileProps) {
  return (
    <MinimalLayout
      title={`${title} | rolodexterLABS`}
      description={`Knowledge file: ${title}`}
    >
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </MinimalLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all knowledge files
  const knowledgeFiles = getSampleKnowledgeFiles(30);
  
  // Create paths from the slugs
  const paths = knowledgeFiles.map(file => {
    // Remove the leading '/knowledge/' and split by '/'
    const slug = file.slug.replace(/^\/knowledge\//, '').split('/');
    return {
      params: { slug }
    };
  });
  
  return {
    paths,
    // Generate pages for paths not returned by getStaticPaths
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<KnowledgeFileProps, Params> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  
  // Join the slug parts to recreate the full slug
  const fullSlug = `/knowledge/${params.slug.join('/')}`;
  
  // Get all knowledge files
  const knowledgeFiles = getSampleKnowledgeFiles(100);
  
  // Find the matching file
  const file = knowledgeFiles.find(f => f.slug === fullSlug);
  
  if (!file) {
    return { notFound: true };
  }
  
  // Generate sample content based on the title
  const paragraphs = [
    `<p>This is a sample knowledge file for <strong>${file.title}</strong>.</p>`,
    `<p>In a real implementation, this would contain the actual content of the knowledge file, loaded from a markdown or MDX file.</p>`,
    `<p>The content would be processed and rendered with proper formatting, code highlighting, and other features.</p>`,
    `<p>This file was last modified on ${new Date(file.modifiedTime).toLocaleDateString()} at ${new Date(file.modifiedTime).toLocaleTimeString()}.</p>`,
    `<p>The slug for this file is: ${fullSlug}</p>`
  ];
  
  // Join paragraphs with line breaks
  const content = paragraphs.join('\n');
  
  return {
    props: {
      title: file.title,
      content,
      slug: params.slug
    },
    // Revalidate every hour
    revalidate: 3600
  };
};
