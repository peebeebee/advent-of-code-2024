import { list1, list2 } from "./01-01.js";

const list2FreqMap = list2.reduce((map, num) => {
  map.set(num, (map.get(num) || 0) + 1);
  return map;
}, new Map());

const result = list1.reduce((acc, num) => {
  return acc + num * (list2FreqMap.get(num) ?? 0);
}, 0);

console.log(result);
