# Techspec: ScopeRoom

## Architecture overview
```
Client ──► {team}-client room ◄──┐                 (group "{team} ScopeRoom", linked)
                                 │ scope (both rooms, the only bridge)
Approver ─► {team}-studio room ◄─┘──── build (Claude Code, GitHub write, 1 repo)
                                 └──── review (Codex, GitHub read, 1 repo)
studio room docs: ROOM-RULES, SCOPE-LEDGER (owned by scope)
```
The client room is client-safe: no raw output, no review findings. The studio room holds the gates, raw output and reviews.
Switch is load-bearing: the three agents run as separate sessions (different providers, different working directories, different GitHub grants), the approval gate is pinned to the deployer in the room instructions, exclusive roles decide who holds the pen, and the room history is the decision log. Remove Switch and the reviewer can't see the builder's work, approvals have nowhere to live, and the client sees nothing.

## Frontend choice
None of our own. The UI is the chat app (Mattermost bundled with Switch; Discord optional).
The demo target app (`demo-app/`) is Next.js 15 (App Router) + TypeScript + Tailwind, chosen because it is his strongest stack and small enough to change on camera.

## Backend choice
Switch server (Docker, started by Switch Console). No custom backend for the MVP.

## Routing model (who can address whom)
| Agent | addressing | Why |
|---|---|---|
| scope | anyone | Clients and teammates must be able to ask it things. Worst case is a wasted spec. |
| build | owner-agents | It writes code and pushes branches. A stray client mention must not start a build. |
| review | owner-agents | Only the owner or Build hands it a diff. |

## API design
No HTTP API. The contract is chat messages, defined in the room instructions:
- `SCOPE-<id>` ids are 3-digit, assigned by Scope in order (SCOPE-001...).
- Approval phrases (exact): `approve SCOPE-<id>`, `reject SCOPE-<id>: <reason>`, `approve PR SCOPE-<id>`.
- Build replies with `BUILD SCOPE-<id>: branch, commit sha, test summary` + raw output block.
- Review replies with a markdown table `| Criterion | Pass/Fail | Evidence |` + `Out-of-scope changes:` line.

## Integrations
- Switch GitHub connection: build `write` on `{repository}`; review `read` on `{repository}`; scope none.
- Providers: Claude Code (scope, build), Codex (review). Different provider for review is deliberate: independent second opinion.

## Dependencies
- Switch Console (latest stable), Docker Desktop.
- Claude Code CLI and Codex CLI, signed in.
- demo-app: next, react, typescript, tailwindcss, vitest, @testing-library/react. pnpm.

## Background jobs
None. Optional stretch: a `watch` agent that posts open scopes daily (cut if time is short).

## State management
- Room history: decisions and approvals.
- Room documents: `ROOM-RULES.md` (the conventions) attached as a room document.
- Repo: `scope/SCOPE-<id>.md` files are the durable signed scope, committed by Build on its branch.

## Caching
Not applicable.

## Deployment target
Local machine running Switch Console. Nothing is deployed. The repo is public on GitHub for judges.

## Observability
- `!agents-status`, `!list-agents`, `!roles`, `!list-aliases`, `!list-documents` as the live checks.
- Every agent reply restates the scope id, so the room can be searched by id.

## Tradeoffs
- Three agents instead of one: more setup, but it's what makes Switch central and the review honest.
- Mattermost instead of Slack: no admin access needed and judges can reproduce it.
- No auto-PR: slower, but it's the point of the human gate.

## Technical constraints
- Agent name, location and directory are fixed at creation; the `{team}` prefix param avoids name clashes.
- Switch passes agents a fixed set of env vars: test commands must not rely on shell-profile variables.
- Messages starting with `!` run commands even inside backticks: never paste `!reset` in docs as the first character of a message.
