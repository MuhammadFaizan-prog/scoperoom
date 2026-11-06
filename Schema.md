# Schema: ScopeRoom

No database. State lives in three places.

## 1. Switch room (managed by Switch)
- History: all messages and threads (the decision log).
- Room instructions: conventions every agent reads on joining.
- Approver: `{$creator}` (the deployer). Roles: `builder`, `reviewer` (both exclusive: true; roles are agent hats in Switch).
- Aliases: `{team}-scope` -> scope, `{team}-build` -> build, `{team}-review` -> review.
- Documents: `ROOM-RULES.md`.

## 2. Scope files (git, in the demo repo)
Path: `scope/SCOPE-<id>.md`, written by Scope in chat, committed by Build on `scope/<id>` after approval.

| Field | Type | Rule |
|---|---|---|
| id | `SCOPE-\d{3}` | Sequential, never reused |
| title | string | max 80 chars |
| requested_by | chat username | |
| summary | text | 2-4 sentences |
| acceptance_criteria | list (AC-1..AC-n) | at least 3, each testable |
| out_of_scope | list | at least 1 |
| estimate_hours | number | >0 |
| risks | list | may be empty |
| status | enum | draft, approved, rejected, built, reviewed, pr_open, superseded |
| approved_by / approved_at | username / ISO time | set from the room message |
| parent | scope id or none | for change requests |

## 3. Demo app data
`demo-app/` keeps bookings in memory (array in a server module) for the demo. Fields: id, name, email, date (YYYY-MM-DD), createdAt. Validation: email format, date not in the past, no two bookings on the same date (the "double booking" AC).

## Relationships
SCOPE-002 `parent: SCOPE-001` for change requests. A PR maps 1:1 to a scope id via branch name `scope/<id>`.

## Indexes
Not applicable. Search the room by scope id.

## Migration notes
None.

## Retention and deletion
Scope files live as long as the repo. Room history follows the Switch server's retention; deleting the room deletes the history (README warns).

## Seed data
- demo-app ships with 2 seeded bookings and a passing test suite.
- `demo/script.md` holds the exact client messages for the recording.

## Open questions
- Whether Switch room "tasks"/"decisions" features can store approvals natively instead of plain messages (check docs during build; use them if they exist).
