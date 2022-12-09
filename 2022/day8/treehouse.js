// Build rows and columns
const rows = require("fs")
		.readFileSync("./input.txt", "utf-8")
		.split("\n")
		.map((r) => r.split("").map((n) => parseInt(n))),
	cols = new Array(rows.length)
		.fill()
		.map(() => new Array(rows[0].length).fill(0));

// Fill columns
rows.forEach((r, i) => r.forEach((_, j) => (cols[i][j] = rows[j][i])));

/**
 * Count visible trees
 * @param {number[][]} rows
 * @param {number[][]} cols
 * @returns {{xy:visible}}
 */
const findVisible = (rows, cols) => {
	let trees = {};

	const addTree = (tree, height, r, c) => {
		trees[c + "," + r] = tree > height ? 1 : trees[c + "," + r] ?? 0;
		return tree > height ? tree : height;
	};

	for (let r = 0; r < rows.length; r++) {
		let h = -1;

		for (let c = 0; c < rows[r].length; c++) h = addTree(rows[r][c], h, r, c);

		h = -1;

		for (let c = rows[r].length - 1; c >= 0; c--)
			h = addTree(rows[r][c], h, r, c);
	}

	for (let c = 0; c < cols.length; c++) {
		let h = -1;

		for (let r = 0; r < cols[c].length; r++) h = addTree(rows[r][c], h, r, c);

		h = -1;

		for (let r = cols[c].length - 1; r >= 0; r--)
			h = addTree(rows[r][c], h, r, c);
	}

	return trees;
};

/**
 * Finds highest scenic score
 * @param {number[][]} rows
 * @param {number[][]} cols
 * @returns {number} Score
 */
const findScenic = (rows, cols) => {
	let highest = 0;

	for (let r = 1; r < rows.length - 1; r++) {
		for (let c = 1; c < cols.length - 1; c++) {
			let tree = rows[r][c],
				score = 1,
				dirscore = 0;

			// Up
			for (let y = r - 1; y >= 0; y--) {
				dirscore++;
				if (rows[y][c] >= tree) break;
			}
			score *= dirscore;

			// Left
			dirscore = 0;
			for (let x = c - 1; x >= 0; x--) {
				dirscore++;
				if (rows[r][x] >= tree) break;
			}
			score *= dirscore;

			// Down
			dirscore = 0;
			for (let y = r + 1; y < cols.length; y++) {
				dirscore++;
				if (rows[y][c] >= tree) break;
			}
			score *= dirscore;

			// Right
			dirscore = 0;
			for (let x = c + 1; x < rows.length; x++) {
				dirscore++;
				if (rows[r][x] >= tree) break;
			}
			score *= dirscore;

			if (score > highest) highest = score;
		}
	}

	return highest;
};

// Part 1
let visibleCount = 0;
for ([k, v] of Object.entries(findVisible(rows, cols))) if (v) visibleCount++;
console.log(`Visible trees: ${visibleCount}`);

console.log(`Highest scenic score: ${findScenic(rows, cols)}`); // Part 2
