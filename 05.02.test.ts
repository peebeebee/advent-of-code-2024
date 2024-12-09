const rules = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

import { assertEquals } from "jsr:@std/assert/equals";
import { correctUpdate } from "./05.02.ts";

Deno.test("correctUpdate", () => {
  assertEquals(
    correctUpdate([75, 97, 47, 61, 53], rules),
    [97, 75, 47, 61, 53]
  );
});

Deno.test("correctUpdate", () => {
  assertEquals(correctUpdate([61, 13, 29], rules), [61, 29, 13]);
});

Deno.test("correctUpdate", () => {
  assertEquals(
    correctUpdate([97, 13, 75, 29, 47], rules),
    [97, 75, 47, 29, 13]
  );
});
