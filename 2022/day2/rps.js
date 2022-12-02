const fs = require("fs");

// Score - Shape (Rock: 1; Paper: 2; Scissors: 3) + Outcome (Loss: 0; Draw: 3; Win: 6)
// Column 1 - A: Rock; B: Paper; C: Scissors
// Column 2 - (PART 1: X: Rock; Y: Paper; Z: Scissors) (PART 2: X: Lose; Y: Draw; Z: Win)

let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n"),
	totalScore = 0;

const calculateScore = (c1, c2) => {
	// Part 1
	// let score = c2 === "X" ? 1 : c2 === "Y" ? 2 : 3;
	// if (c1 === "A") score += c2 === "X" ? 3 : c2 === "Y" ? 6 : 0;
	// if (c1 === "B") score += c2 === "Y" ? 3 : c2 === "Z" ? 6 : 0;
	// if (c1 === "C") score += c2 === "Z" ? 3 : c2 === "X" ? 6 : 0;

	// Part 2
	let score = c2 === "X" ? 0 : c2 === "Y" ? 3 : 6;
	if (c1 === "A") score += c2 === "X" ? 3 : c2 === "Y" ? 1 : 2;
	if (c1 === "B") score += c2 === "X" ? 1 : c2 === "Y" ? 2 : 3;
	if (c1 === "C") score += c2 === "X" ? 2 : c2 === "Y" ? 3 : 1;

	return score;
};

for (let i = 0; i < input.length; i++) {
	let shapes = input[i].split(" ");
	totalScore += calculateScore(shapes[0], shapes[1]);
}

console.log(`Total score: ${totalScore}`);
