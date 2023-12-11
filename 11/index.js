const fs = require("fs");
const fileInput = fs
  .readFileSync("input-test.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n").map((line) => line.split("")))[0];

function prepareInput(input, spaceMultiplier = 1) {
  let galaxyIndex = 1;
  let galaxyCoords = {};
  let rowsWithoutGalaxy = [];
  let columnsWithoutGalaxy = [];
  input.forEach((row, y) => {
    containsGalaxy = row.includes("#");
    if (!containsGalaxy) rowsWithoutGalaxy.push(y);
  });
  let rowLength = input[0].length;
  const rowToAdd = ".".repeat(rowLength).split("");
  rowsWithoutGalaxy
    .sort((a, b) => b - a)
    .forEach((row) => {
      for (let i = 0; i < spaceMultiplier; i++) {
        input.splice(row, 0, rowToAdd);
      }
    });
  for (let i = 0; i < input.length; i++) {
    let columnContainsGalaxy = false;
    input.forEach((row, y) => {
      if (row[i] == "#") {
        columnContainsGalaxy = true;
      }
    });
    if (!columnContainsGalaxy) {
      columnsWithoutGalaxy.push(i);
    }
  }

  input.forEach((row, y) => {
    columnsWithoutGalaxy
      .sort((a, b) => b - a)
      .forEach((column) => {
        for (let i = 0; i < spaceMultiplier; i++) {
          input[y].splice(column, 0, ".");
        }
      });
  });
  input.forEach((row, y) => {
    row.forEach((element, x) => {
      if (element == "#") {
        input[y][x] = galaxyIndex;
        galaxyCoords[galaxyIndex] = [y, x];
        galaxyIndex++;
        containsGalaxy = true;
      }
    });
  });
  return {
    input,
    galaxyCoords,
  };
}

function checkPairDistance(coords1, coords2, turnOnLogs = false) {
  let [y1, x1] = coords1;
  const [y2, x2] = coords2;
  let distance = 0;
  do {
    if (Math.abs(y1 - y2) < Math.abs(x1 - x2)) {
      if (x1 < x2) {
        distance++;
        x1++;
      }
      if (x1 > x2) {
        x1--;
        distance++;
      }
    } else {
      if (y1 < y2) {
        y1++;
        distance++;
      }
      if (y1 > y2) {
        y1--;
        distance++;
      }
    }
  } while (y1 != y2 || x1 != x2);
  return distance;
}

function part1(input) {
  const pairDistances = [];
  const checkedPairs = [];

  for (let i = 1; i < Object.keys(input.galaxyCoords).length; i++) {
    for (let j = i + 1; j < Object.keys(input.galaxyCoords).length + 1; j++) {
      if (checkedPairs.includes(`${i}-${j}`)) continue;
      const distance = checkPairDistance(
        input.galaxyCoords[i],
        input.galaxyCoords[j],
        i === 8 && j === 9
      );
      pairDistances.push({
        pair: `${i}-${j}`,
        distance,
      });
    }
  }

  return pairDistances.map((pair) => pair.distance).reduce((a, b) => a + b, 0);
}

// console.log("Part 1 : ", part1(prepareInput(fileInput, 1)));
console.log("Part 2 : ", part1(prepareInput(fileInput, 10)));
