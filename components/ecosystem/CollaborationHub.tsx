import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Agent } from '@/lib/agents';

interface CollaborationHubProps {
  activities: Activity[];
  agents: Agent[];
}

// Simple node type for the visualization
interface Node {
  id: string;
  label: string;
  type: 'agent' | 'activity';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

// Simple link type for the visualization
interface Link {
  source: string;
  target: string;
  strength: number;
  color: string;
  dashed?: boolean;
}

const CollaborationHub: React.FC<CollaborationHubProps> = ({ activities, agents }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  // Setup canvas dimensions
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Convert activities and agents to graph data
  useEffect(() => {
    // Create nodes
    const newNodes: Node[] = [
      // Agent nodes
      ...agents.map(agent => ({
        id: agent.id,
        label: agent.name,
        type: 'agent' as const,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: 0,
        vy: 0,
        radius: 15,
        color: '#ffffff',
      })),

      // Activity nodes
      ...activities.slice(0, 50).map(activity => ({
        id: activity.id,
        label:
          activity.content.length > 30 ? activity.content.slice(0, 30) + '...' : activity.content,
        type: 'activity' as const,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: 0,
        vy: 0,
        radius: 10,
        color: '#f0f0f0',
      })),
    ];

    setNodes(newNodes);
  }, [agents, activities, dimensions]);

  // Draw the visualization
  useEffect(() => {
    if (!canvasRef.current || !nodes.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution
    canvas.width = dimensions.width * window.devicePixelRatio;
    canvas.height = dimensions.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Apply forces and update positions
      applyForces();

      // Draw links
      ctx.lineWidth = 1;
      links.forEach(link => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);

        if (!source || !target) return;

        ctx.strokeStyle = link.color;

        if (link.dashed) {
          ctx.setLineDash([4, 2]);
        } else {
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw border for agent nodes
        if (node.type === 'agent') {
          ctx.strokeStyle = 'rgba(255,255,255,0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw node label for hovered node or agent nodes
        if (node === hoveredNode || node.type === 'agent') {
          ctx.fillStyle = '#ffffff';
          ctx.font = `${node.type === 'agent' ? 'bold ' : ''}12px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            node.type === 'agent'
              ? node.label
              : node.label.substring(0, 20) + (node.label.length > 20 ? '...' : ''),
            node.x,
            node.y + node.radius + 12
          );
        }
      });

      // Continue animation
      const frameId = requestAnimationFrame(animate);
      setAnimationFrameId(frameId);
    };

    // Force simulation
    const applyForces = () => {
      // Apply forces to each node
      nodes.forEach(node => {
        // Center gravity
        node.vx += (dimensions.width / 2 - node.x) * 0.0005;
        node.vy += (dimensions.height / 2 - node.y) * 0.0005;

        // Node repulsion
        nodes.forEach(otherNode => {
          if (node.id !== otherNode.id) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = node.radius + otherNode.radius + 20;

            if (distance < minDistance) {
              const force = ((minDistance - distance) / distance) * 0.05;
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
        if (node.x > dimensions.width - node.radius) node.x = dimensions.width - node.radius;
        if (node.y < node.radius) node.y = node.radius;
        if (node.y > dimensions.height - node.radius) node.y = dimensions.height - node.radius;
      });

      // Apply link forces
      links.forEach(link => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);

        if (!source || !target) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const targetDistance = source.radius + target.radius + 50;

        if (distance !== 0) {
          const force = ((distance - targetDistance) / distance) * link.strength;

          source.vx += dx * force;
          source.vy += dy * force;
          target.vx -= dx * force;
          target.vy -= dy * force;
        }
      });
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [nodes, links, dimensions]);

  // Handle mouse interaction
  useEffect(() => {
    if (!canvasRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Find hovered node
      const hovered = nodes.find(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < node.radius + 5;
      });

      setHoveredNode(hovered || null);
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [nodes]);

  // Helper function for activity colors
  function getActivityColor(type: string, opacity = 1) {
    switch (type) {
      case 'research':
        return `rgba(64, 151, 242, ${opacity})`;
      case 'analysis':
        return `rgba(242, 174, 64, ${opacity})`;
      case 'connection':
        return `rgba(106, 212, 134, ${opacity})`;
      case 'insight':
        return `rgba(242, 64, 122, ${opacity})`;
      case 'question':
        return `rgba(165, 94, 234, ${opacity})`;
      default:
        return `rgba(200, 200, 200, ${opacity})`;
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-lab-gray-800">
        <h2 className="text-lg font-mono uppercase tracking-wider">Collaboration Hub</h2>
        <p className="text-sm text-lab-gray-400">Real-time agent activity visualization</p>
      </div>

      <div ref={containerRef} className="relative flex-grow overflow-hidden bg-lab-gray-900">
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-lab-black bg-opacity-70 p-3 rounded-md">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-white mr-2"></span>
              <span>Agent</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Research</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
              <span>Analysis</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              <span>Connection</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
              <span>Insight</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
              <span>Question</span>
            </div>
          </div>
        </div>

        {/* Tooltip for hovered node */}
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-lab-black border border-lab-gray-700 p-3 rounded-md shadow-lg z-10 max-w-xs"
            style={{
              left: hoveredNode.x + 10,
              top: hoveredNode.y + 10,
              pointerEvents: 'none',
            }}
          >
            <div className="flex items-center mb-1">
              {hoveredNode.type === 'activity' && hoveredNode.color && (
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: hoveredNode.color }}
                ></span>
              )}
              <span className="font-medium">{hoveredNode.label}</span>
            </div>
            <div className="text-xs text-lab-gray-400">
              {hoveredNode.type === 'agent' ? 'Agent' : 'Activity'}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CollaborationHub;
