import { useState, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';

export type AgentShape = 'cube' | 'pyramid' | 'sphere';
export type AgentType = 'human' | 'ai' | 'tool';
export type MovementPattern = 'oscillate' | 'rotate' | 'pulse';

export interface AnimationConfig {
  baseColor: string;
  wireframeOnly: boolean;
  movementPattern: MovementPattern;
  interactionRadius: number;
}

export interface AgentData {
  name: string;
  type: AgentType;
  shape: AgentShape;
  icon: string;
  splineSceneUrl: string;
  animationConfig: AnimationConfig;
  promptArchive?: string[];
}

export const useAgentCanvasData = () => {
  const [agentData, setAgentData] = useState<AgentData[]>([]);

  useEffect(() => {
    const loadAgentData = async () => {
      try {
        const agentsDir = path.join(process.cwd(), 'content', 'agents');
        const promptArchiveDir = path.join(process.cwd(), 'content', 'prompt-archive');

        const agentFiles = await fs.readdir(agentsDir);
        const agents: AgentData[] = await Promise.all(
          agentFiles
            .filter(file => file.endsWith('.json'))
            .map(async (file) => {
              const agentPath = path.join(agentsDir, file);
              const agentContent = await fs.readFile(agentPath, 'utf-8');
              const agent = JSON.parse(agentContent) as AgentData;

              try {
                const promptPath = path.join(promptArchiveDir, agent.name);
                const promptFiles = await fs.readdir(promptPath);
                const promptArchive = await Promise.all(
                  promptFiles.map(async (promptFile) => {
                    const fullPromptPath = path.join(promptPath, promptFile);
                    return await fs.readFile(fullPromptPath, 'utf-8');
                  })
                );
                agent.promptArchive = promptArchive;
              } catch (archiveError) {
                console.warn(`No prompt archive found for agent ${agent.name}`);
                agent.promptArchive = [];
              }

              return agent;
            })
        );

        setAgentData(agents);
      } catch (error) {
        console.error('Error loading agent data:', error);
      }
    };

    loadAgentData();
  }, []);

  return agentData;
};
