import { input } from "./01-00.js";

// Create 2 lists from the input
const [list1, list2] = input
  .split("\n")
  .map((line) => line.trim())
  .reduce(
    (acc, line) => {
      const [num1, num2] = line.split(/\s+/);
      acc[0].push(Number(num1));
      acc[1].push(Number(num2));
      return acc;
    },
    [[], []]
  );

// Sort the lists in ascending order
const asc = (val1, val2) => val1 - val2;
list1.sort(asc);
list2.sort(asc);

// Create list that stores the difference between the two lists
const diffList = list1.map((_num, index) =>
  Math.abs(list1[index] - list2[index])
);

// Add all the differences together
const result = diffList.reduce((acc, num) => acc + num, 0);

console.log(result);

export { list1, list2, result };
