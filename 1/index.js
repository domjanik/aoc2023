const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0];

function part1(input) {
  return input
    .map((line) => line.replaceAll(/[a-zA-Z]/g, ""))
    .reduce((acc, cur) => acc + Number(cur[0] + cur[cur.length - 1]), 0);
}

function part2(input) {
  const resultArray = [];
  input.forEach((num) => {
    let inputNum = num;
    let result = "";
    do {
      if (!isNaN(Number(inputNum[0]))) {
        result += inputNum[0];
      } else if (input.indexOf("zero") == 0) {
        result += "0";
      } else if (inputNum.indexOf("one") == 0) {
        result += "1";
      } else if (inputNum.indexOf("two") == 0) {
        result += "2";
      } else if (inputNum.indexOf("three") == 0) {
        result += "3";
      } else if (inputNum.indexOf("four") == 0) {
        result += "4";
      } else if (inputNum.indexOf("five") == 0) {
        result += "5";
      } else if (inputNum.indexOf("six") == 0) {
        result += "6";
      } else if (inputNum.indexOf("seven") == 0) {
        result += "7";
      } else if (inputNum.indexOf("eight") == 0) {
        result += "8";
      } else if (inputNum.indexOf("nine") == 0) {
        result += "9";
      }
      inputNum = inputNum.substring(1);
    } while (inputNum.length);

    resultArray.push(result);
  });
  return resultArray.reduce((acc, cur) => {
    const toAdd = Number(cur[0] + cur[cur.length - 1]);
    return acc + toAdd;
  }, 0);
}

const part1result = part1(fileInput);
const part2result = part2(fileInput);
console.log(part1result);
console.log(part2result);
