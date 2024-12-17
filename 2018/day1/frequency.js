import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

// Part 1
const sum = input.reduce((prev, cur) => prev + parseInt(cur), 0);

// Part 2
// Note: don't use an array! (Switching to a set: 6 seconds -> 15ms)
let freq = 0;
let repeat = null;
const freqs = new Set([0]);
while (repeat == null) {
	input.reduce((prev, cur) => {
		freq = prev + parseInt(cur);
		if (freqs.has(freq) && repeat == null) repeat = freq;
		else freqs.add(freq);
		return freq;
	}, freq);
}

console.log("Sum: ", sum);
console.log("First repeated frequency:", repeat);
