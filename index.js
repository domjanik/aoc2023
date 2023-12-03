const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) => line.split(""));

function getWholeNumber(x, y, fileInput) {
  let wholeNumber = "";
  let gotWhole = false;
  do {
    if (!isNaN(Number(fileInput[y][x]))) {
      wholeNumber += fileInput[y][x];
      x++;
    } else {
      gotWhole = true;
    }
  } while (!gotWhole);
  return wholeNumber;
}

function checkAdjecentFields(ix, iy, fileInput, wholeNumber) {
  const startingX = ix - 1;
  const startingY = iy - 1;
  const maxX = startingX + wholeNumber.length + 1;
  const maxY = startingY + 2;
  let isValid = false;

  for (let y = startingY; y <= maxY; y++) {
    if (y < 0 || y >= fileInput.length) continue;
    for (let x = startingX; x <= maxX; x++) {
      if (x < 0 || x >= fileInput[0].length) continue;

      if (fileInput[y][x] !== "." && isNaN(Number(fileInput[y][x]))) {
        isValid = true;
      }
    }
  }

  return isValid;
}

function part1(fileInput) {
  let maxX = fileInput[0].length - 1,
    maxY = fileInput.length - 1;
  const validNumbers = [];
  for (let iy = 0; iy <= maxY; iy++) {
    for (let ix = 0; ix <= maxX; ix++) {
      if (!isNaN(Number(fileInput[iy][ix]))) {
        const wholeNumber = getWholeNumber(ix, iy, fileInput);
        const isValid = checkAdjecentFields(ix, iy, fileInput, wholeNumber);
        if (isValid) {
          ix += wholeNumber.length;
          validNumbers.push(wholeNumber);
        }
      }
    }
  }
  return validNumbers.reduce((a, b) => a + Number(b), 0);
}

function findNumberStart(x, y, fileInput) {
  let startX = x;
  do {
    startX--;
  } while (!isNaN(Number(fileInput[y][startX])));
  return { x: startX + 1, y };
}

function findAdjecentNumbers(ix, iy, fileInput) {
  const numbers = [];
  const startingX = ix - 1;
  const startingY = iy - 1;
  const maxX = startingX + 2;
  const maxY = startingY + 2;
  const addedCoords = [];
  for (let y = startingY; y <= maxY; y++) {
    if (y < 0 || y >= fileInput.length) continue;
    for (let x = startingX; x <= maxX; x++) {
      if (x < 0 || x >= fileInput[0].length) continue;
      if (!isNaN(Number(fileInput[y][x]))) {
        const numberStart = findNumberStart(x, y, fileInput);
        const num = getWholeNumber(numberStart.x, numberStart.y, fileInput);
        if (
          !numbers.includes(num) ||
          (numbers.includes(num) &&
            !addedCoords.includes(numberStart.x + ";" + numberStart.y))
        ) {
          addedCoords.push(numberStart.x + ";" + numberStart.y);
          numbers.push(num);
        }
      }
    }
  }
  return numbers;
}

function part2(fileInput) {
  let maxX = fileInput[0].length - 1,
    maxY = fileInput.length - 1;
  const ratios = [];
  for (let iy = 0; iy <= maxY; iy++) {
    for (let ix = 0; ix <= maxX; ix++) {
      if (fileInput[iy][ix] === "*") {
        const adjecentNumbers = findAdjecentNumbers(ix, iy, fileInput);

        if (adjecentNumbers.length === 2) {
          ratios.push(adjecentNumbers.reduce((a, b) => a * Number(b), 1));
        }
      }
    }
  }
  return ratios.reduce((a, b) => a + b, 0);
}

console.log("Part 1: ", part1(input));
console.log("Part 2: ", part2(input));
