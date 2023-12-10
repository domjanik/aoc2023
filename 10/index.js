const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) =>
    line.split("").map((val) => ({
      val,
      distance: null,
      previousStep: null,
      visited: false,
    }))
  );

function getEnters(input, y, x) {
  try {
    switch (input[y][x].val) {
      case "|":
        return [
          [y - 1, x],
          [y + 1, x],
        ];
      case "-":
        return [
          [y, x - 1],
          [y, x + 1],
        ];
      case "L":
        return [
          [y - 1, x],
          [y, x + 1],
        ];
      case "J":
        return [
          [y - 1, x],
          [y, x - 1],
        ];
      case "F":
        return [
          [y + 1, x],
          [y, x + 1],
        ];
      case "7":
        return [
          [y + 1, x],
          [y, x + -1],
        ];
      case ".":
        return [];
      case "S":
        return [
          [y - 1, x],
          [y + 1, x],
          [y, x - 1],
          [y, x + 1],
        ];
    }
  } catch (e) {
    return [];
  }
}

function findStart(input) {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].val === "S") {
        return [y, x];
      }
    }
  }
}

function findAvailableRoutes(input, y, x) {
  const enters = getEnters(input, y, x);
  if (!enters) return [];
  const availableRoutes = [];
  for (let i = 0; i < enters.length; i++) {
    const [tY, tX] = enters[i];
    const targetEnters = getEnters(input, tY, tX);

    if (
      targetEnters.filter(
        (enter) =>
          enter[0] === y && enter[1] === x && input[0][1].distance == null
      ).length
    ) {
      availableRoutes.push([tY, tX]);
    }
  }
  return availableRoutes;
}

function goToNextFields(input, start, distance) {
  let currentSteps = [start];
  do {
    const nextSteps = [];
    distance++;
    currentSteps.forEach((step) => {
      const [y, x] = step;
      const availableRoutes = findAvailableRoutes(input, y, x).filter(
        (route) => input[route[0]][route[1]].distance === null
      );
      availableRoutes.forEach((route) => {
        const [y, x] = route;
        input[y][x].distance = distance;
        input[y][x].previousStep = [step[0], step[1]];
        nextSteps.push(route);
      });
    });
    currentSteps = nextSteps;
  } while (currentSteps.length > 0);
}

function part1(input) {
  const start = findStart(input);
  input[start[0]][start[1]].distance = 0;
  goToNextFields(input, start, 0);
  return input;
}

function part2(fileInput) {
  const substringsToCount = ["\\|", "L7", "FJ", "S"];
  const pattern = new RegExp(substringsToCount.join("|"), "g");
  function countSubstrings(inputString) {
    const matches = inputString.match(pattern);
    // console.log("Matches : " + matches + " in " + inputString);
    return matches ? matches.length : 0;
  }
  let part2 = 0;

  fileInput.forEach((row) => {
    let rowM = "";
    row.forEach((element) => {
      let poly = element.distance != null;
      if (poly) {
        if (element.val != "-") {
          rowM += element.val;
        }
      }
      if (!rowM.length) {
        return;
      } else {
        const substrings = countSubstrings(rowM);
        if (!poly && substrings & 1) {
          part2++;
        } else {
          if (substrings & 1) {
            // console.log("Is not in lab", substrings & 1, rowM, element);
          }
        }
      }
    });
  });
  return part2;
}

const farestDistance = Math.max(
  ...part1(fileInput)
    .map((row) => row.map((val) => val.distance))
    .flat()
    .filter((val) => val != null)
);

console.log("Part 1: " + farestDistance);

console.log("Part 2", part2(fileInput));
