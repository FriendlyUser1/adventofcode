import { readFileSync } from "node:fs";

const [rules, updates] = readFileSync("./input.txt", "utf-8")
	.split("\n\n")
	.map((l) => l.split("\n"));

/**
 * checkUpdate
 * @param {string[]} update
 * @param {boolean} firstCheck - False if in recursion
 * @param {boolean} fix - Disregard an already correct update, and try to fix an incorrect update
 */
const checkUpdate = (update, firstCheck = true, fix = true) => {
	for (let i = 0; i < rules.length; i++) {
		const pages = rules[i].split("|");
		let page1 = update.indexOf(pages[0]),
			page2 = update.indexOf(pages[1]);

		// If the rule is relevant to this update
		if (pages.every((r) => update.includes(r))) {
			// If the update is out of order
			if (page1 > page2) {
				// Return 0 if we're not trying to fix it
				return !fix
					? "0"
					: // Otherwise, swap them and try again
					  checkUpdate(
							update.with(page1, pages[1]).with(page2, pages[0]),
							false
					  );
			}
		}
	}

	return !fix || (fix && !firstCheck) ? update : "0";
};

let middlePages = 0;
let fixedMiddlePages = 0;

for (let i = 0; i < updates.length; i++) {
	let result = checkUpdate(updates[i].split(","), true, false);
	middlePages += parseInt(result[Math.floor(result.length / 2)]);

	result = checkUpdate(updates[i].split(","));
	fixedMiddlePages += parseInt(result[Math.floor(result.length / 2)]);
}

console.log("Total of middle pages in correctly ordered updates:", middlePages);
console.log("Total of middle pages in corrected updates:", fixedMiddlePages);
