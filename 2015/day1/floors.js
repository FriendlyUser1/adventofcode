const input = require("fs").readFileSync("./input.txt", "utf-8");

let floor = 0,
	basement = 0;

for (let i = 0; i < input.length; i++) {
	floor += input[i] === "(" ? 1 : -1; // Move up a floor if "(", move down a floor if ")"
	if (floor < 0 && basement === 0) basement = i + 1; // If this is the first time entering the basement, log the position of the bracket
}

console.log(`Final floor: ${floor}`); // Part 1
console.log(`First entry of basement: character ${basement}`); // Part 2
