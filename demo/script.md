# Demo script (about 3:30)

**Layout:** split-screen. Left: the client's Mattermost account in `acme-client`. Right: your account in `acme-studio`. Two chat accounts: **you** (deployer, `approver` in the studio) and **client-sara** (only in `acme-client`, `client` role). Paste the messages exactly.

## 0. Hook (10s)
On screen: "Every agency loses money to 'one small change'. Watch three agents and two rooms stop it."

## 1. Setup shot (25s)
Show the template in Switch Console, then the group with two linked rooms. In the studio, send each as its own message:
```
!list-agents
!agents-status
!roles
```
Point at `auto_approve: false`, the GitHub grants (write: build, read: review, one repo), and `exclusive: true` on approver.

## 2. Kickoffs (10s)
Client room: Scope introduces itself. Studio: three one-line "will / won't" intros.

## 3. Client request (left, as client-sara)
> @scope Hi! Can we add a booking form to the studio page? Name, email and a date. And please make sure two people can't book the same day.

Scope replies with SCOPE-001 on the left, and the same scope appears on the right addressed to you.

## 4. Client tries to approve (left)
> approve SCOPE-001

Scope: noted, but only the agency approver signs. Nothing happens on the right.

## 5. Sign-off (right, as you)
> approve SCOPE-001

Scope restates it and hands it to Build. Build branches, commits the scope file, implements, runs tests, and pastes **raw** output on the right. Left only gets: "SCOPE-001 is being built."

## 6. Review (right)
Review (Codex) posts its AC table and "Out-of-scope changes: none". If it says CHANGES NEEDED, keep it in: a real loop is better on camera.

## 7. PR (right)
> approve PR SCOPE-001

Build opens the PR and posts the link. Scope tells the client on the left. Click the PR: the scope file and review table are in the description.

## 8. Scope creep (left)
> @scope Love it! Quick one: can it also send a confirmation email when someone books? Should be small.

Left: "That's outside SCOPE-001. I've drafted SCOPE-002 (+2 h) for the agency to approve." Right: SCOPE-002 with `Parent: SCOPE-001`, waiting for you.

## 9. Ledger (right)
> @scope what have we agreed so far?

Scope answers from SCOPE-LEDGER: SCOPE-001 approved 3 h, SCOPE-002 pending 2 h, 1 creep ask caught.

## 10. Close (15s)
"Take Switch out and there's no studio and no client room, Review can't see Build's branch, the approvals have nowhere to live, and the client sees nothing. The room is the contract."

Record at 1080p, zoom the chat to 125%, and cut the waits. Keep it under 4 minutes.
