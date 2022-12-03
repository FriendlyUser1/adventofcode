const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n"),
	alpha = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
	total = 0;

for (let i = 0; i < input.length; i++) {
	let len = input[i].length,
		half1 = input[i].substring(0, len / 2).split(""),
		half2 = input[i].substring(len / 2);

	for (let j = 0; j < half1.length; j++) {
		if (half2.includes(half1[j])) {
			total += alpha.indexOf(half1[j]);
			break;
		}
	}
}

console.log(total);
