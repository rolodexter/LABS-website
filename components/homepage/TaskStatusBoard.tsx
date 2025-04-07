import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'pending' | 'archived';
  owner?: string;
  created_at?: string;
  tags?: string[];
  content?: string;
  path?: string;
}

const TaskStatusBoard: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  // Filter to active tasks and sort by most recently created
  const activeTasks = tasks
    .filter(task => task.status === 'active')
    .sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <section className="my-12">
      <div className="border-b border-gray-200 pb-2 mb-6">
        <h2 className="text-2xl font-serif font-normal">Active Tasks</h2>
        <p className="text-sm text-gray-600 mt-1 font-mono">
          {activeTasks.length} active task{activeTasks.length !== 1 ? 's' : ''} in the system
        </p>
      </div>
      
      <div className="space-y-4">
        {activeTasks.map(task => (
          <div key={task.id} className="border-l-2 border-gray-300 pl-4 py-1 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{task.title}</h3>
              {task.created_at && (
                <span className="text-xs font-mono text-gray-500">
                  {format(new Date(task.created_at), 'yyyy-MM-dd')}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <span className="font-mono">{task.id}</span>
              {task.owner && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="font-mono">{task.owner}</span>
                </>
              )}
            </div>
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {task.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-block text-xs bg-gray-100 px-1.5 py-0.5 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <Link 
          href="/system/tasks" 
          className="text-sm font-medium hover:underline"
        >
          View all tasks →
        </Link>
      </div>
    </section>
  );
};

export default TaskStatusBoard;
