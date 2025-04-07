import Head from 'next/head';
import type { NextPage, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';

// Import homepage components
import SystemDialogues from '../components/homepage/SystemDialogues';
import TaskStatusBoard from '../components/homepage/TaskStatusBoard';
import ProjectStatus from '../components/homepage/ProjectStatus';

// Import markdown utilities
import { getHomepageData } from '../lib/markdown';

interface HomePageProps {
  tasks: any[];
  projects: any[];
  prompts: any[];
}



const Home: NextPage<HomePageProps> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = ({ tasks, projects, prompts }) => {
  const { ready, authenticated, login } = usePrivy();

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Head>
        <title>rolodexterLABS | Frontier AI for Executive Intelligence</title>
        <meta name="description" content="Advanced AI systems for research, knowledge management, and executive intelligence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <main className="overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-4xl font-serif font-normal mb-3">rolodexterLABS</h1>
            <p className="text-lg font-mono text-gray-700 mb-0">
              Executive intelligence systems for knowledge manufacturing and scientific discovery
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* System Dialogues Section - Agent Collaboration */}
          <SystemDialogues prompts={prompts} />
          
          {/* Tasks & Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <TaskStatusBoard tasks={tasks} />
            <ProjectStatus projects={projects} />
          </div>
          
          </div>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export const getStaticProps: GetStaticProps = async () => {
  const { tasks, projects, prompts, syncPrompt } = getHomepageData();
  
  return {
    props: {
      tasks,
      projects,
      prompts,
    },
    // Revalidate every minute to keep content fresh
    revalidate: 60,
  };
};

export default Home;
