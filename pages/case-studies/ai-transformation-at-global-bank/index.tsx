import { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function GlobalBankCaseStudyPlaceholder() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Head>
        <title>AI Transformation at Global Bank | rolodexterLABS Case Study</title>
        <meta name="description" content="Case study on AI transformation in the banking industry" />
      </Head>

      <div className="mb-8">
        <Link href="/case-studies" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Case Studies
        </Link>
      </div>
      
      <div className="py-16 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">This case study is under construction</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          We're working on documenting this success story. Check back soon.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button as={Link} href="/contact">
            Contact Us
          </Button>
          <Button as={Link} href="/services" color="light">
            View Services
          </Button>
        </div>
      </div>
    </div>
  );
}

// Define a custom layout to prevent duplicate footer issues
GlobalBankCaseStudyPlaceholder.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
