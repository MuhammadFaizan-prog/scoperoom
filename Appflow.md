# Appflow: ScopeRoom

## Rooms
- `{team}-client`: the client and scope. Plain-language status only.
- `{team}-studio`: the approver, scope, build and review. Gates, raw output, reviews, and the SCOPE-LEDGER doc.

## Primary user journey (the demo)
1. Lead runs the template in Switch Console: fills `team`, `repository`, providers, bridge. Room appears in Mattermost.
2. Kickoff: each agent states in one line what it will and won't do.
3. Client posts: "Can we add a booking form with name, email and date, and stop double bookings?"
4. Scope replies in thread with SCOPE-001: summary, 4 acceptance criteria, out of scope (email confirmations, payments), estimate 3h, risks.
5. The approver (whoever ran the template) posts `approve SCOPE-001`. Scope restates the decision in one line.
6. Build: branches `scope/001`, commits `scope/SCOPE-001.md`, implements, runs `pnpm test`, pastes real output.
7. Build asks `@review` to check SCOPE-001 on branch `scope/001`.
8. Review posts the criteria table (pass/fail with file:line) and lists any changes outside the scope.
9. If a criterion fails: Lead tells Build to fix; loop 6-8. Shown once on camera if natural.
10. Lead posts `approve PR SCOPE-001`. Build opens the PR (scope file + review table in body) and posts the link. Artifact: the PR.
10b. Scope tells the client in the client room, with the PR link.
11. Client posts (client room): "Also send a confirmation email, quick one." Scope: "Out of scope for SCOPE-001 (listed under Out of scope). New SCOPE-002, estimate +2h. Approver to decide." Scope-creep caught and logged in SCOPE-LEDGER.
12. Approver asks `@scope what have we agreed so far?` and gets the ledger summary.

## Onboarding flow
README steps: install Switch Console + Docker, sign in Claude Code and Codex, connect GitHub in Console, fork the repo, run the template, paste the kickoff check (`!agents-status`).

## Screen-by-screen map
| Screen | What the user sees |
|---|---|
| Switch Console: Templates > Run | Form with team, repository, providers, bridge |
| Mattermost channel `{team}-scoperoom` | Kickoff lines, then threads per request |
| Thread per SCOPE-<id> | Scope, approval, build output, review table, PR link |
| GitHub PR | Scope file, diff, review table |

## Core actions
Request, approve scope, reject scope, request fix, approve PR, ask change.

## Navigation model
One channel, one thread per scope id. Agents always reply in the thread of the request.

## Empty states
- No requests yet: kickoff message tells the client how to ask ("Describe what you need in one message").

## Loading states
- Build and Review say what they're about to do before slow steps ("Running pnpm test, about 30s").
- Switch's own "Starting a session to handle this" is expected, not an error.

## Error states
| Situation | Behavior |
|---|---|
| Tests fail | Build pastes the raw failure, does not summarize it away, and does not ask for review until the lead says so. |
| Review finds out-of-scope change | Review flags it; Build reverts it or Scope opens a new scope. |
| Agent silent | README troubleshooting: check thread, exact alias, `!agents-status`. |
| GitHub grant missing | Template run refused with `connector_not_connected`; README says connect GitHub in Console. |

## Permission-denied states
- Client mentions `@build`: Switch replies "You're not permitted to direct messages to me in this room". Documented as intended.
- Anyone other than the approver posts `approve SCOPE-001`: agents ignore it and say only the approver can approve.

## Edge cases
- Two requests at once: Scope assigns two ids; Build works one at a time (room rule).
- Approval for a scope id that doesn't exist: Scope says so.
- Vague request: Scope asks at most 2 questions before writing the scope.

## Mobile and responsive behavior
Chat apps handle it. Scope and review messages use short tables that fit a phone.
