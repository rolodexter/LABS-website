import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/navigation/Header';
import { getAllContent, getContentBySlug, ContentItem } from '@/lib/content';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { motion } from 'framer-motion';

// MDX components
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="my-4 text-lg" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: any) => <li className="my-1" {...props} />,
  a: (props: any) => <a className="text-black underline hover:text-gray-700" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
  hr: () => <hr className="my-8 border-t border-gray-200" />,
  code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
};

interface KnowledgePageProps {
  content: ContentItem;
  mdxSource: MDXRemoteSerializeResult;
  relatedContent: ContentItem[];
}

export default function KnowledgePage({ content, mdxSource, relatedContent }: KnowledgePageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{content.meta.title} | rolodexter</title>
        <meta name="description" content={content.meta.summary} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-gray-500 hover:text-black">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/knowledge" className="text-gray-500 hover:text-black">
              Knowledge
            </Link>{' '}
            /{' '}
            <span className="text-black">{content.meta.title}</span>
          </div>

          {/* Article Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-6">{content.meta.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
              <span>Last updated: {new Date(content.meta.last_updated).toLocaleDateString()}</span>
              {content.meta.agent_author && (
                <>
                  <span className="mx-2">•</span>
                  <span>By {content.meta.agent_author}</span>
                </>
              )}
            </div>
            {content.meta.summary && (
              <p className="text-xl text-gray-700 border-l-4 border-black pl-4 py-2">{content.meta.summary}</p>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote {...mdxSource} components={components} />
          </div>

          {/* Tags */}
          {content.meta.tags && content.meta.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {content.meta.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-sm rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Content */}
          {relatedContent.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-6">Related Knowledge</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedContent.map((item) => (
                  <Link
                    key={item.meta.slug}
                    href={`/knowledge/${item.meta.slug.replace(/^\/knowledge\//, '')}`}
                    className="p-4 border border-gray-200 hover:border-black hover:shadow-sm transition-all duration-200"
                  >
                    <h4 className="font-bold mb-2">{item.meta.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.meta.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allContent = await getAllContent('knowledge');
  
  const paths = allContent.map((item) => {
    // Extract the slug from the full path
    // For example, from '/knowledge/infrastructure/privacy/data-privacy-and-chatbots'
    // we need to get 'infrastructure/privacy/data-privacy-and-chatbots'
    let slug = item.meta.slug;
    
    // Remove leading slash if present
    if (slug.startsWith('/')) {
      slug = slug.substring(1);
    }
    
    // Remove 'knowledge/' prefix if present
    if (slug.startsWith('knowledge/')) {
      slug = slug.substring('knowledge/'.length);
    }
    
    // For catch-all routes, we need to split the path into segments
    // This allows Next.js to handle nested paths correctly
    const segments = slug.split('/');
    
    console.log(`Original slug: ${item.meta.slug}, Processed slug: ${slug}`);
    
    return {
      params: { slug: segments.join('/') }
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Try different slug formats to find the content
  let content = await getContentBySlug(`/knowledge/${slug}`);
  
  // If not found, try with just the slug
  if (!content) {
    content = await getContentBySlug(slug);
  }
  
  // If still not found, try with knowledge/ prefix
  if (!content) {
    content = await getContentBySlug(`knowledge/${slug}`);
  }
  
  if (!content) {
    return {
      notFound: true,
    };
  }

  // Process MDX content
  const mdxSource = await serialize(content.content, {
    // Note: We're removing the remark/rehype plugins for now as they require installation
    // If you need these features, install the packages and uncomment these lines
    /*
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypePrism,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
    */
  });

  // Get related content based on tags or category
  const allContent = await getAllContent('knowledge');
  const relatedContent = allContent
    .filter((item) => 
      item.meta.slug !== content.meta.slug && 
      (
        (content.meta.tags && item.meta.tags && 
          content.meta.tags.some(tag => item.meta.tags?.includes(tag))) ||
        item.meta.category === content.meta.category
      )
    )
    .slice(0, 3);

  return {
    props: {
      content,
      mdxSource,
      relatedContent,
    },
    revalidate: 60, // Revalidate every minute
  };
};
