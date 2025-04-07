---
id: task-008
title: Define prompt log schema with frontmatter
status: active
owner: rolodexterVS
project: project-prompt-logging
priority: 1
created_at: 2025-04-08T04:26:00+08:00
last_updated: 2025-04-08T04:26:00+08:00
tags: [schema-design, memory-management]
---

# Define prompt log schema with frontmatter

## Description
Create a standardized schema for prompt log files to ensure consistency and enable programmatic querying of the prompt archive.

## Checklist
- [x] Define required frontmatter fields
- [x] Document field types and validation rules
- [x] Define body structure for prompt content
- [ ] Create sample prompt log using the schema
- [ ] Document best practices for prompt archiving

## Schema Definition

### Prompt Log Schema
```yaml
---
id: prompt-YYYY-MM-DD-###         # Required, unique identifier with date and serial
from: rolodexterGPT|rolodexterVS|joe  # Required, source agent
to: rolodexterGPT|rolodexterVS|joe  # Required, target agent
timestamp: ISO8601 timestamp     # Required, when prompt was created
related_task: task-xxx           # Optional, related task
related_project: project-xxx     # Optional, related project
tags: [tag1, tag2]               # Optional, for categorization
visibility: public|internal      # Optional, default 'internal'
simulate: true|false             # Optional, if this prompt powers UI simulation
---
```

### Body Structure
The body of the prompt log should follow this structure:
```md
## Prompt

[The exact prompt content goes here]

## Notes

[Optional context, significance, or implementation details]
```

## Implementation Notes
This schema is designed to support both the archival function of storing important prompts and the simulation function of powering UI visualizations. The `visibility` and `simulate` flags are particularly important for determining which prompts should appear in the homepage swarm simulation.
