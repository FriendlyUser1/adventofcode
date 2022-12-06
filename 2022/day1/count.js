const input = require("fs").readFileSync("./input.txt", "utf-8").split("\n\n");

let total = [];

for (let i = 0; i < input.length; i++) {
	let carrying = input[i]
		.split("\n")
		.reduce((acc, n) => parseInt(acc) + parseInt(n), 0);

	total.push(carrying);
}

total.sort((a, b) => b - a);

console.log(`Most calories carried: ${total[0]}`);
console.log(`Top 3 amounts carried: ${total.slice(0, 3).join(", ")}`);
console.log(`Total for top 3: ${total[0] + total[1] + total[2]}`);
