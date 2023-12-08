const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0];

function prepareInput(input) {
  const preparedInput = {
    instructions: input[0].split(""),
    map: {},
  };
  input.forEach((element, i) => {
    if (i < 2) {
      return;
    }
    const parts = element.split(" = ");
    const coords = parts[1].replace("(", "").replace(")", "").split(", ");
    preparedInput.map[parts[0]] = {
      L: coords[0],
      R: coords[1],
    };
  });

  return preparedInput;
}

function part1(input) {
  let steps = 0;
  let arrived = false;

  let currentCoord = "AAA";
  let instructionIndex = 0;
  do {
    const nextStep = input.instructions[instructionIndex];
    const currentCoordObj = input.map[currentCoord];
    const nextCoord = currentCoordObj[nextStep];

    if (nextCoord === "ZZZ") {
      arrived = true;
    } else {
      currentCoord = nextCoord;
      instructionIndex++;
      if (instructionIndex >= input.instructions.length) {
        instructionIndex = 0;
      }
    }
    steps++;
  } while (!arrived);

  return steps;
}

function findRequiredStepsCount(paths) {
  const findCommonDivider = (a, b) => {
    return b == 0 ? a : findCommonDivider(b, a % b);
  };
  const leastCommonMultiple = (a, b) => {
    return (a / findCommonDivider(a, b)) * b;
  };
  const allLeastCommonMultiples = (arr) => arr.reduce(leastCommonMultiple, 1);
  return allLeastCommonMultiples(paths.map((path) => path.stepsToComplete));
}

function part2(input) {
  let steps = 0;
  let arrived = false;

  let instructionIndex = 0;
  const pathStarts = Object.keys(input.map).filter(
    (el) => el.lastIndexOf("A") === 2
  );

  const paths = pathStarts.map((pathStart) => {
    return {
      start: pathStart,
      currentCoord: pathStart,
      stepsToComplete: null,
    };
  });
  let pathsArrived = 0;

  do {
    paths.forEach((path, index) => {
      const nextStep = input.instructions[instructionIndex];
      const currentCoordObj = input.map[path.currentCoord];
      const nextCoord = currentCoordObj[nextStep];
      path.currentCoord = nextCoord;
      if (nextCoord.lastIndexOf("Z") === 2) {
        pathsArrived++;
        path.stepsToComplete = steps + 1;
      }
    });

    if (pathsArrived === paths.length) {
      arrived = true;
    } else {
      instructionIndex++;
      if (instructionIndex >= input.instructions.length) {
        instructionIndex = 0;
      }
    }
    steps++;
  } while (!arrived);
  return findRequiredStepsCount(paths);
}

console.log("Part 1: " + part1(prepareInput(fileInput)));
console.log("Part 2: " + part2(prepareInput(fileInput)));
