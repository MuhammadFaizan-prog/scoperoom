---
title: "ScopeRoom: how three AI agents and two Switch rooms stop scope creep"
tags: switch, ai, agents, hackathon
---

> Draft for the Flip the Switch **Best Blog** side track. Replace each *[after the run]* note with what actually happened before publishing.

## The 30-second version

Agencies don't lose money on big features. They lose it on *"quick, small"* asks that nobody writes down or prices. I built **ScopeRoom** for the Flip the Switch hackathon: a client room and a studio room on Switch, with three AI agents and one human approver. A request becomes a signed scope, then a branch, then an independent review, then a PR. Every later "small" ask gets checked against what was signed.

Repo: https://github.com/MuhammadFaizan-prog/scoperoom

## Why two rooms

My first design was one room. It worked, but the client could see raw test failures and the reviewer arguing with the builder. That's not how a real agency talks to a client.

Switch lets one template create a **group** of linked rooms. ScopeRoom has two:

- **client**: the client and the Scope agent. Plain language only.
- **studio**: me (approver), Scope, Build and Review. Raw output lives here.

Scope is the only agent in both rooms, so it's the bridge. Each room has its own **room instructions**, and every agent reads them on joining, so Scope behaves differently in each room without a second prompt.

## The three agents

| Agent | Provider | Why it's separate |
|---|---|---|
| scope | Claude Code | Talks to clients, so `addressing: anyone`. No GitHub access at all. |
| build | Claude Code | Writes code, so `addressing: owner-agents` and GitHub **write** on one repo. |
| review | Codex | A different model reviewing, so it isn't the builder grading itself. GitHub **read** only. |

The rule I followed from the Switch team's guide: if two agents could be one, make them one. Review can't be Build, because then there's no second opinion. Scope can't be Build, because clients must be able to talk to Scope and must never be able to start a build.

## The two gates

1. `approve SCOPE-001`: nothing is coded before this.
2. `approve PR SCOPE-001`: no PR opens before this.

Only the approver, the person who ran the template (`{$creator}` in the YAML), can say either. When the client typed "approve SCOPE-001" in the client room, Scope noted it and did nothing. *[after the run: paste what Scope said]*

`auto_approve: false` is set on every agent, so a risky tool call still raises a request in the room.

## The scope-creep catch

After SCOPE-001 shipped, the client asked for a confirmation email. Scope matched it against the signed "Out of scope" list, drafted SCOPE-002 with `Parent: SCOPE-001` and an hour estimate, and asked me to decide. *[after the run: paste the reply]*

Scope also keeps a **SCOPE-LEDGER** room document: every scope, its status, hours, and creep caught. "What did we agree?" now has a one-line answer.

## What tripped me up (for first-time Switch users)

- **Membership isn't a session.** An agent sitting in the room isn't necessarily running. `!agents-status` tells you which.
- **Replies go in threads.** Half my "silent agent" moments were answers in a thread.
- **Name, machine and directory are fixed at creation.** Use a `{team}` prefix param so you can re-run the template cleanly.
- **`!` at the start of a message runs it**, even inside backticks.
- *[after the run: anything else that broke]*

## Reproduce it

Fork the repo, paste `scoperoom.template.yaml` into Switch Console → Templates, set `team` and `repository`, and click Create. Both rooms, all three agents, the exclusive builder and reviewer roles and the kickoffs appear in one run.

## The remove-Switch test

Take Switch out and there's no client/studio split, Review can't see Build's branch, approvals have nowhere to live, and the client sees nothing. That's why I'm confident Switch is load-bearing here, not a notification layer.

*Built by Muhammad Faizan for Flip the Switch (WeMakeDevs × DevTools Academy × Switch). #HowISwitch*
