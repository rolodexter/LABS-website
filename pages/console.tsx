import type { ReactElement } from 'react';
import Head from 'next/head';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types/next';

const ConsolePage: NextPageWithLayout = () => {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output', content: string }[]>([
    { type: 'output', content: 'Welcome to rolodexterLABS Console.\nType "help" to see available commands.' }
  ]);

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace('/');
    }
  }, [ready, authenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const processCommand = (command: string) => {
    // Add user input to history
    setHistory(prev => [...prev, { type: 'input', content: command }]);

    // Process command
    let response = '';

    const normalizedCommand = command.trim().toLowerCase();

    if (normalizedCommand === 'help') {
      response = `
Available commands:

<ul class="list-disc pl-5 space-y-1">
  <li>help: Display this help message</li>
  <li>whoami: Display your user information</li>
  <li>clear: Clear the console</li>
  <li>agents: List available agents</li>
  <li>projects: List available projects</li>
  <li>knowledge: Access knowledge modules</li>
  <li>exit: Return to dashboard</li>
</ul>
      `;
    } else if (normalizedCommand === 'whoami') {
      response = `
User: ${user?.email?.address || 'Anonymous'}
ID: ${user?.id?.substring(0, 8) || 'Unknown'}
Linked accounts: ${user?.linkedAccounts?.length || 0}
      `;
    } else if (normalizedCommand === 'clear') {
      setHistory([{ type: 'output', content: 'Console cleared.' }]);
      return;
    } else if (normalizedCommand === 'agents') {
      response = `
Available agents:
- rolodexterGPT: Knowledge Navigator
- rolodexterVS: Development Agent
- rolodexterEdu: Education Specialist
- rolodexterData: Data Analysis Expert

Use "agent [name]" to interact with a specific agent.
      `;
    } else if (normalizedCommand === 'projects') {
      response = `
Available projects:
- Knowledge Graph: Interactive concept mapping
- Research Assistant: AI-powered research tool
- Document Analyzer: Extract insights from documents
- Knowledge Compiler: Transform notes into structured knowledge

Use "project [name]" to access a specific project.
      `;
    } else if (normalizedCommand === 'knowledge') {
      response = `
Knowledge base access:
To access the knowledge database, use the following commands:
- knowledge search [query]: Search knowledge modules
- knowledge latest: Show latest knowledge modules
- knowledge related [topic]: Show related knowledge

Use the web interface at /docs for a more user-friendly experience.
      `;
    } else if (normalizedCommand === 'exit') {
      router.push('/dashboard');
      return;
    } else if (normalizedCommand.startsWith('agent ')) {
      const agentName = command.substring(6).trim();
      response = `Agent interface for "${agentName}" is coming soon. Check back later for updates.`;
    } else if (normalizedCommand.startsWith('project ')) {
      const projectName = command.substring(8).trim();
      response = `Project "${projectName}" interface is coming soon. Check back later for updates.`;
    } else {
      response = `Command not recognized: ${command}\nType "help" to see available commands.`;
    }

    // Add response to history
    setHistory(prev => [...prev, { type: 'output', content: response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      processCommand(inputValue);
      setInputValue('');
    }
  };

  if (!ready || !authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Console | rolodexterLABS</title>
        <meta name="description" content="Interactive console for rolodexterLABS ecosystem" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
          <h1 className="text-2xl font-bold mb-2">rolodexterLABS Console</h1>
          <p className="text-gray-600">
            A command-line interface to interact with the rolodexterLABS ecosystem.
            Type "help" to see available commands.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 font-mono text-sm h-[60vh] overflow-y-auto">
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'input' ? (
                <div>
                  <span className="text-gray-500">{'> '}</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-gray-800">{item.content}</div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2">
          <span className="text-gray-500 mr-2">{'>'}</span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none font-mono text-sm"
            placeholder="Type a command..."
            aria-label="Console input"
          />
        </div>
      </div>
    </>
  );
};

// Add custom layout function to prevent duplicate footer
ConsolePage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default ConsolePage;