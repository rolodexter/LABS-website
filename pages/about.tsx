import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { marked, MarkedOptions } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import type { GetStaticPropsResult } from 'next';

// Define NextPageWithLayout type locally
type NextPageWithLayout<P = Record<string, unknown>> = React.FC<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

interface AboutPageProps {
  content: string;
}

const AboutPage: NextPageWithLayout<AboutPageProps> = ({ content }) => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    // Sanitize the HTML to prevent XSS attacks
    const clean = DOMPurify.sanitize(content);
    setSanitizedContent(clean);
  }, [content]);

  return (
    <>
      <Head>
        <title>About | rolodexterLABS</title>
        <meta
          name="description"
          content="rolodexterLABS is the research and development division of the rolodexter ecosystem, dedicated to investigating the future of intelligence, governance, public infrastructure, and emergent systems across digital and physical domains."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-12 text-black">About rolodexterLABS</h1>

        <div
          className="prose max-w-none 
                    prose-headings:font-semibold prose-headings:text-black prose-headings:mb-4
                    prose-h2:text-2xl prose-h2:mt-8
                    prose-h3:text-xl prose-h3:mt-6
                    prose-h4:text-lg prose-h4:mt-4
                    prose-a:text-gray-700 prose-a:no-underline hover:prose-a:underline
                    prose-p:text-black prose-p:leading-relaxed prose-p:my-4
                    prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:my-2
                    prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
                    prose-strong:font-semibold
                    prose-img:rounded-lg prose-img:shadow-md prose-img:my-6"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/research"
            className="inline-flex items-center text-gray-700 hover:text-black transition-colors text-lg"
          >
            → Explore Our Research
          </Link>
        </div>
      </div>
    </>
  );
};

// Add custom layout function to prevent duplicate footer
AboutPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<AboutPageProps>> => {
  try {
    // Read the about markdown file
    const filePath = path.join(process.cwd(), 'content', 'intake', 'About.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Set up marked options for proper rendering
    marked.setOptions({
      gfm: true,
      breaks: false,
      pedantic: false,
    });

    // Convert markdown to HTML
    const content = marked.parse(fileContent) as string;

    return {
      props: {
        content,
      },
    };
  } catch (error) {
    console.error('Error reading about content:', error);
    return {
      props: {
        content: '<p>Content is currently unavailable. Please check back soon.</p>',
      },
    };
  }
};

export default AboutPage;
