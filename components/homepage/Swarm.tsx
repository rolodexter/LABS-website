import React from 'react';

interface SwarmProps {
  agents?: string[];
  density?: number;
  speed?: number;
  interactive?: boolean;
}

/**
 * Swarm visualization component (placeholder for Phase 2)
 * Will display an animated swarm simulation to supplement the chat experience
 */
const Swarm: React.FC<SwarmProps> = ({ 
  agents = [], 
  density = 5, 
  speed = 1, 
  interactive = true 
}) => {
  return (
    <div className="relative w-full h-[300px] bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
        Swarm Visualization (Coming in Phase 2)
      </div>
    </div>
  );
};

export default Swarm;