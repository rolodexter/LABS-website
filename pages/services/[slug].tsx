import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import servicesData from '@/data/services.json';
import Badge from '@/components/ui/Badge';
import { getServiceMarkdownContent } from '@/lib/services';

interface ServiceProps {
  service: {
    id: string;
    slug: string;
    title: string;
    category: string;
    status: string;
    path: string;
    linkedAgent?: string;
    icon?: string;
    badge?: string | null;
    content?: string;
  };
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

// Map status values to those expected by Badge component
const mapStatus = (status: string): "available" | "development" | "planned" | undefined => {
  switch (status) {
    case "Stable":
    case "available":
      return "available";
    case "In Development":
    case "development":
      return "development";
    case "Planned":
    case "planned":
      return "planned";
    default:
      return undefined;
  }
};

export default function ServicePage({ service }: ServiceProps) {
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 antialiased">
      <Head>
        <title>{service.title} | rolodexterLABS</title>
        <meta name="description" content={`rolodexterLABS ${service.title} service`} />
      </Head>
      
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-8">
          <Link 
            href="/services" 
            className="text-sm hover:underline inline-flex items-center mr-4"
          >
            ← Back to Services
          </Link>
          
          <Badge 
            status={mapStatus(service.status)} 
            size="sm"
          >
            {service.status === 'available' ? 'Available' : 
             service.status === 'development' ? 'In Development' : 'Planned'}
          </Badge>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-12">
          <span className="mr-4">Category: {service.category}</span>
          {service.linkedAgent && (
            <span>Agent: <span className="font-mono">{service.linkedAgent}</span></span>
          )}
        </div>
        
        {service.content ? (
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          </div>
        ) : (
          <div className="p-8 border border-gray-200 rounded-md bg-gray-50 text-center">
            <p className="text-xl text-gray-600">
              Detailed information about this service will be available soon.
            </p>
            {service.status === 'development' && (
              <p className="mt-4 text-gray-500">
                This service is currently in development.
              </p>
            )}
          </div>
        )}
        
        <div className="mt-16">
          <Link 
            href="/contact"
            className="inline-flex items-center border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Inquire about this service
          </Link>
        </div>
      </div>
    </div>
  );
}

// Define a custom layout for service pages that doesn't include a footer
// This prevents the duplicate footer issue
ServicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};

export const getStaticProps: GetStaticProps<ServiceProps, Params> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const service = servicesData.find(service => service.slug === params.slug);
  
  if (!service) {
    return { notFound: true };
  }
  
  // Try to get markdown content if available
  let content = null;
  if (service.contentPath) {
    try {
      const mdContent = await getServiceMarkdownContent(service.contentPath);
      content = mdContent.htmlContent;
    } catch (error) {
      console.error(`Error loading markdown for ${service.slug}:`, error);
    }
  }
  
  return {
    props: {
      service: {
        ...service,
        content: content
      }
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = servicesData.map(service => ({
    params: { slug: service.slug }
  }));
  
  return {
    paths,
    fallback: false
  };
};
