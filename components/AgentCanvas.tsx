import React, { Suspense, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { AgentData } from '../hooks/useAgentCanvasData';
import { AgentInteraction, loadAllPromptArchives } from '../lib/promptParser';
import path from 'path';

// Dynamically import Spline to reduce initial bundle size
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <AgentCanvasFallback />,
});

interface AgentCanvasProps {
  agents: AgentData[];
}

const AgentCanvas: React.FC<AgentCanvasProps> = ({ agents }) => {
  const [interactions, setInteractions] = useState<AgentInteraction[]>([]);
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load prompt archives
    const archiveDir = path.join(process.cwd(), 'content', 'prompt-archive');
    const loadedInteractions = loadAllPromptArchives(archiveDir);
    setInteractions(loadedInteractions);
  }, []);

  useEffect(() => {
    // Cycle through interactions in loop mode
    if (interactions.length > 0) {
      const timer = setInterval(() => {
        setCurrentInteractionIndex(prevIndex => (prevIndex + 1) % interactions.length);
      }, 5000); // Change interaction every 5 seconds

      return () => clearInterval(timer);
    }
  }, [interactions]);

  // Find agents involved in current interaction
  const currentInteraction = interactions[currentInteractionIndex];
  const involvedAgents = currentInteraction
    ? agents.filter(agent => currentInteraction.agents.includes(agent.name))
    : [];

  return (
    <div
      ref={canvasRef}
      className="agent-canvas-container relative w-full h-[500px] md:h-[700px] bg-white"
    >
      {/* Agent Visualization Layer */}
      <div className="absolute inset-0 z-10">
        {involvedAgents.map((agent, index) => (
          <div
            key={agent.name}
            className="absolute"
            style={{
              left: `${20 + index * 40}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Suspense fallback={<AgentCanvasFallback />}>
              <Spline
                scene={agent.splineSceneUrl}
                className="w-32 h-32"
                style={{
                  stroke: agent.animationConfig.baseColor,
                  strokeWidth: 1,
                  fill: 'none',
                }}
              />
              <div className="text-center mt-2 text-black">{agent.name}</div>
            </Suspense>
          </div>
        ))}

        {/* Interaction Connection Line */}
        {involvedAgents.length > 1 && (
          <svg
            className="absolute inset-0 pointer-events-none z-20"
            style={{ width: '100%', height: '100%' }}
          >
            <line
              x1="30%"
              y1="50%"
              x2="70%"
              y2="50%"
              stroke="black"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          </svg>
        )}
      </div>

      {/* Interaction Context Overlay */}
      {currentInteraction && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-black z-30">
          <p>{currentInteraction.metadata?.context || 'Agent Interaction'}</p>
        </div>
      )}
    </div>
  );
};

const AgentCanvasFallback: React.FC = () => (
  <motion.div
    className="w-full h-full flex items-center justify-center bg-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-1/2 h-1/2 stroke-black fill-none"
    >
      <circle cx="50" cy="50" r="40" strokeWidth="2" />
      <line x1="10" y1="50" x2="90" y2="50" strokeWidth="2" />
      <line x1="50" y1="10" x2="50" y2="90" strokeWidth="2" />
    </svg>
  </motion.div>
);

export default AgentCanvas;
