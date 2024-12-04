const ws = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((row) => row.split(""));

const width = ws[0].length;
const height = ws.length;

// Messy, but works
const wordsearch = (word) => {
	let totalFound = 0;

	/**
	 * Search - recursive function to search for a word
	 * @param {string} char The current character
	 * @param {number} r Row
	 * @param {number} c Column
	 * @param {number} d Direction
	 */
	const search = (char, r, c, d) => {
		if (char === "S") return totalFound++;

		const next = word[word.indexOf(char) + 1];
		const check = (row, col) => {
			if (ws[row][col] === next) search(next, row, col, d);
		};

		const n = r > 0,
			e = c < width - 1,
			s = r < height - 1,
			w = c > 0;

		if (d == 0 && n) check(r - 1, c);
		if (d == 1 && e) check(r, c + 1);
		if (d == 2 && s) check(r + 1, c);
		if (d == 3 && w) check(r, c - 1);
		if (d == 4 && n && e) check(r - 1, c + 1);
		if (d == 5 && s && e) check(r + 1, c + 1);
		if (d == 6 && s && w) check(r + 1, c - 1);
		if (d == 7 && n && w) check(r - 1, c - 1);

		return 0;
	};

	// For each X in the grid, search surrounding letters
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			const char = ws[row][col];

			if (char != "X") continue;
			for (let d = 0; d < 8; d++) search("X", row, col, d);
		}
	}

	return `Found ${totalFound} instances of "${word}" in the grid.`;
};

// Found this easier than part 1
const crossmas = () => {
	let totalCrosses = 0;
	const crossRegex = /MS|SM/;

	const isCross = (r, c) => {
		if (
			crossRegex.test(ws[r - 1][c - 1] + ws[r + 1][c + 1]) &&
			crossRegex.test(ws[r - 1][c + 1] + ws[r + 1][c - 1])
		)
			totalCrosses++;
	};

	for (let row = 1; row < height - 1; row++) {
		for (let col = 1; col < width - 1; col++) {
			const char = ws[row][col];

			if (char != "A") continue;
			isCross(row, col);
		}
	}

	return `Found ${totalCrosses} X-MASes in the grid.`;
};

console.log(wordsearch("XMAS"));
console.log(crossmas());
