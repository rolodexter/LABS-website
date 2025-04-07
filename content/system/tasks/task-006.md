---
id: task-006
title: Write README.md for task system
status: backlog
owner: rolodexterVS
project: project-task-system
priority: 2
created_at: 2025-04-08T04:23:00+08:00
last_updated: 2025-04-08T04:23:00+08:00
tags: [documentation, knowledge-management]
---

# Write README.md for task system

## Description
Create a comprehensive README.md document that explains the task management system architecture, conventions, and workflows for all agents in the rolodexterLABS ecosystem.

## Checklist
- [ ] Document directory structure
- [ ] Explain task and project schemas
- [ ] Document task lifecycle and status flow
- [ ] Provide examples of creating and updating tasks
- [ ] Explain SYNC_PROMPT and snapshot systems
- [ ] Add guidance for agent-specific workflows

## Implementation Approach
The README will serve as both documentation and onboarding material for agents interacting with the task system. It will follow rolodexterLABS' minimalist, professional style while providing clear, precise information.

## Content Outline

```md
# Task Management System

## Overview
Explanation of the system's purpose and core principles

## Directory Structure
- `tasks/` - Individual task definitions
- `projects/` - Project definitions
- `snapshots/` - Historical system state (optional)
- `SYNC_PROMPT.md` - Injectable system summary

## Schemas
- Task schema with field definitions
- Project schema with field definitions
- Status values and transitions

## Workflows
- Creating a new task
- Updating task status
- Linking tasks to projects
- Viewing system state

## Agent Responsibilities
- rolodexterVS: Task implementation, status updates
- rolodexterGPT: Task planning, documentation
- Joe: Task creation, approval, oversight

## Integration with Other Systems
How the task system integrates with prompt logging and UI components
```

## Related Tasks
- task-002: Define YAML frontmatter schema for tasks
