import { nanoid } from 'nanoid';

// Define agent types
export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'thinking' | 'idle';
  specialty: string;
  currentTask?: string;
}

export interface Activity {
  id: string;
  timestamp: number;
  agentId: string;
  type: 'research' | 'analysis' | 'connection' | 'insight' | 'question';
  content: string;
  relatedIds?: string[];
  category?: string;
}

// Predefined sample agents with diverse specialties
const predefinedAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Archimedes',
    role: 'Research Specialist',
    avatar: '/agents/archimedes.png',
    status: 'active',
    specialty: 'Mathematical Analysis',
    currentTask: 'Analyzing patterns in quantum computing research'
  },
  {
    id: 'agent-2',
    name: 'Hypatia',
    role: 'Knowledge Curator',
    avatar: '/agents/hypatia.png',
    status: 'active',
    specialty: 'Content Organization',
    currentTask: 'Categorizing new submissions on neural interfaces'
  },
  {
    id: 'agent-3',
    name: 'Turing',
    role: 'Logic Systems',
    avatar: '/agents/turing.png',
    status: 'active',
    specialty: 'Computational Theory',
    currentTask: 'Formulating novel approaches to verification problems'
  },
  {
    id: 'agent-4',
    name: 'Curie',
    role: 'Data Scientist',
    avatar: '/agents/curie.png',
    status: 'thinking',
    specialty: 'Pattern Recognition',
    currentTask: 'Identifying correlations in multi-modal datasets'
  },
  {
    id: 'agent-5',
    name: 'Tesla',
    role: 'Systems Integration',
    avatar: '/agents/tesla.png',
    status: 'active',
    specialty: 'Cross-domain Applications',
    currentTask: 'Connecting disparate knowledge systems'
  },
  {
    id: 'agent-6',
    name: 'Lovelace',
    role: 'Algorithm Designer',
    avatar: '/agents/lovelace.png',
    status: 'active',
    specialty: 'Procedural Generation',
    currentTask: 'Optimizing knowledge retrieval pathways'
  },
  {
    id: 'agent-7',
    name: 'Ramanujan',
    role: 'Pattern Analyst',
    avatar: '/agents/ramanujan.png',
    status: 'idle',
    specialty: 'Mathematical Intuition',
    currentTask: 'Developing new heuristics for knowledge classification'
  }
];

// Sample research topics and insights
const researchTopics = [
  'Quantum Computing Advances',
  'Neuromorphic Computing',
  'Large Language Model Alignment',
  'Protein Folding Algorithms',
  'Synthetic Biology Applications',
  'Advanced Materials Science',
  'Climate Prediction Models',
  'Autonomous Systems Ethics',
  'Zero-Knowledge Proofs',
  'Generative AI Applications',
  'Multi-agent Cooperation',
  'Neural Interface Design',
  'Swarm Intelligence',
  'Federated Learning Systems',
  'Cognitive Architecture'
];

const activityTemplates = {
  research: [
    'Scanning recent papers on {{topic}}',
    'Compiling research history on {{topic}}',
    'Analyzing citation patterns in {{topic}} literature',
    'Identifying key researchers in {{topic}}',
    'Comparing methodologies used in {{topic}}'
  ],
  analysis: [
    'Evaluating the implications of {{topic}}',
    'Finding connections between {{topic}} and other domains',
    'Assessing the limitations of current {{topic}} approaches',
    'Examining statistical significance in {{topic}} results',
    'Comparing competing theories about {{topic}}'
  ],
  connection: [
    'Linking {{topic}} with research in adjacent fields',
    'Found connection between {{topic}} and unexpected domain',
    'Mapping interdisciplinary applications of {{topic}}',
    'Creating knowledge graph for {{topic}} development',
    'Bridging concepts between {{topic}} and related technologies'
  ],
  insight: [
    'Key insight: {{topic}} could revolutionize existing paradigms',
    'Pattern detected: {{topic}} development follows predictable cycle',
    'Critical finding: {{topic}} faces fundamental limitation',
    'Unexpected result in {{topic}} suggests new research direction',
    'Synthesis of {{topic}} approaches reveals overlooked opportunity'
  ],
  question: [
    'How might {{topic}} be applied to solve real-world problems?',
    'What are the ethical implications of advances in {{topic}}?',
    'Could {{topic}} be combined with other approaches for better results?',
    'What fundamental barriers exist to further {{topic}} development?',
    'How will {{topic}} evolve in the next 5-10 years?'
  ]
};

// Generate a pool of active agents
export function getActiveAgents(): Agent[] {
  // Random subset of predefined agents, plus status updates
  return predefinedAgents.map(agent => ({
    ...agent,
    status: Math.random() > 0.2 ? 'active' : Math.random() > 0.5 ? 'thinking' : 'idle',
    currentTask: Math.random() > 0.1 ? agent.currentTask : undefined
  }));
}

// Generate a new simulated activity
export function getRecentActivity(): Activity {
  const agents = predefinedAgents;
  const agent = agents[Math.floor(Math.random() * agents.length)];
  const topic = researchTopics[Math.floor(Math.random() * researchTopics.length)];
  const activityTypes = ['research', 'analysis', 'connection', 'insight', 'question'] as const;
  const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  
  const templates = activityTemplates[type];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const content = template.replace('{{topic}}', topic);
  
  // For connections and insights, sometimes add related IDs
  let relatedIds;
  if ((type === 'connection' || type === 'insight') && Math.random() > 0.3) {
    // Generate 1-3 random related IDs
    const count = Math.floor(Math.random() * 3) + 1;
    relatedIds = Array.from({ length: count }, () => `activity-${Math.floor(Math.random() * 1000)}`);
  }
  
  return {
    id: `activity-${nanoid(6)}`,
    timestamp: Date.now(),
    agentId: agent.id,
    type,
    content,
    relatedIds,
    category: Math.random() > 0.5 ? topic.toLowerCase().replace(/\s+/g, '-') : undefined
  };
}

// Generate initial activities for the system
export function getInitialActivities(count = 50): Activity[] {
  return Array.from({ length: count }, () => getRecentActivity());
}