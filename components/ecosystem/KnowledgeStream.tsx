import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Agent } from '@/lib/agents';

interface KnowledgeStreamProps {
  recentActivity: Activity[];
  selectedAgent?: Agent | null;
}

const KnowledgeStream: React.FC<KnowledgeStreamProps> = ({ 
  recentActivity,
  selectedAgent
}) => {
  // Filter activities if an agent is selected
  const activities = selectedAgent 
    ? recentActivity.filter(activity => activity.agentId === selectedAgent.id) 
    : recentActivity;

  // Get activity type icon
  const getActivityIcon = (type: Activity['type']) => {
    switch(type) {
      case 'research': return '🔍';
      case 'analysis': return '📊';
      case 'connection': return '🔗';
      case 'insight': return '💡';
      case 'question': return '❓';
      default: return '📝';
    }
  };

  // Get activity type color class
  const getActivityColor = (type: Activity['type']) => {
    switch(type) {
      case 'research': return 'border-blue-500 bg-blue-900 bg-opacity-20';
      case 'analysis': return 'border-yellow-500 bg-yellow-900 bg-opacity-20';
      case 'connection': return 'border-green-500 bg-green-900 bg-opacity-20';
      case 'insight': return 'border-pink-500 bg-pink-900 bg-opacity-20';
      case 'question': return 'border-purple-500 bg-purple-900 bg-opacity-20';
      default: return 'border-gray-500 bg-gray-800 bg-opacity-20';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-lab-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-mono uppercase tracking-wider">Knowledge Stream</h2>
          <p className="text-sm text-lab-gray-400">
            {selectedAgent 
              ? `Activities from ${selectedAgent.name}` 
              : 'Real-time agent activities'
            }
          </p>
        </div>
        {selectedAgent && (
          <span className="text-xs text-lab-gray-400 font-mono">
            {selectedAgent.specialty}
          </span>
        )}
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {activities.length === 0 ? (
          <div className="flex items-center justify-center h-full text-lab-gray-400">
            No activities to display
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`p-4 border-l-4 rounded-r-md ${getActivityColor(activity.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl" aria-hidden="true">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="text-lab-white font-medium mb-1">
                      {activity.content}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-lab-gray-400 font-mono">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                      {activity.category && (
                        <span className="bg-lab-gray-800 px-2 py-1 rounded">
                          {activity.category}
                        </span>
                      )}
                    </div>
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

export default KnowledgeStream;