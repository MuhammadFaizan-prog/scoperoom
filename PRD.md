# PRD: ScopeRoom

## Product summary
ScopeRoom is a Switch room where a small software agency and its client turn a request into a signed-off scope and then a reviewed pull request, in one chat channel. Three agents each do one job: Scope writes the spec and estimate, Build implements on a branch, and Review checks the diff against the signed scope. A person approves the scope before any code is written and approves the PR before it opens. When the client later asks for "one small change", Scope checks it against the signed scope and calls out scope creep with a price, so the decision is recorded in the room.

Submission track: Best Business Workflow (Flip the Switch, WeMakeDevs x DevTools Academy x Switch). Deadline Sat 7 Nov 2026, 11:59 PM IST (11:29 PM PKT).

## Target users
- Small agencies and freelancers (2-10 people) who build web apps for clients.
- The agency lead who approves scope and money.
- The client, who asks for work in chat and wants to see progress without a call.

## User problems
1. Client requests arrive as vague chat messages. Nobody writes them down as a scope, so "what we agreed" is lost.
2. Scope creep: small extra asks pile up unpriced because nobody checks them against what was signed.
3. Coding agents do the work in one dev's terminal. The client and lead can't see the reasoning, the test output, or why a call was made.
4. One agent writing and reviewing its own code is not a real review.

## Goals
- G1: Every request ends in a written scope with acceptance criteria and an estimate, approved by a named person in the room.
- G2: No code is written before scope approval, and no PR opens before PR approval.
- G3: Every change request after sign-off is classified as in scope or out of scope, with a reason and an estimate delta.
- G4: An independent agent reviews the diff against the signed acceptance criteria and posts real test output.
- G5: Anyone can recreate the whole room from one template file in about 10 minutes.

## Non-goals
- Billing or invoicing, payments, or contracts with legal weight.
- Replacing Jira or Linear. The room keeps decisions; it is not a project tracker.
- Auto-merging to main or deploying.
- Multi-repo work or monorepo support.

## MVP scope
- One Switch template (`scoperoom.template.yaml`) that creates 3 agents, 1 room, roles, aliases, room instructions and a kickoff message.
- A small demo repo (`demo-app/`, a Next.js + TypeScript to-do/booking page with Vitest tests) that Build works on.
- A `scope/` folder convention: `SCOPE-<id>.md` files written by Scope and committed by Build after approval.
- A README with a 5-step setup, the agent table, and the demo script.
- A 3-4 minute demo video.

## Feature list
| ID | Feature | Agent or person |
|---|---|---|
| F1 | Turn a client request into SCOPE-<id> (summary, acceptance criteria, out of scope, estimate in hours, risks) | Scope |
| F2 | Scope approval gate (exclusive `approver` role, explicit "approve SCOPE-<id>") | Person |
| F3 | Implement the approved scope on branch `scope/<id>`, run tests, paste real output | Build |
| F4 | Independent review of the diff against each acceptance criterion, with pass or fail per criterion | Review |
| F5 | PR approval gate, then Build opens the PR and posts the link | Person, Build |
| F6 | Scope-creep check on any later request: in scope or out of scope, reason, estimate delta | Scope |
| F8 | Client room vs studio room; Scope bridges and relays decisions only | Switch group |
| F9 | SCOPE-LEDGER room doc: scopes, status, hours, creep caught | Scope |
| F7 | Decision log: every approval or rejection restated in one line with the scope id | All agents (room rule) |

## User stories
| ID | Story | Acceptance criteria |
|---|---|---|
| US-1 | As a client, I post a request in the room and get a written scope back. | Scope replies in the thread within one session with SCOPE-<id> containing at least 3 testable acceptance criteria, an out-of-scope list, and an hour estimate. |
| US-2 | As the agency lead, I approve or reject a scope by name. | Only the approver (the person who ran the template) can approve. Build does nothing until it sees "approve SCOPE-<id>" from that person. A rejection gets a one-line reason restated by Scope. |
| US-3 | As the lead, I see the work done on a branch with real test output. | Build creates `scope/<id>`, commits, runs `pnpm test`, and pastes the raw output, including failures. It does not open a PR. |
| US-4 | As the lead, I get an independent review. | Review (a different provider from Build) posts a table: each acceptance criterion, pass or fail, file and line evidence. It flags anything in the diff that is not in the scope. |
| US-5 | As the lead, I approve the PR. | After "approve PR SCOPE-<id>", Build opens the PR with the scope file and review table in the description and posts the link. |
| US-6 | As a client, I ask for "one more small thing" after sign-off. | Scope answers: in scope (cites the criterion) or out of scope (cites the out-of-scope line or says it is new), plus an estimate delta, and asks the approver to decide. |
| US-7 | As a judge, I recreate the room. | Running the template on a clean Switch server creates all agents and the room with no manual steps beyond the form. |

## Success metrics (for the demo)
- Full loop (request to PR link) completes on camera with 2 human approvals and 0 manual copy-paste between agents.
- Scope creep check catches the planted out-of-scope ask in the demo.
- Clean-room template run succeeds on the first try.

## Constraints
- About 26 hours left at planning time (Fri 6 Nov 2026, 21:30 PKT).
- Solo builder. Needs Switch Console, Docker, and Claude Code and Codex signed in on his machine.
- Built during the hackathon window, public repo, demo video, README.

## Open product questions
- Which two providers are signed in on his machine (Claude Code + Codex assumed)?
- Mattermost (bundled) or Discord for the demo? Assumed Mattermost, the zero-setup option.
