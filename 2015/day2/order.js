import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

let paper = 0,
	ribbon = 0;

const d = (n) => n * 2;
const calculateWrapping = (l, w, h) => {
	let s1 = l * w,
		s2 = w * h,
		s3 = h * l;
	return [
		2 * s1 + 2 * s2 + 2 * s3 + Math.min(s1, s2, s3), // surface area + area of smallest side
		l * w * h + Math.min(d(l) + d(w), d(l) + d(h), d(w) + d(h)), // ribbon for bow + ribbon around smallest perimeter
	];
};

for (let i = 0; i < input.length; i++) {
	let dim = input[i].split("x").map((n) => parseInt(n)),
		calcs = calculateWrapping(dim[0], dim[1], dim[2]);
	paper += calcs[0];
	ribbon += calcs[1];
}

console.log(`Total amount of wrapping paper to order: ${paper} feet`); // Part 1
console.log(`Total amount of ribbon to order: ${ribbon} feet`); // Part 2
