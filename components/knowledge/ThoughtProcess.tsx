import React, { useState } from 'react';
import { format } from 'date-fns';

interface Thought {
  by: string;
  timestamp: string;
  note: string;
}

interface ThoughtProcessProps {
  thoughts: Thought[];
}

export const ThoughtProcess: React.FC<ThoughtProcessProps> = ({ thoughts }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!thoughts || thoughts.length === 0) return null;
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Agent Thought Process</h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-black border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      {expanded ? (
        <div className="space-y-4">
          {thoughts.map((thought, index) => (
            <div key={index} className="border-l-2 border-gray-300 pl-4 py-1">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{thought.by}</span>
                <span className="text-xs text-gray-500">
                  {format(new Date(thought.timestamp), 'MMM d, yyyy')}
                </span>
              </div>
              <p className="text-gray-700">{thought.note}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm">
          {thoughts.length} thought entries from {Array.from(new Set(thoughts.map(t => t.by))).join(', ')}
        </div>
      )}
    </div>
  );
};
