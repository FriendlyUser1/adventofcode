import { readFileSync } from "node:fs";

const moves = readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((m) => m.split(" "));

/**
 * Simulates a rope with knots
 * @param {string[][]} moves - 2D list of moves e.g: [ ["L", 2], ["D", 2] ]
 * @param {number} knots - Number of non-head knots
 * @returns {number} Number of locations the last knot has been to
 */
const simulate = (moves, knots = 1) => {
	let headXY = [0, 0],
		tailXYs = new Array(knots).fill().map(() => [0, 0]),
		tailed = {};

	for (let move = 0; move < moves.length; move++) {
		let steps = parseInt(moves[move][1]);
		let dir = moves[move][0];

		// Loop through steps of current move
		for (let step = 0; step < steps; step++) {
			// Update true head position
			headXY[0] += dir == "L" ? -1 : dir == "R" ? 1 : 0;
			headXY[1] += dir == "D" ? -1 : dir == "U" ? 1 : 0;

			// For each tailing knot
			for (let k = 0; k < tailXYs.length; k++) {
				let kHead = k != 0 ? tailXYs[k - 1] : headXY, // Head relative to this knot (last knot)
					kTail = tailXYs[k];

				let far = (x = kTail[0], y = kTail[1]) =>
					[x, y].some((n, i) => Math.abs(n - kHead[i]) > 1);

				// Move tail?
				if (far()) {
					if (kTail.every((n, i) => n != kHead[i])) {
						// Move diagonal
						let tailMod = [-1, -1];
						if (!far(kTail[0] + 1, kTail[1] + 1)) tailMod = [1, 1];
						else if (!far(kTail[0] + 1, kTail[1] - 1)) tailMod = [1, -1];
						else if (!far(kTail[0] - 1, kTail[1] + 1)) tailMod = [-1, 1];

						kTail[0] += tailMod[0];
						kTail[1] += tailMod[1];
					} else {
						// Move straight
						if (!far(kTail[0] + 1)) kTail[0] += 1;
						else if (!far(kTail[0] - 1)) kTail[0] -= 1;
						else if (!far(kTail[0], kTail[1] + 1)) kTail[1] += 1;
						else kTail[1] -= 1;
					}
				}

				// Update tail places
				if (k == knots - 1) tailed[`${kTail[0]},${kTail[1]}`] = 1;
			}
		}
	}

	return Object.keys(tailed).length;
};

console.log(`Places tail visited (length 1): ${simulate(moves, 1)}`); // Part 1

console.log(`Places tail visited (length 9): ${simulate(moves, 9)}`); // Part 2
