import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for our swarm data
interface SwarmEvent {
  id: string;
  timestamp: string;
  duration: number;
  type: 'prompt' | 'task-status-change' | 'task-creation' | 'agent-thinking';
  source: string;
  target: string | null;
  content: {
    [key: string]: any;
  };
  visual: {
    color: string;
    intensity: number;
    path: 'curved' | 'direct' | 'pulsing';
  };
}

interface Agent {
  id: string;
  role: string;
  position: { x: number; y: number };
  color: string;
  description: string;
  currentFocus: string | null;
  lastActive: string | null;
  activeConnections: string[];
}

interface TerminalLog {
  id: string;
  timestamp: string;
  command: string;
  output: string;
  source: string;
}

interface SwarmFeed {
  generated: string;
  events: SwarmEvent[];
  agents: Agent[];
  terminalLogs: TerminalLog[];
}

// Helper function to calculate path coordinates
const calculatePath = (
  source: { x: number; y: number },
  target: { x: number; y: number },
  pathType: string
) => {
  const width = 100;
  const height = 100;
  
  const sourceX = source.x * width;
  const sourceY = source.y * height;
  const targetX = target.x * width;
  const targetY = target.y * height;
  
  if (pathType === 'direct') {
    return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  }
  
  // Create a curved path
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2 - 15; // Control point above the direct line
  
  return `M ${sourceX} ${sourceY} Q ${midX} ${midY} ${targetX} ${targetY}`;
};

// Main component
const SwarmVisualization: React.FC = () => {
  const [feed, setFeed] = useState<SwarmFeed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeEvents, setActiveEvents] = useState<SwarmEvent[]>([]);
  const [visibleLogs, setVisibleLogs] = useState<TerminalLog[]>([]);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  // Matrix to map agent/task IDs to positions
  const [positionMap, setPositionMap] = useState<Record<string, { x: number; y: number }>>({});
  
  useEffect(() => {
    // Load the swarm feed data
    const loadSwarmData = async () => {
      try {
        const response = await fetch('/data/swarm-feed.json');
        const data = await response.json();
        setFeed(data);
        
        // Initialize position map with agents
        const initialPositions: Record<string, { x: number; y: number }> = {};
        data.agents.forEach((agent: Agent) => {
          initialPositions[agent.id] = agent.position;
        });
        
        // Add task positions based on their connections to agents
        // This is a simplified approach - a real implementation would use a force-directed layout
        const taskIds = new Set<string>();
        data.events.forEach((event: SwarmEvent) => {
          if (event.type.includes('task') && typeof event.target === 'string' && event.target.includes('task-')) {
            taskIds.add(event.target);
          }
        });
        
        let angle = 0;
        const angleStep = (2 * Math.PI) / taskIds.size;
        const taskRadius = 0.25;
        
        taskIds.forEach((taskId) => {
          // Position tasks in a circle in the center of the visualization
          const x = 0.5 + taskRadius * Math.cos(angle);
          const y = 0.5 + taskRadius * Math.sin(angle);
          initialPositions[taskId] = { x, y };
          angle += angleStep;
        });
        
        setPositionMap(initialPositions);
        setLoading(false);
        
        // Start animation after a short delay
        setTimeout(startPlayback, 1000);
      } catch (error) {
        console.error('Error loading swarm feed:', error);
        setLoading(false);
      }
    };
    
    loadSwarmData();
    
    return () => {
      // Clean up animation on unmount
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const startPlayback = () => {
    if (!feed) return;
    
    // Sort events by timestamp
    const sortedEvents = [...feed.events].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Get time range of events
    const startTime = new Date(sortedEvents[0].timestamp).getTime();
    const endTime = new Date(sortedEvents[sortedEvents.length - 1].timestamp).getTime();
    const timeRange = endTime - startTime;
    
    // Compress time to fit animation duration (5 seconds)
    const animationDuration = 5000;
    const timeCompression = animationDuration / timeRange;
    
    const startTimestamp = performance.now();
    
    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTimestamp;
      const normalizedTime = Math.min(1, elapsed / animationDuration);
      const currentTime = startTime + normalizedTime * timeRange;
      
      setPlaybackTime(currentTime);
      
      // Determine which events should be active
      const currentEvents = sortedEvents.filter((event) => {
        const eventTime = new Date(event.timestamp).getTime();
        const eventEndTime = eventTime + event.duration * timeCompression;
        return eventTime <= currentTime && eventEndTime >= currentTime;
      });
      
      setActiveEvents(currentEvents);
      
      // Update terminal logs (show most recent 5)
      const currentLogs = feed.terminalLogs
        .filter((log) => new Date(log.timestamp).getTime() <= currentTime)
        .slice(-5);
      
      setVisibleLogs(currentLogs);
      
      if (normalizedTime < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white font-mono text-sm">
          Initializing swarm network...
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* SVG visualization layer */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection paths */}
        {activeEvents.map((event) => {
          const sourcePosition = positionMap[event.source];
          const targetPosition = event.target ? positionMap[event.target] : null;
          
          if (!sourcePosition || !targetPosition) return null;
          
          return (
            <motion.path
              key={event.id}
              d={calculatePath(sourcePosition, targetPosition, event.visual.path)}
              stroke={event.visual.color}
              strokeWidth={event.visual.intensity * 0.5}
              fill="none"
              strokeOpacity={event.visual.intensity * 0.8}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          );
        })}
        
        {/* Agents */}
        {feed?.agents.map((agent) => (
          <motion.g
            key={agent.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
          >
            <circle
              cx={agent.position.x * 100}
              cy={agent.position.y * 100}
              r={3}
              fill={agent.color}
              fillOpacity={0.9}
              stroke="#ffffff"
              strokeWidth={0.3}
            />
            <text
              x={agent.position.x * 100}
              y={(agent.position.y * 100) + 6}
              fontSize={2}
              fill="#ffffff"
              textAnchor="middle"
              className="select-none"
            >
              {agent.id}
            </text>
          </motion.g>
        ))}
        
        {/* Task nodes */}
        {Object.entries(positionMap)
          .filter(([id]) => id.includes('task-'))
          .map(([id, position]) => (
            <motion.g
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.random() * 0.8 + 0.5 }}
            >
              <rect
                x={(position.x * 100) - 3}
                y={(position.y * 100) - 3}
                width={6}
                height={6}
                rx={1}
                fill="#1E293B"
                stroke="#64748B"
                strokeWidth={0.3}
              />
              <text
                x={position.x * 100}
                y={(position.y * 100) + 6}
                fontSize={1.5}
                fill="#94A3B8"
                textAnchor="middle"
                className="select-none"
              >
                {id.split('-').slice(0, 2).join('-')}
              </text>
            </motion.g>
          ))}
      </svg>
      
      {/* Terminal overlay */}
      <div className="absolute bottom-8 right-8 w-96 bg-black bg-opacity-80 border border-gray-800 rounded-md overflow-hidden font-mono text-xs text-white">
        <div className="p-2 bg-gray-900 text-gray-400 border-b border-gray-800">
          rolodexter@LABS ~ terminal
        </div>
        <div className="p-4 h-64 overflow-hidden">
          <AnimatePresence>
            {visibleLogs.map((log, index) => (
              <motion.div
                key={log.id}
                className="mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-green-400">$ {log.command}</div>
                <div className="text-gray-400 whitespace-pre-line mt-1">
                  {log.output}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute top-8 left-8 bg-black bg-opacity-70 border border-gray-800 rounded-md p-3 font-mono text-xs text-white">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <div className="text-gray-400">Swarm Status</div>
        </div>
        <div className="text-gray-500">
          <div>Agents: {feed?.agents.length}</div>
          <div>
            Active Connections:{' '}
            <span className="text-green-400">{activeEvents.length}</span>
          </div>
          <div>
            Tasks:{' '}
            {Object.keys(positionMap).filter(id => id.includes('task-')).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwarmVisualization;
