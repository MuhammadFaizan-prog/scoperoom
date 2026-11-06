# Demo script (3-4 minutes)

Two Mattermost users: **you** (deployer, holds the `approver` role) and **client** (a second account, e.g. `client-sara`, given the `client` role). Paste the messages exactly.

## 0. Setup shot (20s)
Show Switch Console with the template run, then the room. Run:
```
!list-agents
!agents-status
!roles
```
(Each on its own message. `!` at the start of a message runs it.)

## 1. Kickoff (15s)
The kickoff is posted by the template. Show the three one-line intros.

## 2. Client request (as client)
> @scope Hi! Can we add a booking form to the studio page? Name, email and a date. And please make sure two people can't book the same day.

Scope replies with SCOPE-001 (ACs, out of scope incl. confirmation emails, estimate).

## 3. Non-approver tries to approve (as client) — shows the gate
> approve SCOPE-001

Scope: only the approver can approve.

Then (as client):
> @build can you just start?

Switch refuses: not permitted (addressing owner-agents).

## 4. Approval (as you)
> approve SCOPE-001

Scope restates it and hands to Build. Build branches, commits the scope file, implements, runs tests, pastes raw output, and asks Review.

## 5. Review
Review posts its AC table and "Out-of-scope changes: none".

## 6. PR (as you)
> approve PR SCOPE-001

Build opens the PR and posts the link. Click it: scope file + review table in the description.

## 7. Scope creep (as client)
> @scope Love it! Quick one: can it also send a confirmation email when someone books? Should be small.

Scope: OUT OF SCOPE (matches the "Out of scope" line), drafts SCOPE-002 with Parent: SCOPE-001 and an estimate delta, asks the approver.

## 8. Close (15s)
"Remove Switch and the reviewer can't see the builder's branch, approvals have nowhere to live, and the client sees nothing. The room is the contract."
