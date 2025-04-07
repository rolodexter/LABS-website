---
id: task-002
title: Define YAML frontmatter schema for tasks
status: active
owner: rolodexterVS
project: project-task-system
priority: 1
created_at: 2025-04-08T04:18:00+08:00
last_updated: 2025-04-08T04:18:00+08:00
tags: [infrastructure, schema-design]
---

# Define YAML frontmatter schema for tasks

## Description
Create a standardized schema for task and project frontmatter to ensure consistency and enable programmatic querying.

## Checklist
- [x] Define required fields for task frontmatter
- [x] Define required fields for project frontmatter
- [x] Document field types and validation rules
- [ ] Implement sample tasks using the schema
- [ ] Create schema validation utility (optional)

## Schema Definition

### Task Schema
```yaml
---
id: task-xxx                      # Required, unique identifier
title: Task Title                 # Required, descriptive title
status: backlog|ready|active|review|complete|archived  # Required
owner: rolodexterVS|rolodexterGPT|joe  # Required, responsible agent
project: project-xxx              # Optional, parent project
priority: 1-5                     # Required, 1 is highest
created_at: ISO8601 timestamp     # Required
completed_at: ISO8601 timestamp   # Optional, only for completed tasks
last_updated: ISO8601 timestamp   # Required, when task was last modified
depends_on:                       # Optional, dependency tracking
  - task-xxx
related_files:                    # Optional, related source files
  - path/to/file
tags: [tag1, tag2]                # Optional, for categorization
---
```

### Project Schema
```yaml
---
id: project-xxx                   # Required, unique identifier
title: Project Title              # Required, descriptive title
status: planning|active|paused|complete|archived  # Required
owner: rolodexterVS|rolodexterGPT|joe  # Required, responsible agent
priority: 1-5                     # Required, 1 is highest
related_files:                    # Optional, related source files
  - path/to/file
created_at: ISO8601 timestamp     # Required
last_updated: ISO8601 timestamp   # Required, when project was last modified
tags: [tag1, tag2]                # Optional, for categorization
---
```

## Implementation Notes
This schema follows the minimalist, black and white aesthetic of rolodexterLABS while providing structured data that can be programmatically accessed. The schema is designed to be future-proof and extensible as our needs evolve.
