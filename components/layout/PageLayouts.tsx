import React, { ReactNode } from 'react';
import MainLayout from './MainLayout';
import KnowledgeGraph from '../knowledge/KnowledgeGraph';

// Base interface for all layout props
interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

// Standard layout - just the main content
export const StandardLayout: React.FC<BaseLayoutProps> = ({
  children,
  title,
  description,
  className = '',
}) => {
  return (
    <MainLayout title={title} description={description}>
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        {children}
      </div>
    </MainLayout>
  );
};

// Interface for layouts with sidebar
interface SidebarLayoutProps extends BaseLayoutProps {
  sidebar: ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: 'narrow' | 'medium' | 'wide';
}

// Layout with sidebar
export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  sidebar,
  sidebarPosition = 'right',
  sidebarWidth = 'medium',
  title,
  description,
  className = '',
}) => {
  // Determine sidebar width class
  const sidebarWidthClass = {
    narrow: 'w-full md:w-1/4',
    medium: 'w-full md:w-1/3',
    wide: 'w-full md:w-2/5',
  }[sidebarWidth];

  // Determine main content width class
  const mainWidthClass = {
    narrow: 'w-full md:w-3/4',
    medium: 'w-full md:w-2/3',
    wide: 'w-full md:w-3/5',
  }[sidebarWidth];

  return (
    <MainLayout title={title} description={description}>
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {sidebarPosition === 'left' && (
            <aside className={`${sidebarWidthClass}`}>
              {sidebar}
            </aside>
          )}
          
          <main className={`${mainWidthClass}`}>
            {children}
          </main>
          
          {sidebarPosition === 'right' && (
            <aside className={`${sidebarWidthClass}`}>
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Interface for layouts with knowledge graph
interface KnowledgeGraphLayoutProps extends BaseLayoutProps {
  nodes: any[]; // Knowledge graph nodes
  focusNodeId?: string;
  graphPosition?: 'top' | 'bottom' | 'left' | 'right';
  graphHeight?: number;
  graphWidth?: number;
  graphTheme?: 'light' | 'dark';
  onNodeClick?: (node: any) => void;
}

// Layout with knowledge graph
export const KnowledgeGraphLayout: React.FC<KnowledgeGraphLayoutProps> = ({
  children,
  nodes,
  focusNodeId,
  graphPosition = 'right',
  graphHeight = 600,
  graphWidth = 500,
  graphTheme = 'light',
  onNodeClick,
  title,
  description,
  className = '',
}) => {
  const graphComponent = (
    <KnowledgeGraph
      nodes={nodes}
      height={graphHeight}
      width={graphWidth}
      focusNodeId={focusNodeId}
      onNodeClick={onNodeClick}
      theme={graphTheme}
      showLabels={true}
      interactive={true}
    />
  );

  // For top/bottom positions
  if (graphPosition === 'top' || graphPosition === 'bottom') {
    return (
      <MainLayout title={title} description={description}>
        <div className={`container mx-auto px-4 py-8 ${className}`}>
          <div className="flex flex-col gap-8">
            {graphPosition === 'top' && (
              <div className="w-full">
                {graphComponent}
              </div>
            )}
            
            <main className="w-full">
              {children}
            </main>
            
            {graphPosition === 'bottom' && (
              <div className="w-full">
                {graphComponent}
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  // For left/right positions (default to SidebarLayout)
  return (
    <SidebarLayout
      title={title}
      description={description}
      className={className}
      sidebar={graphComponent}
      sidebarPosition={graphPosition}
      sidebarWidth="medium"
    >
      {children}
    </SidebarLayout>
  );
};

// Magazine layout for front page
interface MagazineLayoutProps extends BaseLayoutProps {
  header?: ReactNode;
  featuredContent?: ReactNode;
  primarySection?: ReactNode;
  secondarySections?: ReactNode[];
  fullWidthSections?: ReactNode[];
}

export const MagazineLayout: React.FC<MagazineLayoutProps> = ({
  children,
  header,
  featuredContent,
  primarySection,
  secondarySections = [],
  fullWidthSections = [],
  title,
  description,
  className = '',
}) => {
  return (
    <MainLayout title={title} description={description}>
      {/* Header Section (e.g., daily focus) */}
      {header && (
        <div className="w-full">
          {header}
        </div>
      )}
      
      {/* Featured Content Section */}
      {featuredContent && (
        <section className="border-b border-gray-200 py-8">
          <div className="container mx-auto px-4">
            {featuredContent}
          </div>
        </section>
      )}
      
      {/* Main Content Area */}
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Primary Section (2/3 width on large screens) */}
          {primarySection && (
            <div className="w-full lg:w-2/3">
              {primarySection}
            </div>
          )}
          
          {/* Secondary Sections (1/3 width on large screens) */}
          {secondarySections.length > 0 && (
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              {secondarySections.map((section, index) => (
                <div key={index}>{section}</div>
              ))}
            </div>
          )}
        </div>
        
        {/* Full Width Sections */}
        {fullWidthSections.length > 0 && (
          <div className="mt-12 flex flex-col gap-12">
            {fullWidthSections.map((section, index) => (
              <section key={index} className="border-t border-gray-200 pt-8">
                {section}
              </section>
            ))}
          </div>
        )}
        
        {/* Additional Content */}
        {children}
      </div>
    </MainLayout>
  );
};

// Grid layout for knowledge/article listings
interface GridLayoutProps extends BaseLayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
  filters?: ReactNode;
  showFilters?: boolean;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  header,
  sidebar,
  sidebarPosition = 'left',
  filters,
  showFilters = true,
  title,
  description,
  className = '',
}) => {
  return (
    <MainLayout title={title} description={description}>
      {/* Header Section */}
      {header && (
        <div className="w-full">
          {header}
        </div>
      )}
      
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        {/* Filters Section */}
        {showFilters && filters && (
          <div className="mb-8 p-4 border border-gray-200">
            {filters}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Left Position */}
          {sidebar && sidebarPosition === 'left' && (
            <aside className="w-full md:w-1/4">
              {sidebar}
            </aside>
          )}
          
          {/* Main Content */}
          <main className={`w-full ${sidebar ? 'md:w-3/4' : ''}`}>
            {children}
          </main>
          
          {/* Sidebar - Right Position */}
          {sidebar && sidebarPosition === 'right' && (
            <aside className="w-full md:w-1/4">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
