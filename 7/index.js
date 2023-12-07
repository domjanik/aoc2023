const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0]
  .map((line) => {
    const splittedLine = line.split(" ");
    const cards = splittedLine[0].split("");
    return {
      bid: splittedLine[1],
      cards,
      sequenceStrength: null,
      rank: null,
    };
  });

const cardStrength = {
  T: 10,
  // J: 11, // P1
  J: 1, // P2
  Q: 12,
  K: 13,
  A: 14,
};

const getCardStrength = (card) => {
  return cardStrength[card] || parseInt(card);
};

const findSequenceStrength = (cards) => {
  const uniqueCards = [];
  cards.forEach((card) => {
    if (!uniqueCards.includes(card)) {
      uniqueCards.push(card);
    }
  });

  switch (true) {
    case uniqueCards.length === 5: // High Card
      return 1;
    case uniqueCards.length === 4: // Pair
      return 2;
    case uniqueCards.length === 3: {
      // Two Pair or Three of a Kind
      const firstCard = {
        card: uniqueCards[0],
        count: 0,
      };
      const secondCard = {
        card: uniqueCards[1],
        count: 0,
      };
      const thirdCard = {
        card: uniqueCards[2],
        count: 0,
      };
      cards.forEach((card) => {
        if (card === firstCard.card) {
          firstCard.count++;
        } else if (card === secondCard.card) {
          secondCard.count++;
        } else if (card === thirdCard.card) {
          thirdCard.count++;
        }
      });
      if (
        firstCard.count === 3 ||
        secondCard.count === 3 ||
        thirdCard.count === 3
      ) {
        return 4;
      } else {
        return 3;
      }
    }
    case uniqueCards.length === 2: {
      // Full House or Four of a Kind
      const firstCard = {
        card: uniqueCards[0],
        count: 0,
      };
      const secondCard = {
        card: uniqueCards[1],
        count: 0,
      };
      cards.forEach((card) => {
        if (card === firstCard.card) {
          firstCard.count++;
        } else if (card === secondCard.card) {
          secondCard.count++;
        }
      });
      if (firstCard.count === 4 || secondCard.count === 4) {
        return 6;
      } else {
        return 5;
      }
    }
    case uniqueCards.length === 1: // Five of a Kind
      return 7;
  }
};

const sequenceMapping = {
  1: "High Card",
  2: "Pair",
  3: "Two Pair",
  4: "Three of a Kind",
  5: "Full House",
  6: "Four of a Kind",
  7: "Five of a Kind",
};

const findSequenceStrengthP2 = (cards) => {
  const jokerCount = cards.filter((card) => card === "J").length;
  if (jokerCount === 0) {
    return findSequenceStrength(cards);
  }
  const uniqueCards = [];
  cards.forEach((card) => {
    if (!uniqueCards.find((existingCard) => card == existingCard.value)) {
      uniqueCards.push({
        value: card,
        count: 1,
      });
    } else {
      const existingCard = uniqueCards.find(
        (uniqueCard) => uniqueCard.value === card
      );
      existingCard.count++;
    }
  });
  const nonJokerMultipleCards = uniqueCards.filter(
    (card) => card.value !== "J" && card.count > 1
  );

  if (uniqueCards.length === 1 || uniqueCards.length === 2) {
    return 7;
  } else if (jokerCount === 1 && nonJokerMultipleCards.length === 0) {
    return 2;
  } else if (
    (jokerCount === 1 && uniqueCards.length === 4) ||
    (jokerCount === 2 && uniqueCards.length === 4)
  ) {
    return 4;
  } else if (uniqueCards.length === 3) {
    const nonJokerCards = uniqueCards.filter((card) => card.value !== "J");
    if (
      nonJokerCards[0].count + jokerCount === 4 ||
      nonJokerCards[1].count + jokerCount == 4
    ) {
      return 6;
    } else {
      return 5;
    }
  } else if (uniqueCards.length === 4) {
    if (jokerCount === 1 && nonJokerMultipleCards.length === 0) {
      return 3;
    } else {
      return 4;
    }
  }
};

const calcBids = (input, sequenceMatchingMethod) => {
  calculatedInputs = [];
  input.forEach((element) => {
    element.sequenceStrength = sequenceMatchingMethod(element.cards);
    if (calculatedInputs.length === 0) {
      element.rank = 1;
      calculatedInputs.push(element);
    } else {
      let rank = 1;
      calculatedInputs.forEach((calculatedInput) => {
        if (calculatedInput.sequenceStrength < element.sequenceStrength) {
          rank++;
        } else if (
          calculatedInput.sequenceStrength === element.sequenceStrength
        ) {
          for (let i = 0; i < element.cards.length; i++) {
            if (
              getCardStrength(calculatedInput.cards[i]) ===
              getCardStrength(element.cards[i])
            ) {
              continue;
            } else if (
              getCardStrength(calculatedInput.cards[i]) <
              getCardStrength(element.cards[i])
            ) {
              rank++;
              break;
            } else {
              calculatedInput.rank++;
              break;
            }
          }
        } else {
          calculatedInput.rank++;
        }
      });
      element.rank = rank;
      if (element.cards.includes("J")) {
        console.log(
          element.cards.join("") +
            " Gives " +
            sequenceMapping[element.sequenceStrength]
        );
      }
      calculatedInputs.push(element);
    }
  });
  return calculatedInputs.reduce((acc, curr) => {
    acc += curr.rank * curr.bid;
    return acc;
  }, 0);
};

console.log("Part 1: " + calcBids(fileInput, findSequenceStrength));
console.log("Part 2: " + calcBids(fileInput, findSequenceStrengthP2));
