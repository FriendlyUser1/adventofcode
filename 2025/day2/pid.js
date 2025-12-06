import { readFileSync } from "node:fs";
const input = readFileSync("./input.txt", "utf-8")
	.split(",")
	.map((range) => range.split("-").map((id) => parseInt(id)));

let total1 = 0;
let total2 = 0;

for (let i = 0; i < input.length; i++) {
	for (let id = input[i][0]; id <= input[i][1]; id++) {
		const idString = id.toString();
		const idLen = idString.length;
		const half = idLen / 2;

		for (let len = 1; len <= idLen; len++) {
			if (
				idLen % len == 0 &&
				idLen / len > 1 &&
				idString.slice(0, len).repeat(idLen / len) == idString
			) {
				total2 += id;
				break;
			}
		}

		if (idLen % 2 !== 0) continue;
		if (idString.slice(0, half) == idString.slice(half)) total1 += id;
	}
}

console.log("Invalid IDs (repeated twice):", total1);
console.log("Invalid IDs (repeated >= twice):", total2);
