#!/usr/bin/env node
// Static checks for scoperoom.template.yaml, mirroring the rules in
// Switch's docs/TEMPLATES.md, so a broken template fails CI before anyone
// pastes it into Switch Console. Run: node scripts/validate-template.mjs
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const file = process.argv[2] ?? "scoperoom.template.yaml";
const text = readFileSync(file, "utf8");
const doc = parse(text);
const errors = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => errors.push(msg);

const TYPES = ["string", "number", "boolean", "enum", "agent", "bridge", "room", "user", "provider", "location", "machine", "directory"];
const ADDRESSING = ["owner", "owner-agents", "anyone"];

if (!doc || typeof doc !== "object") fail("document is empty or not a mapping");
if (doc.version !== 1) fail("version must be 1");

// Params
const params = doc.params ?? {};
for (const [name, p] of Object.entries(params)) {
  if (!TYPES.includes(p.type ?? "string")) fail(`param ${name}: unknown type ${p.type}`);
  if (p.input === "fixed" && p.default === undefined) fail(`param ${name}: fixed input needs a default`);
}
ok(`${Object.keys(params).length} params declared`);

// Placeholders: every {name} must be a declared param (builtins start with $; <id> style is ignored)
const used = new Set([...text.matchAll(/\{([a-z_][a-z0-9_]*)\}/g)].map((m) => m[1]));
for (const u of used) if (!(u in params)) fail(`placeholder {${u}} is not a declared param`);
for (const p of Object.keys(params)) if (!used.has(p)) fail(`param ${p} is never used`);
const BUILTINS = ["$creator", "$creator_email", "$date", "$timestamp", "$agents_dir", "agent"];
for (const m of text.matchAll(/\{(\$[a-z_]+)\}/g)) if (!BUILTINS.includes(m[1])) fail(`unknown builtin {${m[1]}}`);
ok("every placeholder is declared, every param is used, builtins are known");

// Agents
const agents = doc.agents ?? (doc.agent ? [doc.agent] : []);
if (agents.length === 0) fail("no agents");
const names = new Set();
for (const a of agents) {
  const id = a.name ?? a.display_name;
  for (const f of ["provider", "directory", "instructions"]) if (!a[f]) fail(`agent ${id}: missing ${f}`);
  if (!a.location && !a.machine) fail(`agent ${id}: needs location or machine`);
  if (a.addressing && !ADDRESSING.includes(a.addressing)) fail(`agent ${id}: bad addressing ${a.addressing}`);
  if (a.auto_approve === true) fail(`agent ${id}: auto_approve (bypass) must stay off`);
  for (const c of a.connections ?? []) {
    if (typeof c === "object" && c.access === "write" && (!c.repos || c.repos.length !== 1))
      fail(`agent ${id}: a write grant must be scoped to exactly one repo`);
  }
  if (names.has(a.name)) fail(`duplicate agent name ${a.name}`);
  names.add(a.name);
}
ok(`${agents.length} agents: provider, location, directory, instructions present; bypass off; write grants scoped`);

// Rooms
const rooms = doc.rooms ?? (doc.room ? [doc.room] : []);
if (rooms.length === 0) fail("no rooms");
if (doc.rooms && doc.kickoff) fail("a group document cannot have a top-level kickoff");
const roomNames = new Set(rooms.map((r) => r.name));
for (const r of rooms) {
  for (const a of r.agents ?? []) if (!names.has(a)) fail(`room ${r.name}: unknown agent ${a}`);
  for (const a of Object.keys(r.aliases ?? {})) if (!(r.agents ?? []).includes(a)) fail(`room ${r.name}: alias for agent not in room ${a}`);
  if (!r.instructions) fail(`room ${r.name}: missing instructions`);
  if (!r.kickoff && doc.rooms) fail(`room ${r.name}: missing kickoff (agents only wake when mentioned)`);
  const exclusive = (r.roles ?? []).filter((x) => x.exclusive);
  if (exclusive.length) ok(`room ${r.name}: exclusive role(s) ${exclusive.map((x) => x.name).join(", ")}`);
}
for (const l of doc.links ?? []) {
  if (!roomNames.has(l.from) || !roomNames.has(l.to)) fail(`link ${l.from} -> ${l.to}: unknown room`);
}
ok(`${rooms.length} room(s), ${(doc.links ?? []).length} link(s)`);

// ScopeRoom-specific invariants
const scope = agents.find((a) => String(a.name).endsWith("-scope"));
const build = agents.find((a) => String(a.name).endsWith("-build"));
const review = agents.find((a) => String(a.name).endsWith("-review"));
if (!scope || !build || !review) fail("expected scope, build and review agents");
else {
  if ((scope.connections ?? []).length) fail("scope must have no GitHub connection");
  if (build.addressing !== "owner-agents") fail("build must be owner-agents");
  if (review.addressing !== "owner-agents") fail("review must be owner-agents");
  if (review.provider === build.provider) fail("review should use a different provider param from build");
  const client = rooms.find((r) => String(r.name).endsWith("-client"));
  if (client && (client.agents ?? []).some((a) => a !== scope.name)) fail("only scope may be in the client room");
  ok("ScopeRoom invariants: scope has no GitHub, build/review gated, separate review provider, client room isolated");
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s) in ${file}:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`\n✓ ${file} is valid`);
