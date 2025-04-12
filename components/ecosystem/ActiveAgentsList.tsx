import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/lib/agents';

interface ActiveAgentsListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  selectedAgentId?: string;
}

const ActiveAgentsList: React.FC<ActiveAgentsListProps> = ({ 
  agents, 
  onSelectAgent,
  selectedAgentId
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-lab-gray-800">
        <h2 className="text-lg font-mono uppercase tracking-wider">Active Agents</h2>
        <p className="text-sm text-lab-gray-400">{agents.length} agents online</p>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {agents.map(agent => (
          <motion.div 
            key={agent.id}
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            className={`p-4 border-b border-lab-gray-800 cursor-pointer ${
              selectedAgentId === agent.id ? 'bg-lab-gray-800' : ''
            }`}
            onClick={() => onSelectAgent(agent)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full bg-lab-gray-700 flex items-center justify-center text-xl font-bold text-white"
                >
                  {agent.name.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0">
                  <span 
                    className={`block h-3 w-3 rounded-full ${
                      agent.status === 'active' ? 'bg-green-500' : 
                      agent.status === 'thinking' ? 'bg-yellow-500' : 'bg-lab-gray-500'
                    }`} 
                  />
                </span>
              </div>
              
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-xs text-lab-gray-400">{agent.role}</p>
              </div>
            </div>
            
            {agent.currentTask && (
              <div className="mt-2 text-xs text-lab-gray-400 pl-13">
                <span className="font-mono">Working on:</span> {agent.currentTask}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAgentsList;