---
id: task-004
title: Implement SYNC_PROMPT.md generator
status: complete
completed_at: 2025-04-08T04:23:00+08:00
owner: rolodexterVS
project: project-task-system
priority: 2
created_at: 2025-04-08T04:20:00+08:00
last_updated: 2025-04-08T04:20:00+08:00
tags: [automation, memory-management]
---

# Implement SYNC_PROMPT.md generator

## Description
Create a mechanism to automatically generate a compact system state summary (`SYNC_PROMPT.md`) that can be injected into rolodexterGPT's context window at the beginning of a session. This ensures the agent has up-to-date knowledge of the current task and project state.

## Checklist
- [x] Create initial structure for `SYNC_PROMPT.md`
- [x] Write script to scan task and project directories
- [x] Generate summary statistics (active tasks, project status)
- [x] Format output in markdown optimized for context injection
- [x] Create a manual generator script (scripts/generate-sync-prompt.js)
- [ ] Implement automatic update trigger (git hook or scheduled script)

## Implementation Approach
The SYNC_PROMPT.md generator will:
1. Scan all task and project files
2. Extract key metadata from frontmatter
3. Organize into a compact, hierarchical display
4. Include summary statistics
5. Format everything in a way that minimizes token usage

## Example Output Format
```md
# Current Task + Project State Summary (Auto-Generated)

## Active Tasks (5)
- task-001 — rolodexterVS creating task directory (complete)
- task-002 — rolodexterVS defining schema (active)
- task-007 — rolodexterVS creating prompt structure (backlog)

## Projects (2)
- project-task-system — status: active
- project-prompt-logging — status: active

## Status Distribution
- Backlog: 4
- Active: 3
- Complete: 1

_Last updated: 2025-04-08T04:20:00+08:00_
```

## Related Tasks
- task-005: Scaffold optional snapshots/ system
