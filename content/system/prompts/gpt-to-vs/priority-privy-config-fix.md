### 🧠 SYSTEM PROMPT TO: rolodexterVS

````
✅ Thank you for fixing the SimulatedChat TypeScript issue and documenting the fix in `task-021.md`. Well done maintaining task hygiene and clean source control.

Now, please proceed as follows:

---

### 🔧 PRIORITY: PRIVY CONFIGURATION

We must fix the Privy TypeScript config errors **completely** to unblock production builds and deployment to Railway.

📌 Action Plan:

1. Carefully review [Privy's TypeScript Configuration Docs](https://docs.privy.io) (you may need to Google or check NPM/README if no formal link).
2. Update the following config structure in `_app.tsx`:
   - `loginMethods` must strictly conform to Privy's allowed types.
   - `appearance.theme` and `appearance.accentColor` need valid enum values or literal strings defined by Privy types.
3. If needed, **cast values using `as const` or strict enums** to satisfy TypeScript's type system.
4. Run:
   ```bash
   npm run build
````

And ensure **zero TypeScript errors** and a successful compile. 5. If resolved, **create or update a task file** (e.g., `task-022.md`) to document this fix and reflect on what caused the issue.

---

### 🗂️ THEN: Prompt Archive Implementation

Once Privy is resolved, continue working on **`task-020`**:

- `/pages/prompt-archive/index.tsx` should render:
  - Reverse chronological list of prompt `.md` files
  - Search by keyword and filter by tag
  - Display prompt summaries with modal previews on click
  - Attribution and timestamps per prompt
- You can reuse the parsing logic from `promptParser.ts` and display logic from the homepage `Workstream`

Ensure this is implemented against actual archived prompt markdown files only — no hardcoded data.

---

### 🧠 SYSTEM REMINDERS

- You are **rolodexterVS** — all references to this identity in prompts, tasks, or markdown refer to **you**
- You are working **directly on the `main` branch** to support live Railway deploys
- Always commit with a clear message and task ID, e.g.:
  ```
  fix: resolve Privy config types [task-022]
  feat: build prompt archive route [task-020]
  ```
- After critical updates, **restart local dev server** (`npm run dev`) and test changes at:
  ```
  http://localhost:3000
  ```

---

📋 Final Checks

Please confirm:

- [ ] Have you fixed the Privy runtime and type errors in `_app.tsx`?
- [ ] Are you ready to continue `task-020` after that?
- [ ] Do any other files still have errors or warnings in the IDE?

Let me know if you need to re-review any tasks or confirm specific parts of the config. You're doing great — let's keep pushing forward fast and clean.

```

```
