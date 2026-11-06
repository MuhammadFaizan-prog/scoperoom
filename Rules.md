# Rules: ScopeRoom

## Coding rules (demo-app)
- TypeScript strict. No `any` without a comment.
- Validation with zod at the form/server boundary.
- Every acceptance criterion gets at least one Vitest test.
- pnpm only.

## Agent behavior rules (also in room instructions)
- Always name the scope id. "The new feature" is not an id.
- Paste real command output, including failures. Never summarize a failing run into something that sounds fine.
- No code before `approve SCOPE-<id>` from the approver. No PR before `approve PR SCOPE-<id>`.
- One scope in build at a time.
- When something is rejected, restate why in one line.
- Never change files outside the scope; if needed, say so and let Scope open a new scope.
- Say what you're about to do before a slow step.

## Design rules
- Chat replies: lead with the result, then the table, then the raw output block. Short tables, max 4 columns.

## Naming
- Agents `{team}-scope`, `{team}-build`, `{team}-review`; aliases scope, build, review.
- Branch `scope/<id>`, file `scope/SCOPE-<id>.md`, PR title `SCOPE-<id>: <title>`.

## Folder conventions
See Structure.md. Docs in repo root (the nine files) plus README.

## Testing rules
`pnpm test` must pass on main. Build posts test output on every run.

## Documentation rules
README is the judge's entry point: what it does in 3 lines, agent table, setup, demo, troubleshooting, remove-Switch test.

## Generated files
None besides `.next/` and `node_modules/` (gitignored).

## Files not to edit directly
`scope/SCOPE-*.md` after approval: changes go in a new scope with `parent`.

## Git rules
Agents never push to main and never force-push.
