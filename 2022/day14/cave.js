import { readFileSync } from "node:fs";

const simulate = (input, floor = false) => {
	const rocks = input
			.split("\n")
			.map((l) =>
				l.split(" -> ").map((r) => r.split(",").map((c) => parseInt(c)))
			),
		xs = Array.from(input.matchAll(/([\d]+),/g)).map((m) => parseInt(m[1])),
		ys = Array.from(input.matchAll(/,(\d+)/g)).map((m) => parseInt(m[1]));

	let minx = Math.min(...xs),
		maxx = Math.max(...xs),
		maxy = Math.max(...ys);

	if (floor) {
		minx = Math.min(500 - (maxy + 3), minx - maxy + 3);
		maxx = Math.max(500 + (maxy + 3), maxy + 3 - maxx);
		maxy += 2;
	}

	let grid = {};

	for (let x = minx; x <= maxx; x++)
		for (let y = 0; y <= maxy; y++) grid[`${x},${y}`] = ".";

	rocks.forEach((rf) => {
		for (let l = 1; l < rf.length; l++) {
			let here = rf[l],
				last = rf[l - 1],
				gmod = (a) => (last[a] < here[a] ? 1 : last[a] > here[a] ? -1 : 0);

			for (let x = last[0]; x !== here[0] + gmod(0); x += gmod(0))
				grid[`${x},${here[1]}`] = "#";

			for (let y = last[1]; y !== here[1] + gmod(1); y += gmod(1))
				grid[`${here[0]},${y}`] = "#";
		}
	});

	grid["500,0"] = "+";

	if (floor) for (let x = minx; x <= maxx; x++) grid[`${x},${maxy}`] = "#";

	let sand = 0;

	while (true) {
		let x = 500,
			y = 0;

		let sq = (a, b) => grid[`${a},${b}`];

		while (sq(x, y + 1)) {
			grid[`${x},${y}`] = ".";

			if (sq(x, y + 1) === ".") y += 1;
			else if (!"o#".includes(sq(x - 1, y + 1))) {
				x -= 1;
				y += 1;
			} else if (!"o#".includes(sq(x + 1, y + 1))) {
				x += 1;
				y += 1;
			} else {
				grid[`${x},${y}`] = "o";
				if (floor && x === 500 && y === 0) return ++sand;
				break;
			}

			if (!sq(x, y + 1)) return sand;
		}

		sand++;
	}
};

const input = readFileSync(`./${process.argv[2]}`, "utf-8");

console.log(simulate(input)); // Part 1

console.log(simulate(input, true)); // Part 2
