import { readFileSync } from "node:fs";

class Plot {
	/** @type {number} */ x;
	/** @type {number} */ y;
	/** @type {string} */ value;
	/** @type {Region} */ region;

	constructor(x, y, value) {
		this.x = x;
		this.y = y;
		this.value = value;
		this.region = null;
	}
}

class Region {
	/** @type {Set<Plot>} plots */ plots;

	constructor() {
		this.area = 0;
		this.perimeter = 0;
		this.sides = 0;
		this.plots = new Set();
	}
}

const Farm = readFileSync("./input.txt", "utf-8")
		.split("\n")
		.map((r, y) => r.split("").map((c, x) => new Plot(x, y, c))),
	farmSize = Farm.length - 1;

/** @type {Set<Region>} regions */
const regions = new Set();

// Processes all adjacent plots to define a region
// Returns a list of adjacent plots from other regions
function discoverRegion(/** @type {Plot} root */ root) {
	const foreignPlots = new Set();

	/** @type {Plot[]} plotQueue */
	let plotQueue = [];

	root.region = new Region();
	regions.add(root.region);

	plotQueue.push(root);

	while (plotQueue.length > 0) {
		const plot = plotQueue.shift();
		plot.region.area++;
		plot.region.plots.add(plot);

		let adjacents = [];

		const n = plot.y > 0 ? Farm[plot.y - 1][plot.x] : null;
		const s = plot.y < farmSize ? Farm[plot.y + 1][plot.x] : null;
		const w = plot.x > 0 ? Farm[plot.y][plot.x - 1] : null;
		const e = plot.x < farmSize ? Farm[plot.y][plot.x + 1] : null;

		adjacents.push(n, s, w, e);

		for (let i = 0; i < adjacents.length; i++) {
			if (!adjacents[i]) plot.region.perimeter++;
			else {
				if (adjacents[i].value !== plot.value) plot.region.perimeter++;
				if (adjacents[i].region === null) {
					if (adjacents[i].value === plot.value) {
						adjacents[i].region = root.region;
						plotQueue.push(adjacents[i]);
					} else foreignPlots.add(adjacents[i]);
				}
			}
		}
	}

	return [...foreignPlots];
}

let plotsToProcess = discoverRegion(Farm[0][0]);
while (plotsToProcess.length > 0) {
	const plotToProcess = plotsToProcess.shift();

	if (plotToProcess.region === null)
		plotsToProcess.push(...discoverRegion(plotToProcess));
}

for (const region of regions.values()) {
	for (const plot of region.plots.values()) {
		const dir = (x, y) =>
			[...region.plots].filter((p) => p.x === x && p.y === y)[0];

		let { x, y } = plot;
		const n = dir(x, y - 1),
			s = dir(x, y + 1),
			w = dir(x - 1, y),
			e = dir(x + 1, y),
			ne = dir(x + 1, y - 1),
			nw = dir(x - 1, y - 1),
			sw = dir(x - 1, y + 1),
			se = dir(x + 1, y + 1);

		// Basic corners
		if (!n && !w) region.sides++;
		if (!n && !e) region.sides++;
		if (!s && !w) region.sides++;
		if (!s && !e) region.sides++;

		// Inner corners
		if (n && w && !nw) region.sides++;
		if (n && e && !ne) region.sides++;
		if (s && w && !sw) region.sides++;
		if (s && e && !se) region.sides++;
	}
}

console.log(
	"Fence price:",
	[...regions].reduce((acc, region) => acc + region.area * region.perimeter, 0)
);

console.log(
	"Discounted price:",
	[...regions].reduce((acc, region) => acc + region.area * region.sides, 0)
);
