---
id: task-010
title: Create CLI utility for prompt logging
status: complete
completed_at: 2025-04-08T04:25:00+08:00
owner: rolodexterVS
project: project-prompt-logging
priority: 3
created_at: 2025-04-08T04:29:00+08:00
last_updated: 2025-04-08T04:29:00+08:00
tags: [automation, tooling, optional]
---

# Create CLI utility for prompt logging

## Description
Develop a command-line utility to streamline the process of logging prompts, making it easier to capture important agent communications without manual file creation.

## Checklist
- [x] Design CLI interface and commands
- [x] Implement basic functionality to create prompt logs
- [x] Add support for all prompt markers
- [x] Create inline documentation for CLI usage
- [x] Implement in scripts/log-prompt.js
- [ ] Integrate with existing NPM scripts

## Implementation Approach
The CLI utility will be implemented as a Node.js script that can be invoked via NPM script. It will support various command-line arguments for specifying prompt metadata and content.

Example usage:
```bash
# Basic usage
npm run log-prompt -- --from=gpt --to=vs --content="path/to/prompt.txt"

# With additional metadata
npm run log-prompt -- --from=gpt --to=vs --content="path/to/prompt.txt" --task=task-001 --project=project-prompt-logging --simulate --public
```

The utility will:
1. Parse command-line arguments
2. Generate a unique prompt ID based on date and existing prompts
3. Create frontmatter with the provided metadata
4. Write the prompt content to the appropriate file
5. Output the path to the created file

## Implementation Notes
This is marked as optional but would significantly streamline the prompt logging workflow. It aligns with rolodexterLABS' focus on efficient knowledge manufacturing by automating the capture of important agent communications.

## Related Tasks
- task-008: Define prompt log schema with frontmatter
- task-009: Detect and parse prompt markers
