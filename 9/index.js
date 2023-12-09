const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) => line.split(" ").map((el) => Number(el)));

function findDiffArray(array) {
  const diffArr = [];
  for (let i = 0; i < array.length - 1; i++) {
    diffArr.push(array[i + 1] - array[i]);
  }
  if (new Set(diffArr).size === 1) {
    array.push(array[array.length - 1] + diffArr[0]);
    array.unshift(array[0] - diffArr[0]);
  } else {
    const deepDiff = findDiffArray(diffArr);
    array.push(array[array.length - 1] + deepDiff[deepDiff.length - 1]);
    array.unshift(array[0] - deepDiff[0]);
  }
  return array;
}

function part1(input) {
  const res = {
    firstArr: [],
    lastArr: [],
  };
  input.forEach((element, i) => {
    const diffArr = findDiffArray(element);
    res.lastArr.push(diffArr[diffArr.length - 1]);
    res.firstArr.push(diffArr[0]);
  });

  return {
    lastSum: res.lastArr.reduce((acc, el) => acc + el, 0),
    firstSum: res.firstArr.reduce((acc, el) => acc + el, 0),
  };
}

console.log("Res: ", part1(fileInput));
