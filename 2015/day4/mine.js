import { createHash } from "node:crypto";

const solve = (zeroes) => {
	let hexHash = "",
		n = 0;

	while (!hexHash.startsWith("0".repeat(zeroes)))
		hexHash = createHash("md5").update(`ckczppom${n++}`).digest("hex");

	return n - 1;
};

console.log(`Number: ${solve(5)}`); // Part 1
console.log(`Number: ${solve(6)}`); // Part 2
