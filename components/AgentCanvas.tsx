import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentData } from '../hooks/useAgentCanvasData';
import { AgentInteraction, loadAllPromptArchives } from '../lib/promptParser';
import path from 'path';

// Configuration constants (can be moved to .env later)
const CANVAS_CONFIG = {
  loopInterval: 5000, // 5 seconds between prompt cycles
  maxVisibleAgents: 3,
  animationStyles: {
    default: { scale: 1, opacity: 1 },
    pulse: { scale: [1, 1.1, 1], transition: { duration: 0.5, repeat: 2 } },
    fade: { opacity: [1, 0.5, 1] },
    orbit: {
      rotate: [0, 360],
      transition: { duration: 2, repeat: Infinity, ease: 'linear' },
    },
  },
};

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
  const [animationTriggers, setAnimationTriggers] = useState<{
    [agentName: string]: keyof (typeof CANVAS_CONFIG)['animationStyles'];
  }>({});

  // Load prompt archives on component mount
  useEffect(() => {
    const archiveDir = path.join(process.cwd(), 'content', 'prompt-archive');
    const loadedInteractions = loadAllPromptArchives(archiveDir);
    setInteractions(loadedInteractions);
  }, []);

  // Cycle through interactions with animation logic
  useEffect(() => {
    if (interactions.length === 0) return;

    const cycleInteractions = () => {
      const nextIndex = (currentInteractionIndex + 1) % interactions.length;
      const currentInteraction = interactions[currentInteractionIndex];
      const nextInteraction = interactions[nextIndex];

      // Determine animation triggers based on keywords
      const newAnimationTriggers: typeof animationTriggers = {};

      currentInteraction.exchanges.forEach(exchange => {
        if (exchange.keywords?.includes('task-complete')) {
          newAnimationTriggers[exchange.speaker] = 'pulse';
        } else if (exchange.keywords?.includes('spawn')) {
          newAnimationTriggers[exchange.speaker] = 'orbit';
        } else if (exchange.keywords?.includes('context')) {
          newAnimationTriggers[exchange.speaker] = 'fade';
        }
      });

      setAnimationTriggers(newAnimationTriggers);
      setCurrentInteractionIndex(nextIndex);
    };

    const timer = setInterval(cycleInteractions, CANVAS_CONFIG.loopInterval);
    return () => clearInterval(timer);
  }, [interactions, currentInteractionIndex]);

  // Find agents involved in current interaction
  const currentInteraction = interactions[currentInteractionIndex];
  const involvedAgents = currentInteraction
    ? agents.filter(agent => currentInteraction.agents.includes(agent.name))
    : [];

  return (
    <div className="agent-canvas-container relative w-full h-[500px] md:h-[700px] bg-white">
      {/* Agent Visualization Layer */}
      <div className="absolute inset-0 z-10 flex justify-center items-center space-x-8">
        <AnimatePresence>
          {involvedAgents.slice(0, CANVAS_CONFIG.maxVisibleAgents).map((agent, index) => {
            const animationStyle = animationTriggers[agent.name] || 'default';

            return (
              <motion.div
                key={agent.name}
                initial={CANVAS_CONFIG.animationStyles.default}
                animate={CANVAS_CONFIG.animationStyles[animationStyle]}
                className="flex flex-col items-center"
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

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

      {/* Interaction Context Overlay */}
      {currentInteraction && (
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center text-black z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p>{currentInteraction.metadata?.context || 'Agent Interaction'}</p>
        </motion.div>
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
      <circle cx="50" cy="50" r="40" strokeWidth={2} />
      <line x1="10" y1="50" x2="90" y2="50" strokeWidth={2} />
      <line x1="50" y1="10" x2="50" y2="90" strokeWidth={2} />
    </svg>
  </motion.div>
);

export default AgentCanvas;
