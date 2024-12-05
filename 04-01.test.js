/**
 * Run:
 * deno test --watch --allow-read 04-01.test.js
 */

import { assertEquals } from "jsr:@std/assert";
import { findXMAS, toArray, searchStringIn2DArray } from "./04-01.js";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("toArray", () => {
  const result = toArray(`ABC
DEF
GHI`);
  assertEquals(result, [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"],
  ]);
});

Deno.test("findXMas", () => {
  const matches = searchStringIn2DArray(toArray(testInput), "XMAS");
  assertEquals(matches, 18);
});
