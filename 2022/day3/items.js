import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n"),
	alpha = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const solve = (type) => {
	let total = 0;

	for (let i = 0; i < input.length; i += type === "item" ? 1 : 3) {
		let part1 =
				type === "item" ? input[i].substring(0, input[i].length / 2) : input[i],
			part2 =
				type === "item"
					? input[i].substring(input[i].length / 2)
					: input[i + 1],
			part3 = type === "item" ? part2 : input[i + 2];

		for (let j = 0; j < part1.length; j++) {
			if (part2.includes(part1[j]) && part3.includes(part1[j])) {
				total += alpha.indexOf(part1[j]);
				break;
			}
		}
	}

	return total;
};

console.log(`Total item priorities: ${solve("item")}`); // Part 1
console.log(`Total item priorities: ${solve("badge")}`); // Part 2
