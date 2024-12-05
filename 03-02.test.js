/**
 * Run:
 * deno test --watch --allow-read 03-02.test.js
 */

import { assertEquals } from "jsr:@std/assert";
import { mulRegex, dontRegex, doRegex, calculateResult } from "./03-02.js";

const testInput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

Deno.test("isCorrectMulRegex", () => {
  const match = testInput.match(mulRegex);
  assertEquals(match[0], "mul(2,4)");
  assertEquals(match[1], "2");
  assertEquals(match[2], "4");
});

Deno.test("isCorrectDoRegex", () => {
  const match = testInput.match(doRegex);
  assertEquals(match[0], "do()");
});

Deno.test("isCorrectDontRegex", () => {
  const match = testInput.match(dontRegex);
  assertEquals(match[0], "don't()");
});

Deno.test("correctResult", () => {
  const result = calculateResult(testInput);
  assertEquals(result, 48);
});
