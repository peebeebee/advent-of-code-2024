/**
 * Run:
 * deno --allow-read 04-01.js
 */

const file = await Deno.readTextFile("./04-00");

// Regex to get all mul([0-9\]+) from input, but 0-9 should maximum be 3 digits
export const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

export function findXMAS(str) {
  return searchStringIn2DArray(toArray(str), "XMAS");
}

export function toArray(str) {
  return str.split("\n").map((x) => x.split(""));
}

export function searchStringIn2DArray(arr, str) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ];

  const numRows = arr.length;
  const numCols = arr[0].length;
  const strLen = str.length;

  function isValid(x, y) {
    return x >= 0 && x < numRows && y >= 0 && y < numCols;
  }

  function searchFrom(x, y, dirX, dirY) {
    for (let i = 0; i < strLen; i++) {
      const newX = x + i * dirX;
      const newY = y + i * dirY;
      if (!isValid(newX, newY) || arr[newX][newY] !== str[i]) {
        return false;
      }
    }
    return true;
  }

  let result = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      for (const [dirX, dirY] of directions) {
        if (searchFrom(i, j, dirX, dirY)) {
          result++;
        }
      }
    }
  }

  return result;
}

console.log(findXMAS(file));
