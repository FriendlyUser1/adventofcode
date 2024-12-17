import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

// Part 1
let count2 = 0;
let count3 = 0;

for (let i = 0; i < input.length; i++) {
	let id = input[i].split("").sort(),
		has2 = false,
		has3 = false,
		last = id[0],
		lcount = 1;

	for (let j = 1; j < id.length; j++) {
		let current = id[j];

		if (current == last) lcount++;

		if ((current != last && lcount > 0) || j == id.length - 1) {
			if (lcount == 2) has2 = true;
			if (lcount == 3) has3 = true;
			lcount = 1;
		}

		last = current;
	}

	if (has2) count2++;
	if (has3) count3++;
}

console.log("Checksum: ", count2 * count3);

// Part 2
const splitInput = input.map((id) => id.split(""));

const main = () => {
	for (let i = 1; i < splitInput.length - 1; i++) {
		let ids = splitInput.slice(i);
		let checkid = splitInput[i - 1];
		for (let j = 0; j < checkid.length; j++) {
			let commonid = checkid.toSpliced(j, 1).join("");
			let matches = ids.filter(
				(fullid) => fullid.toSpliced(j, 1).join("") == commonid
			);

			if (matches.length > 0) {
				console.log("Found match. Common letters:", commonid);
				return;
			}
		}
	}
};

main();
