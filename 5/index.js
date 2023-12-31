const fs = require("fs");
const fileInput = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("\n"))[0];

function prepareInput(input) {
  const preparedInput = {
    seeds: input[0]
      .replace(/seeds: /g, "")
      .split(" ")
      .map((el) => Number(el)),
    seedSoilMaps: [],
    soilFertilizerMaps: [],
    fertilizerWaterMaps: [],
    waterLightMaps: [],
    lightTemperatureMaps: [],
    temperatureHumidityMaps: [],
    humidityLocationMaps: [],
  };
  let activeKey = 0;
  let mapKeys = Object.keys(preparedInput);
  for (let i = 1; i < input.length; i++) {
    if (input[i] === "") {
    } else if (input[i].includes("map")) {
      activeKey++;
    } else {
      const splittedLine = input[i].split(" ");
      const diff = Number(splittedLine[0]) - Number(splittedLine[1]);
      const map = {
        sourceStart: Number(splittedLine[1]),
        sourceEnd: Number(splittedLine[2]) + Number(splittedLine[1]),
        operation: (source) => source + diff,
      };
      preparedInput[mapKeys[activeKey]].push(map);
    }
  }

  return preparedInput;
}

const findMap = (maps, seed) => {
  return (
    maps.find((map) => map.sourceStart <= seed && map.sourceEnd > seed) || {
      operation: (input) => input,
    }
  );
};

const findMapping = (seed, input) => {
  const soil = findMap(input.seedSoilMaps, seed).operation(seed);
  const fertilizer = findMap(input.soilFertilizerMaps, soil).operation(soil);
  const water = findMap(input.fertilizerWaterMaps, fertilizer).operation(
    fertilizer
  );
  const light = findMap(input.waterLightMaps, water).operation(water);
  const temperature = findMap(input.lightTemperatureMaps, light).operation(
    light
  );
  const humidity = findMap(
    input.temperatureHumidityMaps,
    temperature
  ).operation(temperature);
  const location = findMap(input.humidityLocationMaps, humidity).operation(
    humidity
  );
  return location;
};

function part1(input) {
  console.time("Part 1");

  const locations = input.seeds.map((seed) => {
    return findMapping(seed, input);
  });
  console.timeEnd("Part 1");

  return Math.min(...locations);
}

function part2(input) {
  console.time("Part 2");
  let lowestLocation = Number.POSITIVE_INFINITY;
  for (let i = 0; i < input.seeds.length; i += 2) {
    const startingSeed = input.seeds[i];
    const endSeed = startingSeed + input.seeds[i + 1];
    console.log("Checking seed range: " + startingSeed + " - " + endSeed);
    for (let j = startingSeed; j <= endSeed; j++) {
      const location = findMapping(j, input);
      if (lowestLocation > location) {
        lowestLocation = location;
      }
    }
    console.log("Lowest location ATM: " + lowestLocation);
  }
  console.timeEnd("Part 2");
  return lowestLocation;
}

console.log("res: " + part1(prepareInput(fileInput)));
console.log("res: " + part2(prepareInput(fileInput)));
