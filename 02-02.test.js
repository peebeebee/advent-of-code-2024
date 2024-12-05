import { assertEquals } from "jsr:@std/assert";
import { getReportSafetyDampened } from "./02-02.js";

Deno.test("isSafeReport", () => {
  const input = [
    [0, 1, 2, 3, 4],
    [0, 2, 3, 6, 7],
    [7, 6, 5, 3, 1],
    [24, 25, 28, 31, 28],
    [41, 44, 45, 48, 49, 50, 50],
    [1, 1, 2, 3, 4],
    [2, 5, 4, 3, 2],
    [10, 100, 20, 40],
  ];

  const { safeReports } = getReportSafetyDampened(input);

  assertEquals(safeReports, [
    [0, 1, 2, 3, 4],
    [0, 2, 3, 6, 7],
    [7, 6, 5, 3, 1],
    [24, 25, 28, 31, 28],
    [41, 44, 45, 48, 49, 50, 50],
    [1, 1, 2, 3, 4],
    [2, 5, 4, 3, 2],
  ]);
});
