/**
 * Run:
 * deno --allow-read 04-02.ts
 */
const file = await Deno.readTextFile("./04-00");

// Regex to get all mul([0-9\]+) from input, but 0-9 should maximum be 3 digits
export const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

export function findXMAS(str: string) {
  return searchInArray(toArray(str), "MAS");
}

export function toArray(str: string) {
  return str.split("\n").map((x) => x.split(""));
}

export function createPatterns(str: string) {
  const arr0 = [
    [str[0], ".", str[2]],
    [".", str[1], "."],
    [str[0], ".", str[2]],
  ];
  const arr90 = rotate90Degrees(arr0);
  const arr180 = rotate90Degrees(arr90);
  const arr270 = rotate90Degrees(arr180);
  return [arr0, arr90, arr180, arr270];
}

export function rotate90Degrees(arr: string[][]) {
  return arr.map((_, colIndex) => arr.map((row) => row[colIndex]).reverse());
}

export function searchInArray(arr: string[][], str: string) {
  const patterns = createPatterns(str);
  const patternSize = str.length;
  let result = 0;

  for (let line = 0; line <= arr.length - patternSize; line++) {
    for (let col = 0; col <= arr[line].length - patternSize; col++) {
      const isFound = patterns.some((pattern) =>
        findPattern(pattern, arr, line, col)
      );
      if (isFound) {
        // console.log("FOUND...", line, col);
        result++;
      } else {
        // console.log("NOT FOUND...", line, col);
      }
    }
  }

  return result;
}

function findPattern(
  pattern: string[][],
  arr: string[][],
  arrY: number,
  arrX: number
) {
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern.length; x++) {
      if (pattern[y][x] !== "." && arr[arrY + y][arrX + x] !== pattern[y][x]) {
        // console.log(
        //   "NOT FOUND",
        //   arrY + y,
        //   arrX + x,
        //   arr[arrY + y][arrX + x],
        //   pattern[y][x]
        // );
        return false;
      }
    }
  }
  return true;
}

console.log(findXMAS(file));
