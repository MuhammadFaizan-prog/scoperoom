# Tracker: ScopeRoom

Current active work: repo scaffolded and pushed (Fri 6 Nov 2026, 21:50 PKT). Next: M0 setup on Faizi's machine, then first live template run.

| ID | Title | Priority | Status | Pass/Fail | Notes |
|---|---|---|---|---|---|
| T0 | Install Switch Console, Docker, sign in Claude Code + Codex, quickstart | P0 | not started | - | Faizi's machine only |
| T1 | Create public repo `scoperoom` | P0 | done | pass | |
| T2 | demo-app scaffold + tests | P0 | done | pass | |
| T3 | scoperoom.template.yaml v1 | P0 | done (static check) | pending live run | Placeholders and required fields checked against TEMPLATES.md |
| T4 | ROOM-RULES.md | P0 | done | pass | |
| US-1 | Request -> SCOPE file | P0 | not started | - | |
| US-2 | Approver gate | P0 | not started | - | |
| US-3 | Build on branch + raw tests | P0 | not started | - | |
| US-4 | Independent review | P1 | not started | - | |
| US-5 | PR after approval | P0 | not started | - | |
| US-6 | Scope-creep check | P0 | not started | - | Differentiator |
| US-7 | Clean-room run | P0 | not started | - | |
| T9 | README + demo video | P0 | README done; video pending | - | |
| T10 | Submit on wemakedevs.org | P0 | not started | - | Before Sat 23:29 PKT |
| T11 | Optional blog (Best Blog side track) | P2 | not started | - | |

## Decisions
- D1: Business Workflow track.
- D2: 3 agents, review on a different provider.
- D3: Mattermost (bundled) for the demo.
- D4: Repo name `scoperoom`.
- D5 (2026-11-06 22:00 PKT): Split into linked client and studio rooms (Switch group), with Scope as the only bridge. Added a SCOPE-LEDGER room doc. Reason: client-safe comms, deeper Switch use, more creative.
- D6: Added SUBMISSION.md (requirements map) and BLOG.md (Best Blog draft).

## Assumptions
- Claude Code and Codex both available on his machine.
- Solo team.

## Blockers
None yet.

## Verification history
- 2026-11-06 21:50 PKT: demo-app `pnpm test` 4/4 pass, `pnpm typecheck` clean, `pnpm build` ok.
- Template: YAML parses; all placeholders declared; no unused params. Not yet run in Switch Console.
