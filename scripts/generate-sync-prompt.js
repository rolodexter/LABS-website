/**
 * generate-sync-prompt.js
 * 
 * Generates the SYNC_PROMPT.md file by scanning the task and project directories
 * and creating a compact summary for injection into rolodexterGPT's context window.
 * 
 * Usage: node scripts/generate-sync-prompt.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const TASKS_DIR = path.join(__dirname, '../content/system/tasks');
const PROJECTS_DIR = path.join(__dirname, '../content/system/projects');
const SYNC_PROMPT_PATH = path.join(__dirname, '../content/system/SYNC_PROMPT.md');

// Helper functions
function parseMarkdownFiles(directoryPath) {
  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(directoryPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return {
      id: data.id || path.basename(file, '.md'),
      ...data,
      filePath
    };
  });
}

// Main execution
function generateSyncPrompt() {
  // Get current date in ISO format
  const currentDate = new Date().toISOString();
  
  // Load tasks and projects
  const tasks = parseMarkdownFiles(TASKS_DIR);
  const projects = parseMarkdownFiles(PROJECTS_DIR);
  
  // Calculate statistics
  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  
  const activeProjects = projects.filter(project => project.status === 'active');
  const activeTasks = tasks.filter(task => task.status === 'active');
  const completedTasks = tasks.filter(task => task.status === 'complete');
  const backlogTasks = tasks.filter(task => task.status === 'backlog');
  
  // Group active tasks by owner
  const tasksByOwner = activeTasks.reduce((acc, task) => {
    acc[task.owner] = acc[task.owner] || [];
    acc[task.owner].push(task);
    return acc;
  }, {});
  
  // Find sprint tasks if defined (in this case "Swarm Activation Layer")
  const sprintTasks = tasks.filter(task => 
    ['task-004', 'task-009', 'task-010', 'task-011'].includes(task.id)
  );
  
  // Generate markdown content
  let content = `# Current Task + Project State Summary (Auto-Generated)
_Last updated: ${currentDate.split('T')[0]}T${currentDate.split('T')[1].slice(0, 8)}+08:00_

## 🧠 Active Projects (${activeProjects.length})
${activeProjects.map(project => `- **${project.id}** — ${project.title} (owner: ${project.owner})`).join('\n')}

## ✅ Task Status Overview
${Object.entries(tasksByStatus).map(([status, count]) => `- **${status.charAt(0).toUpperCase() + status.slice(1)}**: ${count} tasks`).join('\n')}
- **Total**: ${tasks.length} tasks

`;

  // Add active tasks by owner
  for (const [owner, ownerTasks] of Object.entries(tasksByOwner)) {
    content += `## 📋 Active Tasks by ${owner} (${ownerTasks.length})
${ownerTasks.map(task => {
  const projectNote = task.project ? ` (project: ${task.project.replace('project-', '')})` : '';
  const currentFocus = task.id === 'task-004' ? ' — ⚡ CURRENT FOCUS' : '';
  return `- **${task.id}** — ${task.title}${projectNote}${currentFocus}`;
}).join('\n')}

`;
  }

  // Add sprint section
  content += `## 🚀 Current Sprint: "Swarm Activation Layer"
${sprintTasks.map(task => `- **${task.id}** — ${task.title} (status: ${task.status})`).join('\n')}

## 🏁 Recently Completed Tasks
${completedTasks.map(task => `- **${task.id}** — ${task.title}`).join('\n')}

## 📊 System Metrics
- ${activeProjects.length} active projects
- ${tasks.length} tasks created
- ${completedTasks.length} tasks completed (${Math.round((completedTasks.length / tasks.length) * 100)}% completion rate)
- 0 tasks blocked

_This summary is designed for injection into rolodexterGPT's context window at the beginning of a session to maintain synchronization across agent boundaries._`;

  // Write to file
  fs.writeFileSync(SYNC_PROMPT_PATH, content);
  console.log(`Successfully generated ${SYNC_PROMPT_PATH}`);
}

// Execute
generateSyncPrompt();
