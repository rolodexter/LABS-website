import React from 'react';

interface SystemSnapshotProps {
  syncPromptContent: string;
}

const SystemSnapshot: React.FC<SystemSnapshotProps> = ({ syncPromptContent }) => {
  // Parse the sync prompt content to extract key sections
  const parseSystemSnapshot = (content: string) => {
    // Remove frontmatter if present
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim();
    
    // Split content by headings
    const sections = contentWithoutFrontmatter.split(/(?=^# )/m);
    
    return {
      full: contentWithoutFrontmatter,
      title: sections[0]?.match(/^# (.*)/m)?.[1] || 'System Snapshot',
      sections: sections.slice(1).map(section => {
        const titleMatch = section.match(/^# (.*)/m);
        return {
          title: titleMatch?.[1] || 'Untitled Section',
          content: section.replace(/^# .*\n/, '')
        };
      })
    };
  };
  
  const snapshot = parseSystemSnapshot(syncPromptContent);

  return (
    <section className="my-12">
      <div className="border-b border-gray-200 pb-2 mb-6">
        <h2 className="text-2xl font-serif font-normal">System Status</h2>
        <p className="text-sm text-gray-600 mt-1 font-mono">
          Current operational state of rolodexterLABS
        </p>
      </div>
      
      <div className="prose prose-sm max-w-none">
        {snapshot.sections.length > 0 ? (
          <div className="space-y-6">
            {snapshot.sections.map((section, index) => (
              <div key={index} className="pb-4">
                <h3 className="text-lg font-medium mb-2">{section.title}</h3>
                <div className="text-sm whitespace-pre-wrap font-mono bg-gray-50 p-3 border border-gray-200">
                  {section.content.trim()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 border border-gray-200">
            {snapshot.full}
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemSnapshot;
