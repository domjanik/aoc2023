const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) => line.split(":")[1])
  .map((line) => {
    const scratchCard = line.split("|").map((line) =>
      line
        .trim()
        .split(" ")
        .map((num) => Number(num))
    );
    return {
      winningNumbers: scratchCard[0],
      numbers: scratchCard[1],
      instances: 1,
    };
  });

function bumpInstancesCount(
  foundNumbers,
  instances,
  startingIndex,
  scratchCards
) {
  for (let i = 1; i <= foundNumbers.length; i++) {
    scratchCards[startingIndex + i].instances += instances;
  }
}

function part1(fileInput) {
  const scratchCards = fileInput;
  const winningNumbers = scratchCards.map((card, i) => {
    const foundNumbers = card.winningNumbers
      .filter((num) => {
        return card.numbers.includes(num);
      })
      .filter((num) => num);
    if (foundNumbers.length === 0) return 0;
    bumpInstancesCount(foundNumbers, card.instances, i, scratchCards);
    return Math.pow(2, foundNumbers.length - 1);
  });
  return {
    points: winningNumbers.reduce((acc, cur) => {
      return acc + cur;
    }, 0),
    cards: scratchCards.reduce((acc, curr) => acc + curr.instances, 0),
  };
}
console.log("res: " + JSON.stringify(part1(input)));
