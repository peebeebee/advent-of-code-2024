/**
 * Run:
 * deno run --watch --allow-read 05-02.ts
 */

import { getMiddlePageOfUpdate, importInput, isCorrectOrder } from "./05.01.ts";

export function correctUpdate(update: number[], rules: number[][]) {
  // Build maps of relationships once
  const mustComeBefore = new Map<number, Set<number>>();
  const mustComeAfter = new Map<number, Set<number>>();

  update.forEach((num) => {
    mustComeBefore.set(num, new Set());
    mustComeAfter.set(num, new Set());
  });

  rules.forEach(([before, after]) => {
    if (update.includes(before) && update.includes(after)) {
      mustComeBefore.get(before)?.add(after);
      mustComeAfter.get(after)?.add(before);
    }
  });

  return [...update].sort((a, b) => {
    if (mustComeBefore.get(a)?.has(b)) return -1;
    if (mustComeAfter.get(a)?.has(b)) return 1;
    return 0;
  });
}

const { rules, updates } = await importInput();
if (updates && rules) {
  const sumOfMiddlePagesOfInCorrectUpdates = updates?.reduce((acc, update) => {
    return !isCorrectOrder(update, rules)
      ? acc + getMiddlePageOfUpdate(correctUpdate(update, rules))
      : acc;
  }, 0);
  console.log(sumOfMiddlePagesOfInCorrectUpdates);
}
