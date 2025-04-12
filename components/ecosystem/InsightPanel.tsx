import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/lib/agents';

interface InsightPanelProps {
  recentInsights: Activity[];
}

const InsightPanel: React.FC<InsightPanelProps> = ({ recentInsights }) => {
  // Sort insights by timestamp (newest first)
  const sortedInsights = [...recentInsights].sort((a, b) => b.timestamp - a.timestamp);
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-lab-gray-800">
        <h2 className="text-lg font-mono uppercase tracking-wider">Key Insights</h2>
        <p className="text-sm text-lab-gray-400">Critical findings and connections</p>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {sortedInsights.length === 0 ? (
          <div className="flex items-center justify-center h-full text-lab-gray-400 flex-col">
            <svg className="w-10 h-10 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p>No insights generated yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-lab-gray-800 rounded-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="text-2xl mr-3 mt-1" aria-hidden="true">
                      {insight.type === 'insight' ? '💡' : '🔗'}
                    </div>
                    <div>
                      <p className="text-lab-white mb-2 font-medium">
                        {insight.content}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-lab-gray-400 font-mono">
                          {new Date(insight.timestamp).toLocaleTimeString()}
                        </span>
                        {insight.category && (
                          <span className="bg-lab-gray-700 px-2 py-1 rounded text-lab-gray-300">
                            #{insight.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {insight.relatedIds && insight.relatedIds.length > 0 && (
                  <div className="bg-lab-gray-900 px-4 py-2 border-t border-lab-gray-700">
                    <p className="text-xs text-lab-gray-400 mb-1 font-mono">Related Items</p>
                    <div className="flex flex-wrap gap-2">
                      {insight.relatedIds.map(id => (
                        <span 
                          key={id} 
                          className="text-xs bg-lab-gray-800 px-2 py-1 rounded-sm border border-lab-gray-700"
                        >
                          {id.substring(id.indexOf('-') + 1, id.indexOf('-') + 7)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightPanel;