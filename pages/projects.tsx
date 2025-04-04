import type { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Project data structure
type Project = {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: 'live' | 'beta' | 'coming soon';
  image: string;
  url?: string;
};

// Sample project data
const projects: Project[] = [
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph',
    description: 'An interactive visualization tool that maps connections between concepts, research findings, and insights across the rolodexterLABS ecosystem.',
    features: [
      'Interactive concept mapping',
      'Semantic relationship visualization',
      'Source attribution',
      'Citation linking',
      'Custom knowledge domains'
    ],
    status: 'live',
    image: '/sample-images/knowledge-graph.png',
    url: '/knowledge'
  },
  {
    id: 'research-assistant',
    name: 'Research Assistant',
    description: 'AI-powered research tool that helps users gather, synthesize, and analyze information from multiple sources with academic rigor.',
    features: [
      'Multi-source research',
      'Citation management',
      'Literature review automation',
      'Research gap identification',
      'Writing assistance'
    ],
    status: 'beta',
    image: '/sample-images/research.png',
    url: '/console'
  },
  {
    id: 'document-analyzer',
    name: 'Document Analyzer',
    description: 'Extract insights, key points, and structured data from documents, research papers, and reports automatically.',
    features: [
      'PDF and document parsing',
      'Key insight extraction',
      'Metadata organization',
      'Concept tagging',
      'Cross-document referencing'
    ],
    status: 'beta',
    image: '/sample-images/document.png'
  },
  {
    id: 'knowledge-compiler',
    name: 'Knowledge Compiler',
    description: 'Transform unstructured notes and research into structured, referenceable knowledge modules that integrate with the knowledge graph.',
    features: [
      'Note transformation',
      'Automatic categorization',
      'Knowledge module creation',
      'Integration with knowledge graph',
      'Version control for knowledge'
    ],
    status: 'coming soon',
    image: '/sample-images/compiler.png'
  }
];

// Status badge component
function StatusBadge({ status }: { status: Project['status'] }): ReactElement {
  const badgeClasses = {
    'live': 'bg-green-50 text-green-700 border-green-200',
    'beta': 'bg-blue-50 text-blue-700 border-blue-200',
    'coming soon': 'bg-gray-50 text-gray-700 border-gray-200'
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${badgeClasses[status]}`}>
      {status}
    </span>
  );
}

export default function ProjectsPage(): ReactElement {
  return (
    <>
      <Head>
        <title>Projects | rolodexterLABS</title>
        <meta name="description" content="Explore the ecosystem of tools and projects from rolodexterLABS" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Ecosystem Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the suite of tools and projects that make up the rolodexterLABS ecosystem.
            From knowledge management to research assistance, these applications work together
            to enhance your information work.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 w-full bg-gray-100">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-2xl font-bold text-gray-300">
                    {project.name}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <StatusBadge status={project.status} />
                </div>
                
                <p className="text-gray-800 mb-4">
                  {project.description}
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="space-y-1 mb-6">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-black mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {project.url ? (
                  <Link href={project.url} 
                    className="inline-block px-4 py-2 bg-white border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-200">
                    Explore Project
                  </Link>
                ) : (
                  <button disabled 
                    className="inline-block px-4 py-2 bg-gray-50 border border-gray-300 text-gray-400 font-medium rounded-md cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Building something new?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            The rolodexterLABS ecosystem is constantly growing. If you have ideas for new tools
            or want to collaborate on developing ecosystem extensions, we'd love to hear from you.
          </p>
          <Link href="/contact" 
            className="px-6 py-3 bg-white border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-200">
            Get In Touch
          </Link>
        </div>
      </div>
    </>
  );
}