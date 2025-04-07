import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/types/next';
import researchIndex from '@/data/research-index.json';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

type ResearchItem = {
  slug: string;
  title: string;
  category: string;
  topic: string;
  date: string;
  status: string;
  summary: string;
};

const ResearchArticle: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [article, setArticle] = useState<ResearchItem | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Find the article in the research index
    const foundArticle = researchIndex.find(item => item.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);

      // Fetch the markdown content
      fetch(`/api/research?slug=${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.content) {
            // Set up marked options for proper rendering
            marked.setOptions({
              gfm: true,
              breaks: false,
              pedantic: false,
            });

            // Process the markdown content to HTML using marked
            try {
              const result = marked(data.content);
              // Handle both synchronous string return and Promise return
              if (result instanceof Promise) {
                result
                  .then(processedContent => {
                    // Sanitize the HTML to prevent XSS attacks and strip any unwanted tags
                    const sanitizedContent = DOMPurify.sanitize(processedContent);
                    setContent(sanitizedContent);
                    setLoading(false);
                  })
                  .catch(error => {
                    console.error('Error processing markdown:', error);
                    setLoading(false);
                  });
              } else {
                // Sanitize the HTML to prevent XSS attacks and strip any unwanted tags
                const sanitizedContent = DOMPurify.sanitize(result);
                setContent(sanitizedContent);
                setLoading(false);
              }
            } catch (error) {
              console.error('Error processing markdown:', error);
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching research content:', error);
          setLoading(false);
        });
    } else {
      // Article not found, redirect to research index
      router.push('/research');
    }
  }, [slug, router]);

  if (loading || !article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-8 w-1/2"></div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Head>
        <title>{article.title} | rolodexterLABS</title>
        <meta name="description" content={article.summary} />
      </Head>

      <div className="mb-8">
        <Link href="/research" className="text-gray-600 hover:underline inline-flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Research
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <header className="px-8 pt-8 pb-4 border-b border-gray-100 mb-8">
          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
            <span className="inline-flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <div className="flex gap-2">
              <Link
                href={`/research?category=${encodeURIComponent(article.category)}`}
                className="bg-gray-100 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {article.category}
              </Link>
              <Link
                href={`/research?topic=${encodeURIComponent(article.topic)}`}
                className="bg-gray-100 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {article.topic}
              </Link>
            </div>
          </div>

          {article.summary && (
            <div className="py-4 px-6 bg-gray-50 rounded-lg mb-6">
              <p className="text-lg text-gray-600">{article.summary}</p>
            </div>
          )}
        </header>

        <div className="px-8 pb-12">
          {!content && (
            <div className="p-6 bg-gray-50 rounded text-center">
              <p className="text-gray-500">Content is being processed. Please check back soon.</p>
            </div>
          )}
          <div
            className="prose max-w-none 
                      prose-headings:font-semibold prose-headings:text-black prose-headings:mb-4
                      prose-h1:text-3xl prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2
                      prose-h2:text-2xl prose-h2:mt-6
                      prose-h3:text-xl prose-h3:mt-5
                      prose-h4:text-lg prose-h4:mt-4
                      prose-a:text-gray-700 prose-a:no-underline hover:prose-a:underline
                      prose-p:text-black prose-p:leading-relaxed prose-p:my-4
                      prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                      prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                      prose-li:my-2
                      prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
                      prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                      prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4
                      "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </div>
  );
};

// Add custom layout function to prevent duplicate footer
ResearchArticle.getLayout = function getLayout(page: ReactElement) {
  return page;
};

// Temporarily disable static generation to debug build issues
export async function getStaticProps() {
  return {
    props: {
      title: 'Placeholder',
      content: 'Temporarily disabled to test build performance',
    },
  };
}

// Temporarily return empty paths to prevent static generation
export async function getStaticPaths() {
  return {
    paths: [], // Empty for now to prevent static generation
    fallback: true, // Use true to allow client-side rendering for any path
  };
}

export default ResearchArticle;
