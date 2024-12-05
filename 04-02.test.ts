/**
 * Run:
 * deno test --watch --allow-read 04-02.test.js
 */

import { assertEquals } from "jsr:@std/assert";
import {
  toArray,
  createPatterns,
  searchInArray,
  rotate90Degrees,
} from "./04-02.ts";

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

Deno.test("rotate90Degrees", () => {
  const input = [
    ["M", ".", "S"],
    [".", "A", "."],
    ["M", ".", "S"],
  ];
  const result = rotate90Degrees(input);
  assertEquals(result, [
    ["M", ".", "M"],
    [".", "A", "."],
    ["S", ".", "S"],
  ]);
  assertEquals(rotate90Degrees(result), [
    ["S", ".", "M"],
    [".", "A", "."],
    ["S", ".", "M"],
  ]);
});

Deno.test("createPatterns", () => {
  const patterns = createPatterns("MAS");
  assertEquals(patterns, [
    [
      ["M", ".", "S"],
      [".", "A", "."],
      ["M", ".", "S"],
    ],
    [
      ["M", ".", "M"],
      [".", "A", "."],
      ["S", ".", "S"],
    ],
    [
      ["S", ".", "M"],
      [".", "A", "."],
      ["S", ".", "M"],
    ],
    [
      ["S", ".", "S"],
      [".", "A", "."],
      ["M", ".", "M"],
    ],
  ]);
});

Deno.test("searchInArray", () => {
  const result = searchInArray(toArray(testInput), "MAS");
  assertEquals(result, 9);
});
