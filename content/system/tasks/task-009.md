---
id: task-009
title: Detect and parse prompt markers
status: complete
completed_at: 2025-04-08T04:24:00+08:00
owner: rolodexterVS
project: project-prompt-logging
priority: 2
created_at: 2025-04-08T04:27:00+08:00
last_updated: 2025-04-08T04:27:00+08:00
tags: [automation, parsing]
---

# Detect and parse prompt markers

## Description
Implement a mechanism to detect and parse prompt markers in agent communications, enabling automated prompt logging based on specific markers.

## Checklist
- [x] Define the complete set of prompt markers
- [x] Implement parsing logic for extracting metadata from markers
- [x] Create a detection mechanism that can be triggered on agent communications
- [x] Ensure marker parsing correctly sets frontmatter fields
- [x] Implement in scripts/prompt-marker-parser.js
- [ ] Test with various marker combinations in production

## Marker Definitions

| Marker | Purpose | Frontmatter Effect |
|--------|---------|-------------------|
| `[PROMPT:ARCHIVE]` | Flag prompt for archival | Triggers creation of prompt log file |
| `[PROMPT:TASK:task-xxx]` | Link to specific task | Sets `related_task: task-xxx` |
| `[PROMPT:PROJECT:project-xxx]` | Link to specific project | Sets `related_project: project-xxx` |
| `[PROMPT:PUBLIC:SWARM]` | Include in UI simulation | Sets `visibility: public` and `simulate: true` |

## Implementation Approach
The marker detection system will scan text for marker patterns using regular expressions, extract relevant metadata, and use this to populate the frontmatter fields of the generated prompt log file.

Example implementation pseudo-code:
```javascript
function detectMarkers(promptText) {
  const markers = {
    archive: promptText.includes('[PROMPT:ARCHIVE]'),
    task: promptText.match(/\[PROMPT:TASK:(task-\d+)\]/)?.[1],
    project: promptText.match(/\[PROMPT:PROJECT:(project-[a-z-]+)\]/)?.[1],
    public: promptText.includes('[PROMPT:PUBLIC:SWARM]')
  };
  
  return markers;
}

function generateFrontmatter(markers, from, to) {
  // Generate frontmatter based on detected markers
}
```

## Related Tasks
- task-008: Define prompt log schema with frontmatter
- task-010: Create CLI utility for prompt logging (optional)
