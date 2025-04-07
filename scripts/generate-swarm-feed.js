/**
 * generate-swarm-feed.js
 * 
 * Generates a structured JSON feed of agent activities, task transitions, and
 * prompts for powering the animated swarm visualization on first load.
 * 
 * This script analyzes the task and prompt repositories to create a realistic
 * event timeline that can be compressed and replayed for the visitor.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const TASKS_DIR = path.join(__dirname, '../content/system/tasks');
const PROMPTS_DIR = path.join(__dirname, '../content/system/prompts');
const OUTPUT_FILE = path.join(__dirname, '../public/data/swarm-feed.json');

// Agent definitions with visual positioning
const AGENTS = {
  'rolodexterGPT': {
    id: 'rolodexterGPT',
    role: 'architect',
    position: { x: 0.2, y: 0.3 },
    color: '#34D399', // Green
    description: 'System architecture & design intelligence'
  },
  'rolodexterVS': {
    id: 'rolodexterVS',
    role: 'engineer',
    position: { x: 0.6, y: 0.4 },
    color: '#6366F1', // Indigo
    description: 'Implementation & execution layer'
  },
  'Joe': {
    id: 'Joe',
    role: 'director',
    position: { x: 0.4, y: 0.2 },
    color: '#F59E0B', // Amber
    description: 'Strategic direction & resource allocation'
  }
};

/**
 * Extracts metadata from markdown files
 * @param {string} directory - Directory containing markdown files
 * @param {string} pattern - Glob pattern for finding files
 * @returns {Array} Array of parsed file metadata
 */
/**
 * Recursively reads markdown files from a directory
 * @param {string} directory - Directory to read from
 * @returns {Array} Array of parsed markdown file data
 */
async function parseMarkdownFiles(directory) {
  try {
    // Ensure directory exists before trying to read from it
    if (!fs.existsSync(directory)) {
      console.log(`Directory does not exist: ${directory}`);
      return [];
    }
    
    const results = [];
    await readFilesRecursively(directory, results);
    return results;
  } catch (error) {
    console.error(`Error parsing markdown files from ${directory}:`, error);
    return [];
  }
}

/**
 * Helper function to recursively read files from a directory
 * @param {string} dir - Directory to read from
 * @param {Array} results - Array to store results
 */
async function readFilesRecursively(dir, results) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await readFilesRecursively(fullPath, results);
    } else if (entry.name.endsWith('.md')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { data, content: bodyContent } = matter(content);
        
        // Extract title from the first heading if not in frontmatter
        let title = data.title;
        if (!title) {
          const match = bodyContent.match(/^# (.*)$/m);
          title = match ? match[1] : path.basename(fullPath, '.md');
        }
        
        results.push({
          id: data.id || path.basename(fullPath, '.md'),
          path: fullPath,
          title,
          content: bodyContent,
          ...data
        });
      } catch (fileErr) {
        console.error(`Error processing file ${fullPath}:`, fileErr);
      }
    }
  }
}

/**
 * Extracts snippet from prompt content
 * @param {string} content - Full prompt content
 * @param {number} maxLength - Maximum length of snippet
 * @returns {string} Extracted snippet
 */
function extractSnippet(content, maxLength = 75) {
  // Remove markdown headings and whitespace
  const cleaned = content
    .replace(/^#+\s+.*$/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  if (cleaned.length <= maxLength) return cleaned;
  
  return cleaned.substring(0, maxLength - 3) + '...';
}

/**
 * Generates a random variation within a percentage range
 * @param {number} base - Base value
 * @param {number} percentage - Percentage variation (0-100)
 * @returns {number} Value with random variation
 */
function addNaturalVariation(base, percentage = 15) {
  const variation = (Math.random() * 2 - 1) * (base * percentage / 100);
  return Math.max(0, base + variation);
}

/**
 * Determine visual characteristics for an event
 * @param {Object} event - Event data
 * @returns {Object} Visual properties
 */
function determineVisualProperties(event) {
  const visual = {
    color: AGENTS[event.source]?.color || '#94A3B8',
    intensity: 0.7,
    path: 'curved'
  };
  
  // Adjust based on event type
  switch (event.type) {
    case 'prompt':
      visual.intensity = 0.9;
      break;
    case 'task-status-change':
      if (event.content.toStatus === 'complete') {
        visual.intensity = 1.0;
        visual.path = 'direct';
      } else {
        visual.intensity = 0.6;
      }
      break;
    case 'agent-thinking':
      visual.intensity = 0.4;
      visual.path = 'pulsing';
      break;
  }
  
  // Random subtle variation for more organic feel
  visual.intensity = Math.min(1, Math.max(0.1, visual.intensity + (Math.random() * 0.2 - 0.1)));
  
  return visual;
}

/**
 * Generates events from task status changes
 * @param {Array} tasks - Array of parsed task data
 * @returns {Array} Events generated from tasks
 */
function generateTaskEvents(tasks) {
  const events = [];
  
  tasks.forEach(task => {
    // Task creation event
    events.push({
      id: `event-task-creation-${task.id}`,
      timestamp: task.created_at,
      duration: addNaturalVariation(1200),
      type: 'task-creation',
      source: task.owner || 'rolodexterVS',
      target: task.id,
      content: {
        taskId: task.id,
        title: task.title,
        status: 'created',
      }
    });
    
    // Task completion event
    if (task.status === 'complete' && task.completed_at) {
      events.push({
        id: `event-task-completion-${task.id}`,
        timestamp: task.completed_at,
        duration: addNaturalVariation(1800),
        type: 'task-status-change',
        source: task.owner || 'rolodexterVS',
        target: task.id,
        content: {
          taskId: task.id,
          title: task.title,
          fromStatus: 'active',
          toStatus: 'complete'
        }
      });
    }
  });
  
  return events;
}

/**
 * Generates events from prompt exchanges
 * @param {Array} prompts - Array of parsed prompt data
 * @returns {Array} Events generated from prompts
 */
function generatePromptEvents(prompts) {
  const events = [];
  
  // Filter for simulation-enabled prompts
  const simulationPrompts = prompts.filter(prompt => 
    prompt.simulate === true || prompt.simulate === 'true'
  );
  
  simulationPrompts.forEach(prompt => {
    // Extract a snippet of the prompt content
    const snippet = extractSnippet(prompt.content);
    
    // Create the prompt event
    events.push({
      id: `event-prompt-${prompt.id}`,
      timestamp: prompt.timestamp,
      duration: addNaturalVariation(2400),
      type: 'prompt',
      source: prompt.from,
      target: prompt.to,
      content: {
        promptId: prompt.id,
        title: prompt.title || `Prompt to ${prompt.to}`,
        snippet,
        tags: prompt.tags || []
      }
    });
    
    // Add a thinking event after the prompt
    const thinkingDuration = addNaturalVariation(3500);
    const thinkingTimestamp = new Date(new Date(prompt.timestamp).getTime() + 5000);
    
    events.push({
      id: `event-thinking-${prompt.id}`,
      timestamp: thinkingTimestamp.toISOString(),
      duration: thinkingDuration,
      type: 'agent-thinking',
      source: prompt.to,
      target: null,
      content: {
        relatedPromptId: prompt.id,
        relatedTaskId: prompt.related_task,
        intensity: 0.7
      }
    });
  });
  
  return events;
}

/**
 * Updates agent states based on events
 * @param {Array} agents - Array of agent definitions
 * @param {Array} events - Array of events
 * @returns {Array} Updated agent states
 */
function updateAgentStates(agents, events) {
  const agentStates = Object.values(agents).map(a => ({...a}));
  const agentMap = {};
  
  // Create a map for easy access
  agentStates.forEach(agent => {
    agent.currentFocus = null;
    agent.lastActive = null;
    agent.activeConnections = [];
    agentMap[agent.id] = agent;
  });
  
  // Sort events by timestamp
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );
  
  // Update agent states based on events
  sortedEvents.forEach(event => {
    const sourceAgent = agentMap[event.source];
    const targetAgent = agentMap[event.target];
    
    if (sourceAgent) {
      sourceAgent.lastActive = event.timestamp;
      
      if (event.target) {
        // Add connection if not a thinking event
        if (event.type !== 'agent-thinking') {
          sourceAgent.activeConnections = 
            [...new Set([...sourceAgent.activeConnections, event.target])];
        }
        
        // Update focus for task-related events
        if (event.type.includes('task')) {
          sourceAgent.currentFocus = event.target;
        }
      }
    }
    
    if (targetAgent) {
      // Update the target agent's connections
      targetAgent.activeConnections = 
        [...new Set([...targetAgent.activeConnections, event.source])];
    }
  });
  
  return agentStates;
}

/**
 * Generate terminal log entries from events
 * @param {Array} events - Array of events
 * @returns {Array} Terminal log entries
 */
function generateTerminalLogs(events) {
  return events.filter(event => 
    // Only include certain event types in terminal logs
    ['prompt', 'task-status-change', 'task-creation'].includes(event.type)
  ).map(event => {
    let command, output;
    
    switch (event.type) {
      case 'prompt':
        command = `prompt-exchange --from=${event.source} --to=${event.target} --id=${event.content.promptId}`;
        output = `Loading prompt "${event.content.title}"...\nExchanging data: ${event.content.snippet}`;
        break;
      case 'task-creation':
        command = `task-create --id=${event.content.taskId} --owner=${event.source}`;
        output = `Task created: ${event.content.title}\nStatus: ${event.content.status}`;
        break;
      case 'task-status-change':
        command = `task-update --id=${event.content.taskId} --status=${event.content.toStatus}`;
        output = `Task updated: ${event.content.title}\nStatus changed: ${event.content.fromStatus} → ${event.content.toStatus}`;
        break;
    }
    
    return {
      id: `log-${event.id}`,
      timestamp: event.timestamp,
      command,
      output,
      source: event.source
    };
  });
}

/**
 * Main function to generate the swarm feed
 */
async function generateSwarmFeed() {
  try {
    console.log('Starting swarm feed generation...');
    
    // Parse markdown files
    const tasks = await parseMarkdownFiles(TASKS_DIR);
    console.log(`Parsed ${tasks.length} tasks`);
    
    // Parse prompts from all subdirectories
    const gptToVsPrompts = await parseMarkdownFiles(path.join(PROMPTS_DIR, 'gpt-to-vs'));
    const vsToGptPrompts = await parseMarkdownFiles(path.join(PROMPTS_DIR, 'vs-to-gpt'));
    const joePrompts = await parseMarkdownFiles(path.join(PROMPTS_DIR, 'joe'));
    const allPrompts = [...gptToVsPrompts, ...vsToGptPrompts, ...joePrompts];
    console.log(`Parsed ${allPrompts.length} prompts`);
    
    // Generate events
    const taskEvents = generateTaskEvents(tasks);
    const promptEvents = generatePromptEvents(allPrompts);
    const allEvents = [...taskEvents, ...promptEvents].sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );
    
    // Add visual properties
    const eventsWithVisuals = allEvents.map(event => ({
      ...event,
      visual: determineVisualProperties(event)
    }));
    
    // Update agent states
    const updatedAgents = updateAgentStates(AGENTS, eventsWithVisuals);
    
    // Generate terminal logs
    const terminalLogs = generateTerminalLogs(eventsWithVisuals);
    
    // Create the feed object
    const feed = {
      generated: new Date().toISOString(),
      events: eventsWithVisuals,
      agents: updatedAgents,
      terminalLogs
    };
    
    // Create directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(feed, null, 2));
    console.log(`Successfully generated swarm feed: ${OUTPUT_FILE}`);
    
    return feed;
  } catch (error) {
    console.error('Error generating swarm feed:', error);
    throw error;
  }
}

// Execute if this script is run directly
if (require.main === module) {
  generateSwarmFeed()
    .then(() => console.log('Swarm feed generation complete'))
    .catch(err => console.error('Feed generation failed:', err));
} else {
  // Export for use as a module
  module.exports = {
    generateSwarmFeed
  };
}
