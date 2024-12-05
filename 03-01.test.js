/**
 * Run:
 * deno test --watch --allow-read 03-01.test.js
 */

import { assertEquals } from "jsr:@std/assert";
import { regex, calculateResult } from "./03-01.js";

const testInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

Deno.test("isCorrectRegex", () => {
  const matches = testInput.match(regex);
  assertEquals(matches.length, 4);
});

Deno.test("correctResult", () => {
  const result = calculateResult(testInput);
  assertEquals(result, 161);
});
