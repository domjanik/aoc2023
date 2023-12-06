const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) =>
    line
      .replace("Time:", "")
      .replace("Distance:", "")
      .trim()
      .split(" ")
      .filter((el) => el != "")
      .map((el) => Number(el))
  );

function prepareInputP1(input) {
  const races = [];
  for (let i = 0; i < input[0].length; i++) {
    races.push({
      time: input[0][i],
      distance: input[1][i],
    });
  }
  return races;
}

function prepareInputP2(input) {
  const races = [
    {
      distance: Number(input[1].join("")),
      time: Number(input[0].join("")),
    },
  ];
  return races;
}
function part1(input) {
  let possibleTactics = 1;
  input.forEach((element) => {
    let racePossibleTactics = 0;
    for (let i = 0; i <= element.time; i++) {
      const holdingTime = i;
      const remainingTime = element.time - holdingTime;
      const achievedDistance = holdingTime * remainingTime;
      if (achievedDistance > element.distance) {
        racePossibleTactics++;
      }
    }
    possibleTactics *= racePossibleTactics;
  });
  return possibleTactics;
}

console.log("Part 1: " + part1(prepareInputP1(fileInput)));
console.log("Part 2: " + part1(prepareInputP2(fileInput)));
