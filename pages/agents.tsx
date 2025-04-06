import type { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import servicesData from '@/data/services.json';
import productsData from '@/data/products.json';
import Badge from '@/components/ui/Badge';
import type { NextPageWithLayout } from '@/types/next';

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

// Type for product data
type ProductStatus = 'Stable' | 'In Development' | 'Planned';
type Product = {
  slug: string;
  title: string;
  category: string;
  status: ProductStatus;
  path: string;
};

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
  // Reference to linked services
  linkedServices?: Service[];
};

// Process agents with their linked services
const createAgentData = (): Agent[] => {
  const agentBase: Agent[] = [
    {
      id: 'rolodexterGPT',
      name: 'rolodexterGPT',
      role: 'Research & Knowledge Orchestrator',
      description: 'Specialized in research synthesis, network coordination, and knowledge integration across domains. Designed to operate as the central coordination layer for multi-agent systems.',
      capabilities: [
        'Multi-agent orchestration',
        'Memory-augmented generation',
        'Research synthesis',
        'Knowledge mapping'
      ],
      status: 'active'
    },
    {
      id: 'rolodexterVS',
      name: 'rolodexterVS',
      role: 'Developer & Engineering Agent',
      description: 'Full-stack software development and engineering agent with specialized capabilities for code generation, debugging, and optimization across programming languages.',
      capabilities: [
        'Code generation and refactoring',
        'Software architecture design',
        'Code explanation and documentation',
        'Testing and debugging'
      ],
      product: 'rolodexterVS',
      status: 'active'
    },
    {
      id: 'rolodexterEX',
      name: 'rolodexterEX',
      role: 'Executive Functions Agent',
      description: 'Specialized in planning, decision-making, and strategic execution. Helps manage complex projects and workflows by creating structured approaches to ambiguous problems.',
      capabilities: [
        'Strategic planning',
        'Decision analysis',
        'Resource allocation',
        'Risk assessment and mitigation'
      ],
      status: 'active'
    },
    {
      id: 'rolodexterCR',
      name: 'rolodexterCR',
      role: 'Creative & Design Agent',
      description: 'Focused on creative content generation, design collaboration, and multimedia production. Bridges conceptual thinking with practical execution.',
      capabilities: [
        'Visual design collaboration',
        'Content creation and editing',
        'Brand voice development',
        'Product design ideation'
      ],
      status: 'in-development'
    },
    {
      id: 'rolodexterKNOW',
      name: 'rolodexterKNOW',
      role: 'Knowledge & Documentation Agent',
      description: 'Manages information architecture, documentation, and knowledge organization. Ensures consistency and accessibility across information systems.',
      capabilities: [
        'Documentation generation',
        'Knowledge graph development',
        'Information architecture',
        'Learning resource creation'
      ],
      status: 'in-development'
    }
  ];
  
  // Connect agents with their linked services
  return agentBase.map(agent => {
    // Find all services linked to this agent from the four main categories
    // Only include services with a non-null linkedAgent that matches this agent.id
    const linkedServices = servicesData
      .filter(service => 
        typeof service.linkedAgent === 'string' && 
        service.linkedAgent === agent.id &&
        ['Blockchains', 'Models', 'Science', 'Work'].includes(service.category)
      )
      .map(service => ({
        ...service,
        // Ensure service.status is of type ServiceStatus
        status: service.status as ServiceStatus,
        // Ensure linkedAgent is never null to satisfy TypeScript
        linkedAgent: service.linkedAgent || undefined
      }));
    
    // Find the product if referenced
    const linkedProduct = agent.product ? 
      productsData.find(product => product.slug === agent.product) : 
      undefined;
    
    // Return enriched agent data
    return {
      ...agent,
      linkedServices: linkedServices.length > 0 ? linkedServices : undefined,
    };
  });
};

// Generate agents with linked services
const agents: Agent[] = createAgentData();

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
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Available Services:</h3>
                <ul className="space-y-1">
                  {agent.linkedServices ? (
                    agent.linkedServices.map(service => (
                      <li key={service.slug}>
                        <Link 
                          href={service.path}
                          className="inline-flex items-center space-x-1 text-sm hover:underline"
                        >
                          <span>{service.title}</span>
                          <Badge status={service.status} size="sm">{service.status}</Badge>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 italic">Services coming soon</li>
                  )}
                </ul>
              </div>
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