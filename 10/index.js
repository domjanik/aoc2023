const fs = require("fs");
const fileInput = fs
  .readFileSync("input2.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) => line.split("").map((val) => ({ val, distance: null })));

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

function goToNextFields(input, [y, x], distance) {
  const availableRoutes = findAvailableRoutes(input, y, x).filter(
    (route) => input[route[0]][route[1]].distance === null
  );

  if (!availableRoutes) {
    console.log("No more available logs at " + distance);
  }

  console.log(
    "At " +
      y +
      " " +
      x +
      " ( " +
      distance +
      " ) there are " +
      availableRoutes.length +
      " available routes."
  );

  availableRoutes.forEach((route) => {
    const [y, x] = route;
    input[y][x].distance = distance + 1;
    goToNextFields(input, route, distance + 1);
  });
}

function part1(input) {
  const start = findStart(input);
  input[start[0]][start[1]].distance = 0;
  goToNextFields(input, start, 0);
  console.table(input.map((row) => row.map((val) => val.distance)));
  console.log(
    Math.max(
      ...input
        .map((row) => row.map((val) => val.distance))
        .flat()
        .filter((val) => val != null)
    )
  );
}

function part2(input) {}

// 7102
// 358

console.log("Part 1: " + part1(fileInput));
console.log("Part 2: " + part2(fileInput));
