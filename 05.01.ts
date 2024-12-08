/**
 * Run:
 * deno run --watch --allow-read 05-01.ts
 */

async function importInput() {
  const input = await Deno.readTextFile("05.00.input");

  const regexNumberPipeNumber = /[0-9].*\|[0-9].*/g;
  const rules = input
    .match(regexNumberPipeNumber)
    ?.map((rule) => rule.split("|").map(Number));

  const regexNumberCommaNumber = /^(\d+(?:,\d+)*)$/gm;
  const updates = input
    .match(regexNumberCommaNumber)
    ?.map((update) => update.split(",").map(Number));

  return { rules, updates };
}

export function run(updates: number[][], rules: number[][]) {
  const sumOfMiddlePagesOfCorrectUpdates = updates.reduce((acc, update) => {
    return isCorrectOrder(update, rules)
      ? acc + getMiddlePageOfUpdate(update)
      : acc;
  }, 0);
  return sumOfMiddlePagesOfCorrectUpdates;
}

export function getMiddlePageOfUpdate(update: number[]) {
  return update[Math.floor(update.length / 2)];
}

export function isCorrectOrder(update: number[], rules: number[][]) {
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

const { rules, updates } = await importInput();
if (updates && rules) {
  const x = run(updates, rules);
  console.log(x);
}
