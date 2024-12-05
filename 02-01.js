import { input } from "./02-00.js";

// Create array of array of numbers for each line from input
export const reports = input
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number));

const safeReports = reports.map((report) => {
  let allAscending = true;
  let allDescending = true;
  let allInRange = true;

  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] < report[i + 1]) {
      allAscending = false;
    }
    if (report[i] > report[i + 1]) {
      allDescending = false;
    }
    if (
      Math.abs(report[i] - report[i + 1]) < 1 ||
      Math.abs(report[i] - report[i + 1]) > 3
    ) {
      allInRange = false;
    }
  }

  const isSafe = (allAscending || allDescending) && allInRange;

  return isSafe;
});

console.log(safeReports);
console.log(safeReports.filter(Boolean).length);
