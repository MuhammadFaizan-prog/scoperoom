# ScopeRoom room rules

The template attaches these as the room's instructions and a ROOM-RULES document, so every agent reads them on joining. Kept here so they are reviewable in git.

1. Always name the scope id. "The new feature" is not an id.
2. Paste real command output, including failures. Never summarise a failing run into a sentence that sounds fine.
3. No code before `approve SCOPE-<id>` from the approver. No pull request before `approve PR SCOPE-<id>` from the approver. Only the holder of the exclusive `approver` role can approve.
4. One scope in build at a time.
5. When something is rejected, say why in one line, so the next person who sees it does not start again from nothing.
6. Reply in the thread of the request you are working on.

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
