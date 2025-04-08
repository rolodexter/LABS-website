import React from 'react';

interface MemoryPlaybackProps {
  memoryTraces?: Array<{
    id: string;
    type: 'prompt' | 'knowledge' | 'action';
    content: string;
    timestamp: Date;
    agents: string[];
    tags?: string[];
  }>;
  showTimeline?: boolean;
  filtering?: boolean;
}

/**
 * Memory Playback component (placeholder for Phase 2.5)
 * Will display a memory trace timeline for prompt and knowledge tracking
 */
const MemoryPlayback: React.FC<MemoryPlaybackProps> = ({ 
  memoryTraces = [], 
  showTimeline = true,
  filtering = true
}) => {
  return (
    <div className="relative w-full h-[300px] bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
        Memory Playback Log (Coming in Phase 2.5)
      </div>
    </div>
  );
};

export default MemoryPlayback;