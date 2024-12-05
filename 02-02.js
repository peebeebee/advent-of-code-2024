import { input } from "./02-00.js";

const { safeReports } = getReportSafetyDampened(readInput(input));

export function getReportSafetyDampened(reports) {
  const { safeReports, unsafeReports } = getReportSafetyStrict(reports);

  // Check the unsafe reports if they are safe when a single number is removed
  // We do this by going over the unsafe reports, and removing one index at a time
  // Clone the array so we don't modify the original array while iterating over it
  for (const unsafeReport of [...unsafeReports]) {
    if (isSafeReportWithProblemDampener(unsafeReport)) {
      safeReports.push(unsafeReport);
      unsafeReports.splice(unsafeReports.indexOf(unsafeReport), 1);
    }
  }

  return { safeReports, unsafeReports };
}

// Create array of array of numbers for each line from input
export function readInput(input) {
  return input.split("\n").map((line) => line.split(/\s+/).map(Number));
}

// Divide reports in safe and unsafe reports
function getReportSafetyStrict(reports) {
  const safeReports = [];
  const unsafeReports = [];
  for (const report of reports) {
    if (isSafeReport(report)) {
      safeReports.push(report);
    } else {
      unsafeReports.push(report);
    }
  }
  return { safeReports, unsafeReports };
}

function isSafeReportWithProblemDampener(report) {
  let reportIsSafe = false;

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];

    if (isSafeReport(modifiedReport)) {
      reportIsSafe = true;
    }
  }

  return reportIsSafe;
}

function isSafeReport(report) {
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
}

console.log(safeReports.length);
