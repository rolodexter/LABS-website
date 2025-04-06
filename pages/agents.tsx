import type { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import servicesData from '@/data/services.json';
import Badge from '@/components/ui/Badge';
import type { NextPageWithLayout } from '@/types/next';

// Agent data structure
type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  avatar?: string;
  product?: string;
  status?: 'active' | 'in-development';
};

// Type for service data
type ServiceStatus = 'Stable' | 'In Development' | 'Planned';
type Service = {
  slug: string;
  title: string;
  category: string;
  status: ServiceStatus;
  path: string;
  linkedAgent?: string;
};

// Updated agent data
const agents: Agent[] = [
  {
    id: 'rolodexterGPT',
    name: 'rolodexterGPT',
    role: 'Research & Knowledge Orchestrator',
    description: 'Specialized in research synthesis, network coordination, and knowledge integration across domains. Designed to operate as the central coordination layer for multi-agent systems.',
    capabilities: [
      'Multi-agent orchestration',
      'Memory-augmented generation',
      'Research-to-report conversion',
      'AI coordination layer for knowledge agents',
      'Context-aware information retrieval'
    ],
    product: 'rolodexterGPT',
    status: 'active'
  },
  {
    id: 'rolodexterVS',
    name: 'rolodexterVS',
    role: 'Developer & Code Intelligence',
    description: 'Developer-focused agent designed to manage source code, scripts, deployment, and task automation. Integrates directly with VS Code and development environments.',
    capabilities: [
      'Code scaffolding and prompt injection',
      'Terminal control and debugging',
      'GitHub repo operations',
      'Documentation generation',
      'Code analysis and optimization'
    ],
    product: 'rolodexterVS',
    status: 'active'
  },
  {
    id: 'rolodexterDATA',
    name: 'rolodexterDATA',
    role: 'Data & Statistical Intelligence',
    description: 'Specialized in data processing, statistical analysis, and model validation. Helps extract insights from complex datasets and translates them into actionable intelligence.',
    capabilities: [
      'Statistical processing and validation',
      'Model evaluation frameworks',
      'Analytics pipeline management',
      'Data visualization generation',
      'Pattern recognition systems'
    ],
    product: 'Knowledge Workers',
    status: 'in-development'
  },
  {
    id: 'rolodexterKNOW',
    name: 'rolodexterKNOW',
    role: 'Knowledge Management Specialist',
    description: 'Focused on knowledge base structuring, ontology alignment, and taxonomy curation. Builds robust knowledge systems and maintains information architectures.',
    capabilities: [
      'Ontology development and maintenance',
      'Taxonomy creation and curation',
      'Knowledge graph construction',
      'Citation management',
      'Research corpus organization'
    ],
    product: 'Knowledge Workers',
    status: 'in-development'
  },
  {
    id: 'rolodexterCREATIVE',
    name: 'rolodexterCREATIVE',
    role: 'Creative & Interface Agent',
    description: 'Front-facing UI/UX generation, narrative explanation, and visualization specialist. Bridges complex systems with intuitive human interfaces.',
    capabilities: [
      'UI/UX prototyping and generation',
      'Narrative composition and editing',
      'Visual design systems',
      'Information visualization',
      'Content transformation'
    ],
    product: 'Creative Workers',
    status: 'in-development'
  }
];

const AgentsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Agents | rolodexterLABS</title>
        <meta name="description" content="Networked intelligence agents that form the programmable research ecosystem of rolodexterLABS" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Agent Ecosystem</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our agents aren't just assistants — they are programmable researchers and collaborators 
            integrated across the rolodexterLABS ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white border border-gray-200 hover:border-black transition-colors rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{agent.name}</h2>
                  <p className="text-gray-600">{agent.role}</p>
                </div>
                {agent.status === 'in-development' && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">In Development</span>
                )}
              </div>
              
              <p className="text-gray-800 mb-4">
                {agent.description}
              </p>
              
              <h3 className="text-lg font-semibold mb-2">Capabilities</h3>
              <ul className="space-y-1 mb-4">
                {agent.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
              
              {agent.product && (
                <div className="text-sm text-gray-500 mt-4">
                  Part of: <span className="font-medium">{agent.product}</span>
                </div>
              )}
              
              {/* Display linked services */}
              {agent.id && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-sm font-semibold mb-2">Connected Services</h3>
                  <div className="space-y-2">
                    {servicesData
                      .filter(service => service.linkedAgent === agent.id)
                      .map(service => (
                        <Link href={`/services/${service.path}`} key={service.slug}
                              className="flex items-center justify-between p-2 border border-gray-100 rounded hover:border-black transition-colors">
                          <span className="font-medium">{service.title}</span>
                          <Badge status={service.status as ServiceStatus} size="sm">{service.status}</Badge>
                        </Link>
                      ))}
                    {servicesData.filter(service => service.linkedAgent === agent.id).length === 0 && (
                      <p className="text-sm text-gray-500 italic">No connected services yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Work with our agents</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our specialized agents work together to provide a comprehensive intelligence
            platform for your research, development, and knowledge management needs.
          </p>
          <Link href="/dashboard" className="text-sm px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
            Visit Developer Console
          </Link>
        </div>
      </div>
    </>
  );
};

// Add custom layout function to prevent duplicate footer
AgentsPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default AgentsPage;