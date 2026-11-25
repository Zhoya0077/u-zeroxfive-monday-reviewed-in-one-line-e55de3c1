import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "My Monday served 214 unread emails, a 9 a.m. 'quick sync' that ate my lunch, and a standup that stood up my blood pressure — one star, would not recommend.";

// Self-checking gate: the competition requires one line, 1–200 chars, non-blank.
// Throw before writing anything if the entry ever violates the gate.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${entry.length}`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
