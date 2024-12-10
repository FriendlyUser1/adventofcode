class MapNode {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {string} value
	 */
	constructor(x, y, value) {
		this.x = x;
		this.y = y;
		this.value = parseInt(value);
	}

	get string() {
		return `${this.x},${this.y}`;
	}
}

const Map = require("fs")
		.readFileSync("./input.txt", "utf-8")
		.split("\n")
		.map((r, y) => r.split("").map((c, x) => new MapNode(x, y, c))),
	mapSize = Map.length;

let totalScores = 0,
	totalRatings = 0;

for (let y = 0; y < mapSize; y++) {
	for (let x = 0; x < mapSize; x++) {
		const node = Map[y][x];
		if (node.value === 0) evaluateTrail(node);
	}
}

function evaluateTrail(/** @type {MapNode} root */ root) {
	const peaks = new Set(),
		toSearch = [];

	toSearch.push(root);

	while (toSearch.length > 0) {
		let node = toSearch.pop();

		if (node.value === 9) {
			if (!peaks.has(node.string)) totalScores++;
			peaks.add(node.string);
		}

		let adjacents = [];

		if (node.y > 0) adjacents.push(Map[node.y - 1][node.x]);
		if (node.y < mapSize - 1) adjacents.push(Map[node.y + 1][node.x]);

		if (node.x > 0) adjacents.push(Map[node.y][node.x - 1]);
		if (node.x < mapSize - 1) adjacents.push(Map[node.y][node.x + 1]);

		for (let edge = 0; edge < adjacents.length; edge++) {
			if (adjacents[edge].value === node.value + 1) {
				if (adjacents[edge].value === 9) totalRatings++;
				toSearch.push(adjacents[edge]);
			}
		}
	}
}

console.log("Sum of all trailhead scores:", totalScores);
console.log("Sum of all trailhead ratings:", totalRatings);
