/**
 * Run:
 * deno --allow-read 03-02.js
 */

const file = await Deno.readTextFile("./03-00");

// Regex to get all mul([0-9\]+) from input, but 0-9 should maximum be 3 digits
export const mulRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/;
export const doRegex = /do\(\)/;
export const dontRegex = /don\'t\(\)/;

export function calculateResult(str, enabled = true) {
  const mulMatch = str.match(mulRegex);
  const doMatch = str.match(doRegex);
  const dontMatch = str.match(dontRegex);

  if (dontMatch?.index < mulMatch?.index) {
    return calculateResult(
      str.slice(dontMatch.index + dontMatch[0].length),
      false
    );
  } else if (doMatch?.index < mulMatch?.index) {
    return calculateResult(str.slice(doMatch.index + doMatch[0].length), true);
  } else if (mulMatch) {
    return (
      calculateResult(str.slice(mulMatch.index + mulMatch[0].length), enabled) +
      (enabled ? mulMatch[1] * mulMatch[2] : 0)
    );
  } else {
    return 0;
  }
}

console.log(calculateResult(file));
