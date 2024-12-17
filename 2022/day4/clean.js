import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

let fullOverlaps = 0,
	partOverlaps = 0;

for (let i = 0; i < input.length; i++) {
	let ns = input[i].match(/(\d+)/g);
	let ms = ns.map((n) => parseInt(n));
	let r1 = [ms[0], ms[1]],
		r2 = [ms[2], ms[3]],
		ma = (a) => Math.max(...a),
		mi = (a) => Math.min(...a);

	if ((ms[0] <= ms[2] && ms[1] >= ms[3]) || (ms[0] >= ms[2] && ms[1] <= ms[3]))
		fullOverlaps++;
	else if (r1.some((n) => r2.includes(n))) partOverlaps++;
	else if (
		(ma(r1) >= mi(r2) && ma(r1) <= ma(r2)) ||
		(ma(r2) >= mi(r1) && ma(r2) <= ma(r1))
	)
		partOverlaps++;
}

console.log(`Full overlaps: ${fullOverlaps}`); // Part 1
console.log(`All overlaps: ${partOverlaps + fullOverlaps}`); // Part 2
