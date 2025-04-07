import React from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'pending' | 'archived';
  owner?: string;
  last_updated?: string;
  related_tasks?: string[];
  tags?: string[];
  content?: string;
  path?: string;
}

const ProjectStatus: React.FC<{ projects: Project[] }> = ({ projects }) => {
  // Filter to active projects and sort by most recently updated
  const activeProjects = projects
    .filter(project => project.status === 'active')
    .sort((a, b) => {
      if (!a.last_updated || !b.last_updated) return 0;
      return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
    });

  return (
    <section className="my-12">
      <div className="border-b border-gray-200 pb-2 mb-6">
        <h2 className="text-2xl font-serif font-normal">Current Projects</h2>
        <p className="text-sm text-gray-600 mt-1 font-mono">
          Strategic initiatives and development streams
        </p>
      </div>
      
      <div className="space-y-6">
        {activeProjects.map(project => (
          <div key={project.id} className="group">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{project.title}</h3>
              <div className="text-xs font-mono bg-black text-white px-2 py-0.5">
                {project.status}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <span className="font-mono">{project.id}</span>
              {project.owner && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="font-mono">{project.owner}</span>
                </>
              )}
            </div>
            
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-block text-xs bg-gray-100 px-1.5 py-0.5 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {project.related_tasks && project.related_tasks.length > 0 && (
              <div className="mt-3 pl-3 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-medium mb-1">Related Tasks:</div>
                <ul className="space-y-0.5">
                  {project.related_tasks.map(taskId => (
                    <li key={taskId} className="text-xs font-mono">
                      <Link 
                        href={`/system/tasks/${taskId}`}
                        className="hover:underline"
                      >
                        {taskId}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <Link 
          href="/system/projects" 
          className="text-sm font-medium hover:underline"
        >
          View all projects →
        </Link>
      </div>
    </section>
  );
};

export default ProjectStatus;
