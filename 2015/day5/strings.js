const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n"),
	nice = 0;

for (let i = 0; i < input.length; i++) {
	if (
		// Part 1 rules
		// !/(ab)|(cd)|(pq)|(xy)/g.test(input[i]) &&
		// /(.)\1/g.test(input[i]) &&
		// input[i].match(/([aeiou])/g)?.length > 2

		// Part 2 rules
		/([a-z]{2}).*(?=\1)/g.test(input[i]) &&
		/([a-z]{1}).(?=\1)/g.test(input[i])
	)
		nice++;
}

console.log(`Nice strings: ${nice}`);
