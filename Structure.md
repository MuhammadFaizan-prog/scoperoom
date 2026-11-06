# Structure: ScopeRoom

```
scoperoom/
  README.md                     judge entry point
  scoperoom.template.yaml       the whole Switch setup (agents, room, roles, kickoff)
  ROOM-RULES.md                 conventions, attached as a room document
  PRD.md Techspec.md Appflow.md Schema.md ImplementationPlan.md
  Tracker.md Rules.md Security.md Structure.md
  demo/
    script.md                   exact messages for the recording
    screenshots/
  scope/                        SCOPE-<id>.md (written via the workflow)
  demo-app/
    package.json pnpm-lock.yaml
    app/page.tsx                booking page
    app/actions.ts              server action: create booking
    lib/bookings.ts             in-memory store + rules
    lib/schema.ts               zod schema
    tests/bookings.test.ts      baseline tests (4)
    vitest.config.ts next.config.ts tsconfig.json
  .gitignore
  LICENSE                       MIT
```

## Template
The live template is `scoperoom.template.yaml` in the repo root (validated against docs/TEMPLATES.md: every placeholder declared, every agent has provider, location and directory, `repo:` clones the fork into each agent folder, room `docs:` attaches ROOM-RULES).

## Module boundaries
Template = Switch setup. ROOM-RULES.md = conventions. demo-app = the thing being changed. scope/ = durable agreements.

## Adapter locations
Agent working dirs are created by Switch under `{$agents_dir}/{agent}`; build's dir must be a clone of the repo (README step).
