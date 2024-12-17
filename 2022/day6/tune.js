import { readFileSync } from "node:fs";

const findMarker = (input, len) => {
	for (let i = 0; i < input.length; i++) {
		let chars = input.slice(i, i + len);
		if (chars.length === new Set(chars).size) return i + len;
	}
};

const input = readFileSync("./input.txt", "utf-8");
console.log(`Packet marker after character ${findMarker(input, 4)}`); // Part 1
console.log(`Message marker after character ${findMarker(input, 14)}`); // Part 2
