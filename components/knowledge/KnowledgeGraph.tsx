import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

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
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);

  // Colors based on theme
  const colors = {
    background: theme === 'light' ? '#ffffff' : '#121212',
    node: theme === 'light' ? '#000000' : '#ffffff',
    link: theme === 'light' ? '#cccccc' : '#333333',
    text: theme === 'light' ? '#333333' : '#ffffff',
    highlight: '#555555',
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

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Create links data from node connections
    const links = nodes.flatMap(node => 
      node.connections.map(targetId => ({
        source: node.id,
        target: targetId,
        value: 1
      }))
    ).filter(link => 
      // Ensure both source and target exist in nodes
      nodes.some(n => n.id === link.source) && 
      nodes.some(n => n.id === link.target)
    );

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('background', colors.background);

    // Create a group for the graph
    const g = svg.append('g');

    // Create zoom behavior
    if (interactive) {
      const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom as any);
    }

    // Create simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => (d.strength || 5) * 2 + 10));

    // Draw links
    const link = g.append('g')
      .attr('stroke', colors.link)
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value));

    // Draw nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d: any) => (d.strength || 5) + 5)
      .attr('fill', (d: any) => categoryColors[d.category] || colors.node)
      .attr('stroke', colors.background)
      .attr('stroke-width', 1.5)
      .style('cursor', interactive ? 'pointer' : 'default')
      .on('mouseover', (event, d: any) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .attr('stroke', colors.highlight)
          .attr('stroke-width', 2);
      })
      .on('mouseout', (event) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .attr('stroke', colors.background)
          .attr('stroke-width', 1.5);
      })
      .on('click', (event, d: any) => {
        if (interactive && onNodeClick) {
          onNodeClick(d);
        }
      });

    // Add titles for accessibility
    node.append('title')
      .text((d: any) => d.title);

    // Draw labels if showLabels is true
    if (showLabels) {
      const labels = g.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .text((d: any) => d.title)
        .style('font-size', '10px')
        .style('font-family', 'sans-serif')
        .style('fill', colors.text)
        .style('pointer-events', 'none')
        .style('opacity', 0.7);

      // Update label positions on tick
      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);

        labels
          .attr('x', (d: any) => d.x)
          .attr('y', (d: any) => d.y);
      });
    } else {
      // Just update node and link positions
      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);
      });
    }

    // If focusNodeId is provided, center the view on that node
    if (focusNodeId) {
      const focusNode = nodes.find(n => n.id === focusNodeId);
      if (focusNode && interactive) {
        // Highlight the focus node
        node.filter((d: any) => d.id === focusNodeId)
          .attr('stroke', '#ff0000')
          .attr('stroke-width', 3)
          .attr('r', (d: any) => (d.strength || 5) + 8);
        
        // Highlight direct connections
        const connectedIds = focusNode.connections;
        node.filter((d: any) => connectedIds.includes(d.id))
          .attr('stroke', '#ff0000')
          .attr('stroke-width', 2);
        
        link.filter((d: any) => 
          d.source.id === focusNodeId || d.target.id === focusNodeId
        )
          .attr('stroke', '#ff0000')
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 2);
      }
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, height, width, focusNodeId, theme, showLabels, interactive, colors, categoryColors, onNodeClick]);

  return (
    <div className="relative">
      <svg ref={svgRef} />
      
      {/* Tooltip for hovered node */}
      {hoveredNode && interactive && (
        <div 
          className="absolute bg-white shadow-lg rounded-md p-3 z-10 max-w-xs"
          style={{ 
            left: `${(hoveredNode as any).x + 20}px`, 
            top: `${(hoveredNode as any).y - 10}px` 
          }}
        >
          <h4 className="font-bold text-sm">{hoveredNode.title}</h4>
          <div className="text-xs text-gray-600 mt-1">
            <span className="uppercase">{hoveredNode.category}</span>
            {hoveredNode.tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {hoveredNode.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {hoveredNode.tags.length > 3 && (
                  <span className="text-gray-500">+{hoveredNode.tags.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
