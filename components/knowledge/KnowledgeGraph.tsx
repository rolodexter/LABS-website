import React, { useState } from 'react';
// NOTE: To fully restore functionality, install d3 with: npm install d3 @types/d3

interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  slug: string;
  tags: string[];
  connections: string[]; // IDs of connected nodes
  strength?: number; // 1-10, determines node size
}

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
  height?: number;
  width?: number;
  focusNodeId?: string; // Optional ID to focus the graph on
  onNodeClick?: (node: KnowledgeNode) => void;
  theme?: 'light' | 'dark';
  showLabels?: boolean;
  interactive?: boolean;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  nodes,
  height = 600,
  width = 800,
  focusNodeId,
  onNodeClick,
  theme = 'light',
  showLabels = true,
  interactive = true,
}) => {
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);

  // Colors based on theme
  const colors = {
    background: theme === 'light' ? '#ffffff' : '#121212',
    node: theme === 'light' ? '#000000' : '#ffffff',
    link: theme === 'light' ? '#cccccc' : '#333333',
    text: theme === 'light' ? '#333333' : '#ffffff',
    highlight: '#ff0000',
  };

  // Category colors
  const categoryColors: Record<string, string> = {
    research: '#1a1a1a',
    product: '#333333',
    service: '#4d4d4d',
    documentation: '#666666',
    tutorial: '#808080',
    // Add more categories as needed
  };

  // Get node size based on strength
  const getNodeSize = (node: KnowledgeNode): number => {
    return (node.strength || 5) * 2 + 10;
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    return categoryColors[category] || colors.node;
  };
  
  // Calculate positions in a circular layout
  const calculateNodePositions = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    return nodes.map((node, index) => {
      const angle = (index / Math.max(nodes.length, 1)) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { node, x, y };
    });
  };
  
  const nodePositions = calculateNodePositions();

  // Render tooltip for hovered node
  const renderTooltip = () => {
    if (!hoveredNode) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px',
          backgroundColor: colors.background,
          border: `1px solid ${colors.node}`,
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxWidth: '250px',
          color: colors.text,
        }}
      >
        <h3 style={{ margin: '0 0 5px', fontSize: '14px', fontWeight: 'bold' }}>
          {hoveredNode.title}
        </h3>
        <p style={{ margin: '0 0 3px', fontSize: '12px' }}>
          Category: {hoveredNode.category}
        </p>
        {hoveredNode.tags && hoveredNode.tags.length > 0 && (
          <p style={{ margin: '0', fontSize: '12px' }}>
            Tags: {hoveredNode.tags.join(', ')}
          </p>
        )}
        {hoveredNode.connections && (
          <p style={{ margin: '3px 0 0', fontSize: '12px' }}>
            Connections: {hoveredNode.connections.length}
          </p>
        )}
      </div>
    );
  };

  // Draw the knowledge graph using SVG
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        backgroundColor: colors.background,
        overflow: 'hidden',
        borderRadius: '4px',
      }}
    >
      {/* Temporary message about d3 */}
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        padding: '5px 10px',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: '4px',
        fontSize: '12px',
        color: colors.text,
        zIndex: 5
      }}>
        <p style={{ margin: 0 }}>Simplified Knowledge Graph (d3 required for full functionality)</p>
      </div>

      {/* SVG for the knowledge graph */}
      <svg
        width={width}
        height={height}
        style={{ display: 'block' }}
      >
        {/* Draw connections between nodes */}
        {nodes.flatMap(sourceNode => 
          (sourceNode.connections || []).map(targetId => {
            const targetNode = nodes.find(n => n.id === targetId);
            if (!targetNode) return null;
            
            const sourcePos = nodePositions.find(p => p.node.id === sourceNode.id);
            const targetPos = nodePositions.find(p => p.node.id === targetId);
            
            if (!sourcePos || !targetPos) return null;
            
            return (
              <line
                key={`${sourceNode.id}-${targetId}`}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={colors.link}
                strokeWidth={1}
                strokeOpacity={0.6}
              />
            );
          })
        ).filter(Boolean)}
        
        {/* Draw nodes */}
        {nodePositions.map(({ node, x, y }) => {
          const isFocused = node.id === focusNodeId;
          const nodeSize = getNodeSize(node);
          
          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={y}
                r={nodeSize}
                fill={getCategoryColor(node.category)}
                stroke={isFocused ? colors.highlight : colors.background}
                strokeWidth={isFocused ? 3 : 1.5}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onMouseOver={() => setHoveredNode(node)}
                onMouseOut={() => setHoveredNode(null)}
                onClick={() => interactive && onNodeClick && onNodeClick(node)}
              />
              
              {showLabels && (
                <text
                  x={x + nodeSize + 5}
                  y={y + 5}
                  fontSize="10px"
                  fill={colors.text}
                  style={{ pointerEvents: 'none' }}
                >
                  {node.title.length > 20 ? `${node.title.substring(0, 17)}...` : node.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Render tooltip for hovered node */}
      {renderTooltip()}
    </div>
  );
};

export default KnowledgeGraph;
