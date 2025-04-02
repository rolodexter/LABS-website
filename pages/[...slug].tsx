import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { KnowledgeLayout } from '@/components/knowledge/KnowledgeLayout';
import { 
  getAllKnowledgeModules, 
  getSerializedKnowledgeModule, 
  getKnowledgeModulePath 
} from '@/lib/knowledge';

interface KnowledgePageProps {
  frontMatter: any;
  mdxSource: any;
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export default function KnowledgePage({ frontMatter, mdxSource }: KnowledgePageProps) {
  if (!frontMatter) {
    return <div>Module not found</div>;
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} | rolodexterLABS</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <KnowledgeLayout frontMatter={frontMatter} mdxSource={mdxSource} />
    </>
  );
}

export const getStaticProps: GetStaticProps<KnowledgePageProps, Params> = async ({ params }) => {
  if (!params?.slug || params.slug.length < 2) {
    return { notFound: true };
  }

  // The last part of the path is the module slug
  const moduleSlug = params.slug[params.slug.length - 1];
  
  // The rest of the path should form the category
  const categoryPath = params.slug.slice(0, params.slug.length - 1).join('/');
  
  const serializedModule = await getSerializedKnowledgeModule(moduleSlug);
  
  if (!serializedModule || serializedModule.frontMatter.category !== categoryPath) {
    return { notFound: true };
  }
  
  return {
    props: {
      frontMatter: serializedModule.frontMatter,
      mdxSource: serializedModule.mdxSource
    },
    revalidate: 60 * 60 // Revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const modules = await getAllKnowledgeModules();
  
  const paths = modules.map(module => {
    const fullPath = getKnowledgeModulePath(module);
    // Remove leading slash and split by /
    const segments = fullPath.substring(1).split('/');
    
    return {
      params: {
        slug: segments
      }
    };
  });
  
  return {
    paths,
    fallback: 'blocking'
  };
};
