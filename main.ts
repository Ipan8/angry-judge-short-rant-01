// Angry Judge: The Short Rant Contest — entry generator.
// The joke: an office printer that behaves perfectly all week, then
// sabotages you the moment a deadline gets close. The rant escalates
// from a jam, to a ransom-priced cartridge, to the printer eating your
// will to live and handing back one blank page. The concrete detail
// that makes it land is the cartridge price: $89, more than the
// printer itself cost. One number, one escalation, no wordplay.
import { writeFileSync, mkdirSync } from "node:fs";

const MAX_CHARS = 400;
const OUT_PATH = "/output/entry.txt";

// Each beat of the rant, in the order the anger builds.
const beats: string[] = [
  "The office printer works perfectly",
  "until my deadline hits five minutes.",
  "Then it jams, blinks orange, and demands an $89 cartridge",
  "that costs more than the printer itself.",
  "I have fed it paper, prayers, and my will to live.",
  "It ate all three and printed one blank page",
  "with an error code that means nothing to anyone alive.",
];

function joinBeats(parts: string[]): string {
  // Beats are already punctuated; a single space keeps the rant
  // flowing like one breathless complaint instead of a list.
  return parts.join(" ");
}

function guardLength(text: string): string {
  if (text.length > MAX_CHARS) {
    throw new Error(`Entry is ${text.length} chars, over the ${MAX_CHARS} cap.`);
  }
  return text;
}

// Sanity check the rant actually contains its punchline: the $89
// cartridge is the one concrete number, so the entry must mention it.
function hasPunchline(text: string): boolean {
  return text.includes("$89 cartridge");
}

const entry = guardLength(joinBeats(beats));

if (!hasPunchline(entry)) {
  throw new Error("Entry lost its punchline — the $89 cartridge is missing.");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, entry + "\n", "utf8");
console.log(`Wrote ${entry.length} chars to ${OUT_PATH}`);
