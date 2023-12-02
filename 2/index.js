const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) => {
    const splittedLine = line.split(":");
    return {
      gameId: Number(splittedLine[0].replace("Game ", "")),
      results: splittedLine[1].split(";").map((result) => {
        const splittedResult = result.trim().split(" ");
        const parsedResults = [];
        for (let i = 0; i < splittedResult.length; i += 2) {
          parsedResults.push({
            color: splittedResult[i + 1].replace(",", ""),
            amount: Number(splittedResult[i]),
          });
        }

        return parsedResults;
      }),
    };
  });

const desiredAmounts = {
  blue: 14,
  green: 13,
  red: 12,
};

function part1(fileInput) {
  return fileInput
    .filter((game) => {
      let validGame = true;
      game.results.forEach((result) => {
        result.forEach((color) => {
          if (color.amount > desiredAmounts[color.color]) {
            validGame = false;
          }
        });
      });
      return validGame;
    })
    .reduce((acc, cur) => {
      return (acc += cur.gameId);
    }, 0);
}

function part2(fileInput) {
  return fileInput
    .map((game) => {
      let smallestColors = {};
      game.results.forEach((result) => {
        result.forEach((color) => {
          if (!smallestColors[color.color]) {
            smallestColors[color.color] = color.amount;
          } else if (color.amount > smallestColors[color.color]) {
            smallestColors[color.color] = color.amount;
          }
        });
      });
      return smallestColors.red * smallestColors.green * smallestColors.blue;
    })
    .reduce((acc, cur) => {
      return (acc += cur);
    }, 0);
}

const part1result = part1(fileInput);
const part2result = part2(fileInput);
console.log("p1:", part1result);
console.log("p2:", part2result);
