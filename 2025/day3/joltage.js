import { readFileSync } from "node:fs";
const input = readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((bank) => bank.split("").map((bat) => parseInt(bat)));

/**
 * Returns the index of the largest value in an array, or -1 if there are no values.
 * @param {number[]} arr The array to search
 * @param {number} after The index before the search begins
 * @param {number} end The number of items to not search at the end of the array
 */
const indexOfMax = (arr, after, end = 0) => {
	return arr.indexOf(
		Math.max(...arr.slice(after + 1, arr.length - end)),
		after + 1
	);
};

let total = 0;

for (let i = 0; i < input.length; i++) {
	const bank = input[i];
	const index1 = bank.indexOf(Math.max(...bank.slice(0, bank.length - 1)));
	const index2 = indexOfMax(bank, index1);
	total += parseInt("" + bank[index1] + bank[index2]);
}

console.log("Total joltage:", total);

total = 0;

for (let i = 0; i < input.length; i++) {
	const bank = input[i];
	const index1 = bank.indexOf(Math.max(...bank.slice(0, bank.length - 11)));
	let joltage = "" + bank[index1];

	for (let j = 10, last = index1; j >= 0; j--) {
		const batIndex = indexOfMax(bank, last, j);
		joltage += bank[batIndex];
		last = batIndex;
	}

	total += parseInt(joltage);
}

console.log("Total joltage:", total);
