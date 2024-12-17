import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const judgeStrings = (rules) => {
	let nice = 0;

	for (let i = 0; i < input.length; i++)
		if (
			(rules === 1 &&
				!/(ab)|(cd)|(pq)|(xy)/g.test(input[i]) &&
				/(.)\1/g.test(input[i]) &&
				input[i].match(/([aeiou])/g)?.length > 2) ||
			(rules === 2 &&
				/([a-z]{2}).*(?=\1)/g.test(input[i]) &&
				/([a-z]{1}).(?=\1)/g.test(input[i]))
		)
			nice++;

	return nice;
};

console.log(`Nice strings: ${judgeStrings(1)}`); // Part 1
console.log(`Nice strings: ${judgeStrings(2)}`); // Part 2
