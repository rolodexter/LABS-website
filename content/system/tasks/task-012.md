---
id: task-012
title: Write README.md for prompt system
status: backlog
owner: rolodexterVS
project: project-prompt-logging
priority: 2
created_at: 2025-04-08T04:31:00+08:00
last_updated: 2025-04-08T04:31:00+08:00
tags: [documentation, knowledge-management]
---

# Write README.md for prompt system

## Description
Create a comprehensive README.md document that explains the prompt logging system architecture, conventions, and workflows for all agents in the rolodexterLABS ecosystem.

## Checklist
- [ ] Document directory structure
- [ ] Explain prompt log schema and frontmatter
- [ ] Document prompt marker system
- [ ] Provide examples of creating and archiving prompts
- [ ] Explain integration with the swarm UI simulation
- [ ] Add guidance for agent-specific workflows

## Implementation Approach
The README will serve as both documentation and onboarding material for agents interacting with the prompt logging system. It will follow rolodexterLABS' minimalist, professional style while providing clear, precise information about how to capture and utilize inter-agent communications.

## Content Outline

```md
# Prompt Logging and Simulation System

## Overview
Explanation of the system's purpose and core principles

## Directory Structure
- `prompts/gpt-to-vs/` - Prompts from rolodexterGPT to rolodexterVS
- `prompts/vs-to-gpt/` - Prompts from rolodexterVS to rolodexterGPT

## Schema
- Prompt log schema with field definitions
- Body structure guidelines
- Visibility and simulation flags

## Prompt Markers
- Available markers and their functions
- How to use markers in live conversations
- Marker parsing and frontmatter generation

## Workflows
- Manual prompt archiving
- Using the CLI utility (if implemented)
- Updating existing prompt logs

## Integration with UI
- How prompt logs power the swarm simulation
- Visibility control and public/internal designation

## Best Practices
- What to archive (and what not to)
- Naming and tagging conventions
- Linking to tasks and projects
```

## Related Tasks
- task-008: Define prompt log schema with frontmatter
- task-009: Detect and parse prompt markers
