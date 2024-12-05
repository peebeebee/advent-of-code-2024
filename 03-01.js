/**
 * Run:
 * deno --allow-read 03-01.js
 */

const file = await Deno.readTextFile("./03-00");

// Regex to get all mul([0-9\]+) from input, but 0-9 should maximum be 3 digits
export const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

export function calculateResult(str) {
  let result = 0;
  let match;
  while ((match = regex.exec(str)) !== null) {
    result = result + match[1] * match[2];
  }
  return result;
}

console.log(calculateResult(file));
