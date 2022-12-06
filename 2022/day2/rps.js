// Score - Shape (Rock: 1; Paper: 2; Scissors: 3) + Outcome (Loss: 0; Draw: 3; Win: 6)
// Column 1 - A: Rock; B: Paper; C: Scissors
// Column 2 - (PART 1: X: Rock; Y: Paper; Z: Scissors) (PART 2: X: Lose; Y: Draw; Z: Win)

const calculateScore = (c1, c2, ruleset) => {
	let score = 0;
	if (ruleset == 1) {
		score = c2 === "X" ? 1 : c2 === "Y" ? 2 : 3;
		if (c1 === "A") score += c2 === "X" ? 3 : c2 === "Y" ? 6 : 0;
		if (c1 === "B") score += c2 === "Y" ? 3 : c2 === "Z" ? 6 : 0;
		if (c1 === "C") score += c2 === "Z" ? 3 : c2 === "X" ? 6 : 0;
	} else {
		score = c2 === "X" ? 0 : c2 === "Y" ? 3 : 6;
		if (c1 === "A") score += c2 === "X" ? 3 : c2 === "Y" ? 1 : 2;
		if (c1 === "B") score += c2 === "X" ? 1 : c2 === "Y" ? 2 : 3;
		if (c1 === "C") score += c2 === "X" ? 2 : c2 === "Y" ? 3 : 1;
	}

	return score;
};

const solve = (input, ruleset) => {
	let totalScore = 0;
	for (let i = 0; i < input.length; i++) {
		let shapes = input[i].split(" ");
		totalScore += calculateScore(shapes[0], shapes[1], ruleset);
	}
	return totalScore;
};

const input = require("fs").readFileSync("./input.txt", "utf-8").split("\n");

console.log(`Total score: ${solve(input, 1)}`); // Part 1
console.log(`Total score: ${solve(input, 2)}`); // Part 2
