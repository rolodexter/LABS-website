import { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLinkText: string;
  backLinkHref: string;
}

export default function PlaceholderPage({
  title,
  description,
  backLinkText,
  backLinkHref
}: PlaceholderPageProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
      <Head>
        <title>{title} | rolodexterLABS</title>
        <meta name="description" content={description} />
      </Head>

      <div className="mb-8">
        <Link href={backLinkHref} className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to {backLinkText}
        </Link>
      </div>
      
      <div className="py-16 px-8 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="mb-2 text-sm uppercase tracking-wider text-gray-500">Coming Soon</div>
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">{title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          This page is under development. Check back soon.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button as={Link} href="/contact">
            Contact Us
          </Button>
          <Button as={Link} href="/" color="light">
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to create a custom layout that prevents duplicate footers
export function createPlaceholderLayout(Component: any) {
  Component.getLayout = function getLayout(page: ReactElement) {
    return <div>{page}</div>;
  };
  
  return Component;
}
