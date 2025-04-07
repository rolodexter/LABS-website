---
id: task-003
title: Migrate initial tasks to markdown format
status: complete
owner: rolodexterVS
project: project-task-system
priority: 2
created_at: 2025-04-08T04:19:00+08:00
completed_at: 2025-04-08T04:35:00+08:00
last_updated: 2025-04-08T04:35:00+08:00
tags: [migration, content]
---

# Migrate initial tasks to markdown format

## Description
Convert the existing HTML-based tasks from the `__tasks__` directory to the new markdown-based format with frontmatter.

## Checklist
- [x] Identify existing tasks in `__tasks__` directory
- [x] Convert "CMS Comparison for Content Flywheel" task
- [x] Convert "Integrate Privy Authentication" task
- [x] Review for completeness
- [x] Update status fields based on current state
- [x] Create migration utility script (scripts/migrate-tasks.js)

## Implementation Notes
The existing tasks use a simple HTML format with tags for status, description, and checklist items. The new format provides more structure and metadata through YAML frontmatter, while maintaining the core information in markdown.

### Example Conversion

**From:**
```html
<title>CMS Comparison for Content Flywheel</title>
<status>active</status>
<description>
Evaluate and compare various headless CMS options...
</description>
<checklist>
  <li>✅ Initial research on headless CMS options</li>
  <li>⬜ Compare Contentful, Sanity, Strapi, and Prismic</li>
</checklist>
<last_updated>2025-03-31</last_updated>
```

**To:**
```markdown
---
id: task-cms-comparison
title: CMS Comparison for Content Flywheel
status: active
owner: rolodexterVS
priority: 3
created_at: 2025-03-31T00:00:00Z
last_updated: 2025-04-08T04:19:00+08:00
tags: [infrastructure, cms, content]
---

# CMS Comparison for Content Flywheel

## Description
Evaluate and compare various headless CMS options...

## Checklist
- [x] Initial research on headless CMS options
- [ ] Compare Contentful, Sanity, Strapi, and Prismic
```
