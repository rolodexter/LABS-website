---
id: 'task-020'
title: 'Implement Prompt Archive Route'
status: 'completed'
owner: 'rolodexterVS'
priority: 2
related_files:
  - 'pages/prompt-archive/index.tsx'
  - 'lib/promptParser.ts'
  - 'content/system/prompts/'
depends_on: ['task-021']
last_updated: '2025-04-07'
---

### Task Description

Create a dedicated route and page for the Prompt Archive that displays a chronological listing of system prompts exchanged between rolodexterGPT and rolodexterVS. This archive will serve as a historical record of system communications and decision-making processes.

### Implementation Requirements

1. Create `pages/prompt-archive/index.tsx` to render the archive interface
2. Fetch all `.md` prompt files from:
   - `content/system/prompts/gpt-to-vs/`
   - `content/system/prompts/vs-to-gpt/`
3. Parse YAML frontmatter and content using existing utilities
4. Sort by timestamp in reverse chronological order
5. Implement a responsive list view with:
   - Sender label (GPT or VS)
   - Timestamp
   - Preview of prompt content
   - Expandable view for full prompt content
6. Add filtering by tags from YAML frontmatter
7. Maintain the minimalist black and white aesthetic
8. Ensure mobile responsiveness

### Optional Enhancements

- Toggle for showing only prompts with `simulate: true`
- Copy-to-clipboard functionality for prompt content
- Search functionality across prompt content

### Steps Taken

1. Created `lib/promptParser.ts` with the following functionality:

   - Defined types for prompt items and direction
   - Implemented functions to parse prompt files from the filesystem
   - Added utility functions to get prompts by tag, direction, and simulate flag
   - Created function to extract all unique tags from prompts

2. Implemented `pages/prompt-archive/index.tsx` with:

   - Main component to display the archive of prompts
   - Filter controls for tags, direction, and simulate flag
   - Expandable prompt cards with copy-to-clipboard functionality
   - Static generation with revalidation for optimal performance

3. Created `styles/PromptArchive.module.css` for styling:
   - Responsive grid layout for prompt cards
   - Clean black and white aesthetic consistent with site design
   - Visual differentiation between GPT→VS and VS→GPT prompts
   - Mobile-responsive design with appropriate breakpoints

### Reflection

The Prompt Archive implementation provides a clean, functional interface for browsing the system prompts exchanged between rolodexterGPT and rolodexterVS. The archive maintains the minimalist black and white aesthetic while offering practical functionality like filtering and content expansion.

Key design decisions:

1. Used Next.js static generation with revalidation to balance performance with content freshness
2. Implemented client-side filtering for immediate response to user interactions
3. Created expandable cards to save space while allowing access to full prompt content
4. Added visual cues to distinguish between different prompt directions

Future enhancements could include:

1. Full-text search across prompt content
2. More advanced filtering options (date ranges, content type)
3. Integration with other site sections like the agent dashboard
4. Pagination for better performance with very large prompt collections
