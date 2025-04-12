import React from 'react';
import { Agent, Activity } from '@/lib/agents';
import { motion } from 'framer-motion';

interface AgentWorkspaceProps {
  agent: Agent | null;
  recentActivity: Activity[];
}

const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({ agent, recentActivity }) => {
  if (!agent) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-lab-gray-400 p-6">
        <div className="w-16 h-16 rounded-full bg-lab-gray-800 flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Select an Agent</h3>
        <p className="text-center text-sm">
          Choose an agent from the list to view their workspace and activities
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-lab-gray-800">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-lab-gray-700 flex items-center justify-center text-xl font-bold text-white mr-4">
            {agent.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold">{agent.name}</h2>
            <div className="flex items-center text-sm">
              <span className="text-lab-gray-400">{agent.role}</span>
              <span 
                className={`ml-3 inline-block h-2 w-2 rounded-full ${
                  agent.status === 'active' ? 'bg-green-500' : 
                  agent.status === 'thinking' ? 'bg-yellow-500' : 'bg-lab-gray-500'
                }`}
              />
              <span className="ml-1 text-xs text-lab-gray-400">
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-lab-gray-800 p-3 rounded-md border border-lab-gray-700">
          <h3 className="text-xs uppercase tracking-wider text-lab-gray-400 mb-1">Specialty</h3>
          <p className="text-sm">{agent.specialty}</p>
          
          {agent.currentTask && (
            <>
              <h3 className="text-xs uppercase tracking-wider text-lab-gray-400 mt-3 mb-1">Current Task</h3>
              <p className="text-sm font-medium">{agent.currentTask}</p>
            </>
          )}
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-sm uppercase tracking-wider text-lab-gray-400 mb-3 font-mono">Activity Log</h3>
        
        {recentActivity.length === 0 ? (
          <div className="text-center text-lab-gray-400 py-8">
            No recent activity to display
          </div>
        ) : (
          <div className="relative pl-6 border-l border-lab-gray-700">
            {recentActivity.map((activity, index) => (
              <motion.div 
                key={activity.id} 
                className="mb-6 relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <span className="absolute -left-[25px] w-4 h-4 rounded-full bg-lab-gray-800 border-2 border-lab-gray-700" />
                <span className="text-xs text-lab-gray-400 mb-1 block font-mono">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
                <div className="bg-lab-gray-800 p-3 rounded-md">
                  <div className="font-medium mb-1">{activity.content}</div>
                  <div className="flex items-center text-xs">
                    <span className="capitalize px-2 py-1 rounded bg-lab-gray-700 text-lab-gray-300">
                      {activity.type}
                    </span>
                    {activity.category && (
                      <span className="ml-2 px-2 py-1 rounded bg-lab-gray-700 text-lab-gray-300">
                        #{activity.category}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentWorkspace;