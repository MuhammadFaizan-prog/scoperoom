# ScopeRoom room rules

ScopeRoom has two linked rooms. The template writes each room's instructions, so every agent reads them on joining. They're kept here so they can be reviewed in git.

## Client room (`{team}-client`): client + Scope

1. Always name the scope id.
2. Keep it client-safe: no raw logs, no review findings, no internal debate.
3. Only the agency's approver, in the studio room, can approve. A client "approve" is noted and passed on, never acted on.
4. Any ask after a scope is approved gets an in-scope or out-of-scope answer, with hours, before anyone builds it.
5. Reply in the thread of the request.

## Studio room (`{team}-studio`): approver + Scope + Build + Review

1. Always name the scope id. "The new feature" is not an id.
2. Paste real command output, including failures. Never summarise a failing run into a sentence that sounds fine.
3. No code before `approve SCOPE-<id>` from the approver. No pull request before `approve PR SCOPE-<id>` from the approver. Only the holder of the exclusive `approver` role can approve.
4. One scope in build at a time.
5. When something is rejected, say why in one line, so the next person who sees it does not start again from nothing.
6. Reply in the thread of the request you are working on.
7. Scope is the only agent that speaks in the client room.

## SCOPE-LEDGER (studio room document, owned by Scope)

| Scope | Title | Parent | Status | Estimate | Approved by |
|---|---|---|---|---|---|

Totals: approved hours, pending hours, out-of-scope asks caught. The client sees only id, title, status and hours.

## Phrases the agents listen for

| Phrase | Who may say it | Effect |
|---|---|---|
| `approve SCOPE-<id>` | approver | Build starts on `scope/<id>` |
| `reject SCOPE-<id>: <reason>` | approver | Scope restates the reason; nothing is built |
| `approve PR SCOPE-<id>` | approver | Build opens the PR and posts the link |

## Who can address whom

| Agent | addressing | Why |
|---|---|---|
| scope | anyone | Clients must reach it. Worst case is a wasted draft. |
| build | owner-agents | Writes code and pushes branches. A stray client mention must not start a build. |
| review | owner-agents | Only you or Build hand it a branch. |
