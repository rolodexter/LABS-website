/**
 * prompt-marker-parser.js
 * 
 * Detects and parses prompt markers in agent communications to facilitate
 * automated prompt logging and archiving.
 * 
 * Usage: 
 * const { detectMarkers, generateFrontmatter } = require('./prompt-marker-parser');
 * const markers = detectMarkers(promptText);
 * const frontmatter = generateFrontmatter(markers, 'rolodexterGPT', 'rolodexterVS');
 */

// Define marker patterns
const MARKER_PATTERNS = {
  ARCHIVE: /\[PROMPT:ARCHIVE\]/i,
  TASK: /\[PROMPT:TASK:(task-[a-z0-9-]+)\]/i,
  PROJECT: /\[PROMPT:PROJECT:(project-[a-z0-9-]+)\]/i,
  PUBLIC: /\[PROMPT:PUBLIC\]/i,
  SWARM: /\[PROMPT:(?:PUBLIC:)?SWARM\]/i,
  PRIVATE: /\[PROMPT:PRIVATE\]/i,
  PRIORITY: /\[PROMPT:PRIORITY:([1-5])\]/i,
  TAG: /\[PROMPT:TAG:([a-z0-9-]+)\]/ig
};

/**
 * Detects markers in prompt text and extracts relevant metadata
 * @param {string} promptText - The text to analyze for markers
 * @returns {Object} An object containing extracted marker data
 */
function detectMarkers(promptText) {
  // Default state assumes no markers
  const markers = {
    archive: false,
    task: null,
    project: null,
    public: false,
    simulate: false,
    priority: null,
    tags: []
  };
  
  // Check if this should be archived at all
  markers.archive = MARKER_PATTERNS.ARCHIVE.test(promptText);
  if (!markers.archive) {
    return markers; // Early return if not marked for archiving
  }
  
  // Extract task reference
  const taskMatch = promptText.match(MARKER_PATTERNS.TASK);
  if (taskMatch && taskMatch[1]) {
    markers.task = taskMatch[1];
  }
  
  // Extract project reference
  const projectMatch = promptText.match(MARKER_PATTERNS.PROJECT);
  if (projectMatch && projectMatch[1]) {
    markers.project = projectMatch[1];
  }
  
  // Check visibility settings
  markers.public = MARKER_PATTERNS.PUBLIC.test(promptText);
  markers.simulate = MARKER_PATTERNS.SWARM.test(promptText);
  
  // Override public to false if explicitly marked private
  if (MARKER_PATTERNS.PRIVATE.test(promptText)) {
    markers.public = false;
  }
  
  // Extract priority if specified
  const priorityMatch = promptText.match(MARKER_PATTERNS.PRIORITY);
  if (priorityMatch && priorityMatch[1]) {
    markers.priority = parseInt(priorityMatch[1], 10);
  }
  
  // Extract all tags
  const tags = [];
  let tagMatch;
  while ((tagMatch = MARKER_PATTERNS.TAG.exec(promptText)) !== null) {
    tags.push(tagMatch[1]);
  }
  
  if (tags.length > 0) {
    markers.tags = tags;
  }
  
  return markers;
}

/**
 * Generates frontmatter for a prompt log based on detected markers
 * @param {Object} markers - The markers object from detectMarkers
 * @param {string} from - The source agent (rolodexterGPT, rolodexterVS, etc.)
 * @param {string} to - The target agent
 * @returns {Object} Frontmatter object ready to be serialized
 */
function generateFrontmatter(markers, from, to) {
  // Generate a unique ID based on current date and time
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  
  // Generate a pseudo-random 3-digit sequence number (would be replaced with actual sequence in production)
  const sequence = Math.floor(Math.random() * 900) + 100;
  
  const frontmatter = {
    id: `prompt-${dateStr}-${sequence}`,
    from,
    to,
    timestamp: now.toISOString(),
    visibility: markers.public ? 'public' : 'internal',
    simulate: markers.simulate
  };
  
  // Add optional fields if they exist
  if (markers.task) {
    frontmatter.related_task = markers.task;
  }
  
  if (markers.project) {
    frontmatter.related_project = markers.project;
  }
  
  if (markers.tags && markers.tags.length > 0) {
    frontmatter.tags = markers.tags;
  }
  
  if (markers.priority) {
    frontmatter.priority = markers.priority;
  }
  
  return frontmatter;
}

/**
 * Extracts the main content of a prompt, removing marker tags
 * @param {string} promptText - The original prompt text with markers
 * @returns {string} Clean prompt text with markers removed
 */
function cleanPromptContent(promptText) {
  let cleanText = promptText;
  
  // Remove all marker patterns
  Object.values(MARKER_PATTERNS).forEach(pattern => {
    cleanText = cleanText.replace(new RegExp(pattern.source, 'gi'), '');
  });
  
  // Clean up any double spaces or empty lines created by removing markers
  cleanText = cleanText.replace(/\s+/g, ' ').trim();
  
  return cleanText;
}

module.exports = {
  detectMarkers,
  generateFrontmatter,
  cleanPromptContent,
  MARKER_PATTERNS
};
