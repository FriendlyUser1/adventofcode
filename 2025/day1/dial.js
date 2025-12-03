import { readFileSync } from "node:fs";
const input = readFileSync("./input.txt", "utf-8").split("\n");

let clickZeroes = 0;
let endZeroes = 0;
let last = 50;

for (let i = 0; i < input.length; i++) {
	let rotate = parseInt(input[i].substring(1));
	const direction = input[i].includes("L") ? -1 : 1;

	for (; rotate > 0; rotate--) {
		last += 1 * direction;
		last = ((last % 100) + 100) % 100;
		if (last == 0) clickZeroes++;
	}
	if (last == 0) endZeroes++;
}

console.log("Password (part 1) is", endZeroes);
console.log("Password (part 2) is", clickZeroes);
