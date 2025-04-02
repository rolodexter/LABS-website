import React from 'react';

interface AgentAttributionProps {
  label: string;
  agents: string[];
}

export const AgentAttribution: React.FC<AgentAttributionProps> = ({ label, agents }) => {
  if (!agents || agents.length === 0) return null;
  
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 mb-1">{label}</span>
      <div className="flex gap-2">
        {agents.map((agent) => (
          <span 
            key={agent} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
          >
            {agent}
          </span>
        ))}
      </div>
    </div>
  );
};
