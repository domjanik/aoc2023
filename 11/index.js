const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n").map((line) => line.split("")))[0];

function prepareInput(input) {
  let galaxyIndex = 1;
  let galaxyCoords = {};
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

function rowHasGalaxy(input, x, y) {
  let row = input[y];
  if (row.filter((item) => item != ".").length) return true;
  return false;
}

function columnHasGalaxy(input, x, y) {
  let column = [];
  input.forEach((row) => {
    column.push(row[x]);
  });
  if (column.filter((item) => item != ".").length) return true;
  return false;
}

function checkPairDistance(coords1, coords2, input, spaceMultiplier) {
  let [y1, x1] = coords1;
  const [y2, x2] = coords2;
  let distance = 0;
  do {
    if (Math.abs(y1 - y2) < Math.abs(x1 - x2)) {
      if (x1 < x2) {
        x1++;
        if (!columnHasGalaxy(input, x1, y1)) {
          distance += spaceMultiplier;
        } else {
          distance++;
        }
      }
      if (x1 > x2) {
        x1--;
        if (!columnHasGalaxy(input, x1, y1)) {
          distance += spaceMultiplier;
        } else {
          distance++;
        }
      }
    } else {
      if (y1 < y2) {
        y1++;
        if (!rowHasGalaxy(input, x1, y1)) {
          distance += spaceMultiplier;
        } else {
          distance++;
        }
      }
      if (y1 > y2) {
        y1--;
        if (!rowHasGalaxy(input, x1, y1)) {
          distance += spaceMultiplier;
        } else {
          distance++;
        }
      }
    }
  } while (y1 != y2 || x1 != x2);
  return distance;
}

function part1(input, spaceMultiplier) {
  const pairDistances = [];
  const checkedPairs = [];

  for (let i = 1; i < Object.keys(input.galaxyCoords).length; i++) {
    for (let j = i + 1; j < Object.keys(input.galaxyCoords).length + 1; j++) {
      if (checkedPairs.includes(`${i}-${j}`)) continue;
      const distance = checkPairDistance(
        input.galaxyCoords[i],
        input.galaxyCoords[j],
        input.input,
        spaceMultiplier
      );
      pairDistances.push({
        pair: `${i}-${j}`,
        distance,
      });
    }
  }

  return pairDistances.map((pair) => pair.distance).reduce((a, b) => a + b, 0);
}

// console.log("Part 1 : ", part1(prepareInput([...fileInput]), 2));
console.log("Part 2 : ", part1(prepareInput([...fileInput]), 1000000));
