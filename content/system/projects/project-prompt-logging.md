---
id: project-prompt-logging
title: Prompt Logging and Simulation System
status: active
owner: rolodexterVS
priority: 1
related_files:
  - content/system/prompts/
created_at: 2025-04-08T04:16:00+08:00
last_updated: 2025-04-08T04:16:00+08:00
tags: [infrastructure, memory-management, agent-communication]
---

# Prompt Logging and Simulation System

## Overview
This system captures high-signal prompts exchanged between agents (rolodexterGPT, rolodexterVS, and Joe) to create institutional memory and power UI simulations.

## Objectives
- Archive important agent-to-agent communications
- Enable replay of historical prompts
- Power homepage swarm simulation with real agent activity
- Build a corpus of high-quality in-system communication

## Components
- `prompts/gpt-to-vs/` and `prompts/vs-to-gpt/` directories
- Markdown files with rich frontmatter including `simulate` and `visibility` flags
- Prompt markers system (`[PROMPT:ARCHIVE]`, `[PROMPT:PUBLIC:SWARM]`, etc.)
- Integration with the Task Management System

## Related Tasks
- task-007: Create prompt directory structure
- task-008: Define prompt log schema with frontmatter
- task-009: Detect and parse prompt markers
- task-010: Create CLI utility for prompt logging (optional)
- task-011: Archive first prompt: prompt-2025-04-08-001.md
- task-012: Write README.md for prompt system

## Notes
This system aligns with rolodexterLABS' focus on manufacturing knowledge at scale and treating agent communications as first-class system assets. The black and white minimalist aesthetic will be maintained in any UI components that visualize this data.
