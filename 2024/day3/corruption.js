import { readFileSync } from "node:fs";

const memdump = readFileSync("./input.txt", "utf-8");

let enabled = true;
const mul = (x, y) => x * y;
const baseRegex = new RegExp(/(mul\(\d+,\d+\))/, "g");
const extendedRegex = new RegExp(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/, "g");

const main = (regex) => {
	const result = [...memdump.matchAll(regex)].map((r) => {
		if (r[1] && enabled) return r[1];
		if (r[2]) enabled = true;
		if (r[3]) enabled = false;
	});

	return result.reduce((acc, cur) => acc + (cur ? eval(cur) : 0), 0);
};

console.log("Sum of multiplications (no conditionals):", main(baseRegex));
console.log("Sum of multiplications (with conditionals):", main(extendedRegex));
