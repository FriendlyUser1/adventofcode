import { readFileSync } from "node:fs";

const rows = readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((r) => r.match(/[0-9]+/g).map((n) => parseInt(n)));

let checksum = 0,
	divisible = 0;

for (let i = 0; i < rows.length; i++) {
	let rowmax = 0,
		rowmin = rows[i][0];

	for (let j = 0; j < rows[i].length; j++) {
		let n = rows[i][j];
		if (n > rowmax) rowmax = n;
		if (n < rowmin) rowmin = n;

		for (let k = 0; k < rows[i].length; k++)
			if (n != rows[i][k] && n % rows[i][k] === 0) divisible += n / rows[i][k];
	}

	checksum += Math.abs(rowmax - rowmin);
}

console.log(`The checksum is ${checksum}`);
console.log(`The sum of divisible numbers is ${divisible}`);
