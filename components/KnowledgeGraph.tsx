import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ContentItem } from '../lib/content';

type Node = {
  id: string;
  label: string;
  category: string;
  slug: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Edge = {
  source: string;
  target: string;
  strength: number;
};

type KnowledgeGraphProps = {
  knowledgeItems: ContentItem[];
  width?: number;
  height?: number;
  className?: string;
};

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  knowledgeItems,
  width = 800,
  height = 500,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [simulation, setSimulation] = useState<any>(null);
  const animationRef = useRef<number>();

  // Create nodes and edges from knowledge items
  useEffect(() => {
    if (!knowledgeItems || knowledgeItems.length === 0) return;

    // Create nodes from knowledge items
    const newNodes: Node[] = knowledgeItems.map((item) => ({
      id: item.meta.slug,
      label: item.meta.title,
      category: item.meta.category,
      slug: item.meta.slug,
      radius: Math.max(30, Math.min(50, (item.readTime || 1) * 3)), // Size based on reading time
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
    }));

    // Create edges based on dependencies or related content
    const newEdges: Edge[] = [];
    knowledgeItems.forEach((item) => {
      if (item.meta.dependencies) {
        item.meta.dependencies.forEach((dep: string) => {
          const targetNode = newNodes.find((n) => n.slug === dep || dep.includes(n.slug));
          if (targetNode) {
            newEdges.push({
              source: item.meta.slug,
              target: targetNode.id,
              strength: 0.5,
            });
          }
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [knowledgeItems, width, height]);

  // Simple force simulation
  useEffect(() => {
    if (!nodes.length) return;

    const tick = () => {
      // Apply forces
      nodes.forEach((node) => {
        // Center gravity
        node.vx += (width / 2 - node.x) * 0.005;
        node.vy += (height / 2 - node.y) * 0.005;

        // Node repulsion
        nodes.forEach((otherNode) => {
          if (node.id !== otherNode.id) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = node.radius + otherNode.radius + 20;
            
            if (distance < minDistance) {
              const force = (minDistance - distance) / distance * 0.1;
              node.vx += dx * force;
              node.vy += dy * force;
            }
          }
        });

        // Apply damping
        node.vx *= 0.9;
        node.vy *= 0.9;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Keep within bounds
        if (node.x < node.radius) node.x = node.radius;
        if (node.x > width - node.radius) node.x = width - node.radius;
        if (node.y < node.radius) node.y = node.radius;
        if (node.y > height - node.radius) node.y = height - node.radius;
      });

      // Apply edge forces
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const targetDistance = source.radius + target.radius + 50;
          
          if (distance !== 0) {
            const force = (distance - targetDistance) / distance * edge.strength;
            
            source.vx += dx * force;
            source.vy += dy * force;
            target.vx -= dx * force;
            target.vy -= dy * force;
          }
        }
      });

      setNodes([...nodes]);
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, edges, width, height]);

  // Get grayscale color based on category for black and white aesthetic
  const getCategoryColor = (category: string) => {
    const grayscale: Record<string, string> = {
      research: '#000000', // black
      product: '#222222', // dark gray
      service: '#444444', // medium dark gray
      ecosystem: '#666666', // medium gray
      intelligence: '#888888', // light gray
    };

    const mainCategory = category.split('/')[0];
    return grayscale[mainCategory] || '#AAAAAA'; // light gray default
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        {/* Edges */}
        {edges.map((edge) => {
          const source = nodes.find((n) => n.id === edge.source);
          const target = nodes.find((n) => n.id === edge.target);
          
          if (!source || !target) return null;
          
          return (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="#000000"
              strokeWidth={1}
              strokeOpacity={0.3}
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x},${node.y})`}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <Link href={`/knowledge/${node.slug.replace(/^\/knowledge\//, '').replace(/^knowledge\//, '').replace(/^\//, '')}`} className="cursor-pointer">
                <circle
                  r={node.radius}
                  fill={getCategoryColor(node.category)}
                  fillOpacity={0.9}
                  stroke={hoveredNode?.id === node.id ? '#000' : '#000'}
                  strokeWidth={hoveredNode?.id === node.id ? 2 : 0.5}
                  className="cursor-pointer transition-all duration-200"
                />
                <text
                  textAnchor="middle"
                  dy=".3em"
                  fontSize={12}
                  fill="#ffffff"
                  className="pointer-events-none"
                  style={{
                    textShadow: '0 1px 1px rgba(0,0,0,0.8)',
                    fontWeight: 'bold'
                  }}
                >
                  {node.label.length > node.radius / 4
                    ? `${node.label.substring(0, node.radius / 4)}...`
                    : node.label}
                </text>
            </Link>
          </g>
        ))}
      </svg>
      
      {/* Tooltip */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-white p-3 rounded border border-black shadow-lg z-10"
          style={{
            left: hoveredNode.x + 20,
            top: hoveredNode.y + 20,
            maxWidth: '300px',
          }}
        >
          <h4 className="font-bold">{hoveredNode.label}</h4>
          <p className="text-sm text-gray-600">
            Category: {hoveredNode.category}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
