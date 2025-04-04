import type { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Agent data structure
type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  avatar: string;
};

// Sample agent data
const agents: Agent[] = [
  {
    id: 'rolodexterGPT',
    name: 'rolodexterGPT',
    role: 'Knowledge Navigator',
    description: 'Specialized in research, information retrieval, and knowledge synthesis across multiple domains. Designed for high-intelligence information work with comprehensive reasoning capabilities.',
    capabilities: [
      'Advanced research synthesis',
      'Multi-source knowledge integration',
      'Complex reasoning chains',
      'Academic writing assistance',
      'Strategy development'
    ],
    avatar: '/sample-images/agent-gpt.png'
  },
  {
    id: 'rolodexterVS',
    name: 'rolodexterVS',
    role: 'Development Agent',
    description: 'Manages source code, scripts, configuration files, and build automation for rolodexterlabs.com. Expert in web development with a focus on clean, accessible interfaces.',
    capabilities: [
      'Code management and optimization',
      'Web development expertise',
      'Build process automation',
      'Documentation generation',
      'API integration'
    ],
    avatar: '/sample-images/agent-vs.png'
  },
  {
    id: 'rolodexterEdu',
    name: 'rolodexterEdu',
    role: 'Education Specialist',
    description: 'Designed for educational contexts with a focus on explaining complex concepts, creating learning materials, and assisting with knowledge retention.',
    capabilities: [
      'Concept explanation and simplification',
      'Curriculum development',
      'Assessment creation',
      'Learning material generation',
      'Progress tracking tools'
    ],
    avatar: '/sample-images/agent-edu.png'
  },
  {
    id: 'rolodexterData',
    name: 'rolodexterData',
    role: 'Data Analysis Expert',
    description: 'Specialized in data processing, visualization, and statistical analysis. Helps extract insights from complex datasets and translate them into actionable intelligence.',
    capabilities: [
      'Statistical analysis',
      'Data visualization',
      'Trend identification',
      'Predictive modeling',
      'Report generation'
    ],
    avatar: '/sample-images/agent-data.png'
  }
];

export default function AgentsPage(): ReactElement {
  return (
    <>
      <Head>
        <title>Agents | rolodexterLABS</title>
        <meta name="description" content="Meet the specialized AI agents that power rolodexterLABS ecosystem" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Agent Ecosystem</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The rolodexterLABS ecosystem is powered by specialized AI agents, each designed for
            specific domains and capabilities. Meet the team of digital intelligence behind our platform.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                  {agent.avatar ? (
                    <Image
                      src={agent.avatar}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-2xl font-bold text-gray-300">
                      {agent.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{agent.name}</h2>
                  <p className="text-gray-600">{agent.role}</p>
                </div>
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
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Work with our agents</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our specialized agents work together to provide a comprehensive intelligence
            platform for your research, development, and knowledge management needs.
          </p>
          <Link href="/dashboard" className="px-6 py-3 bg-white border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-200">
            Access the Console
          </Link>
        </div>
      </div>
    </>
  );
}