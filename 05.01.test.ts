/**
 * Run:
 * deno test --watch --allow-read 05-01.ts
 */

import { assertEquals } from "jsr:@std/assert";

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

const updates = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47],
];

function run() {
  const sumOfMiddlePagesOfCorrectUpdates = updates.reduce((acc, update) => {
    return isCorrectOrder(update, rules)
      ? acc + getMiddlePageOfUpdate(update)
      : acc;
  }, 0);
  return sumOfMiddlePagesOfCorrectUpdates;
}

function getMiddlePageOfUpdate(update: number[]) {
  return update[Math.floor(update.length / 2)];
}

function isCorrectOrder(update: number[], rules: number[][]) {
  for (let i = 0; i < update.length; i++) {
    const result = checkPage(i, update, rules);

    if (!result) {
      return false;
    }
  }
  return true;
}

function checkPage(index: number, update: number[], rules: number[][]) {
  const currentPage = update[index];

  const pagesBeforeCurrentPage = update.slice(0, index);
  const pagesAfterCurrentPage = update.slice(index + 1);

  const pagesThatNeedToBeBeforeCurrentPage = rules.reduce((acc, rule) => {
    return rule[1] === currentPage ? [...acc, rule[0]] : acc;
  }, []);

  const pagesThatNeedToBeAfterCurrentPage = rules.reduce((acc, rule) => {
    return rule[0] === currentPage ? [...acc, rule[1]] : acc;
  }, []);

  for (const pageAfter of pagesAfterCurrentPage) {
    if (pagesThatNeedToBeBeforeCurrentPage.includes(pageAfter)) {
      return false;
    }
  }

  for (const pageBefore of pagesBeforeCurrentPage) {
    if (pagesThatNeedToBeAfterCurrentPage.includes(pageBefore)) {
      return false;
    }
  }

  return true;
}

Deno.test("OrderCheck 1", () => {
  assertEquals(isCorrectOrder(updates[0], rules), true);
});

Deno.test("OrderCheck 2", () => {
  assertEquals(isCorrectOrder(updates[1], rules), true);
});

Deno.test("OrderCheck 3", () => {
  assertEquals(isCorrectOrder(updates[2], rules), true);
});

Deno.test("OrderCheck 4", () => {
  assertEquals(isCorrectOrder(updates[3], rules), false);
});

Deno.test("OrderCheck 5", () => {
  assertEquals(isCorrectOrder(updates[4], rules), false);
});

Deno.test("OrderCheck 6", () => {
  assertEquals(isCorrectOrder(updates[5], rules), false);
});

Deno.test("getMiddlePageOfUpdate 1", () => {
  assertEquals(getMiddlePageOfUpdate([75, 47, 61, 53, 29]), 61);
});

Deno.test("getMiddlePageOfUpdate 2", () => {
  assertEquals(getMiddlePageOfUpdate([97, 61, 53, 29, 13]), 53);
});

Deno.test("getMiddlePageOfUpdate 2", () => {
  assertEquals(getMiddlePageOfUpdate([75, 29, 13]), 29);
});

Deno.test("run", () => {
  assertEquals(run(), 143);
});
