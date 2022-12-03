const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n"),
	alpha = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
	total = 0;

for (let i = 0; i < input.length; i += 3) {
	let bag1 = input[i].split(""),
		bag2 = input[i + 1],
		bag3 = input[i + 2];

	for (let j = 0; j < bag1.length; j++) {
		if (bag2.includes(bag1[j]) && bag3.includes(bag1[j])) {
			total += alpha.indexOf(bag1[j]);
			break;
		}
	}
}

console.log(total);
