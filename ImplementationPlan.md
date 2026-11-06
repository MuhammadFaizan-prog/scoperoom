# Implementation plan: ScopeRoom

Deadline: Sat 7 Nov 2026, 11:59 PM IST = 11:29 PM PKT. Times below are PKT.

## Milestones
| # | Milestone | Target |
|---|---|---|
| M0 | Switch Console + Docker + Claude Code + Codex working, quickstart agent answers in Mattermost | Fri 23:59 |
| M1 | Repo scaffolded: docs, demo-app with passing tests, ROOM-RULES.md | Sat 02:00 |
| M2 | Template v1 creates 3 agents + room; kickoff works | Sat 11:00 |
| M3 | Full loop rehearsed by hand, then run with agents: request -> scope -> approve -> build -> review -> PR | Sat 15:00 |
| M4 | Scope-creep path works; clean-room template run passes | Sat 18:00 |
| M5 | Demo video recorded, README final, repo public | Sat 21:30 |
| M6 | Submitted | Sat 22:30 (1h buffer) |

## Build phases (vertical slices)
1. Setup slice (M0): install, quickstart, keep the Switch expert room for questions. Verify: agent replies in channel.
2. Repo slice (M1): `demo-app` (Next.js + TS + Tailwind + Vitest), 2-3 tests, `pnpm test` green. Verify: `pnpm test` exits 0.
3. Template slice (M2): start from `examples/agent-templates/triage-pair.template.yaml`, add third agent, roles, aliases, room instructions, connections. Verify: Console validates on save; run creates everything; `!list-agents`, `!roles`, `!list-aliases` correct.
4. Scope slice: Scope instructions produce SCOPE-001 in the exact format. Verify: 3+ ACs, out-of-scope, estimate.
5. Gate slice: approver role + rule; non-approver approval is ignored. Verify on camera with a second Mattermost user.
6. Build slice: branch, commit scope file, implement, tests, raw output, no PR. Verify: branch exists on GitHub, no PR.
7. Review slice: Codex review table against ACs. Verify: table cites file:line, flags out-of-scope changes.
8. PR slice: approve PR -> PR link. Verify: PR exists with scope + review in body.
9. Creep slice: change request classified. Verify: SCOPE-002 drafted with parent and delta.
10. Ship slice: clean-room run, README, video, submit.

## Dependencies
Phase 1 blocks all. 2 and 3 can run in parallel. 4-9 in order.

## Checkpoints
- Test: `pnpm test` after every Build run (agents paste it).
- Design: scope message and review table readable on a phone.
- Security: `auto_approve: false` on build and review; GitHub write scoped to one repo; no secrets in repo.
- Release: clean-room run before recording.

## Rollback / recovery
- If 3 agents are unstable by Sat 15:00: drop to 2 (scope+build) and do review as a second Build pass. Document honestly.
- If GitHub connection fails: Build pushes with local git credentials and posts the compare URL; PR opened by Build via `gh` if available.
- If Codex isn't available: Review uses Claude Code with a strict reviewer role; note it in README.

## Verification commands
```
cd demo-app && pnpm install && pnpm test && pnpm build
# in the room
!list-agents
!agents-status
!roles
!list-aliases
!list-documents
```
