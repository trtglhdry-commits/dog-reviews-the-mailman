import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Dog Reviews the Mailman — one funny one-line review a dog gives the mailman.
// Deterministic fixed string; the program writes exactly this line and nothing else.
const LINE =
  "One star: he visits every day at 10, drops the bills in a box I can't open, and runs. I barked at him 214 times — he still owes me one treat per bark.";

// Gate (per RULES.txt): entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and a single line with no trailing newline.
// The line is 150 characters, well inside the gate, and one line by construction.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} is outside the 1-200 character gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.endsWith("\n")) {
  throw new Error("entry must not end with a trailing newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
