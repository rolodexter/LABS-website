import React from 'react';

interface AgentMapProps {
  agents?: Array<{
    id: string;
    name: string;
    role: string;
    connections?: string[];
    active?: boolean;
  }>;
  layout?: 'circle' | 'network' | 'hierarchy';
  showLabels?: boolean;
}

/**
 * Agent Map visualization component (placeholder for Phase 2)
 * Will display relationships and connections between system agents
 */
const AgentMap: React.FC<AgentMapProps> = ({ 
  agents = [], 
  layout = 'network',
  showLabels = true
}) => {
  return (
    <div className="relative w-full h-[300px] bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
        Agent Relationship Map (Coming in Phase 2)
      </div>
    </div>
  );
};

export default AgentMap;