import { readFileSync } from "node:fs";

/** @typedef {{x: number, y: number}} ref */

class Maze {
	/** @type {Reindeer[][]} grid */ grid;
	/** @type {number} gridSize */ gridSize;
	/** @type {Reindeer} start */ start;
	/** @type {Reindeer} end */ end;

	constructor(maze) {
		this.grid = maze;
		this.gridSize = this.grid.length;

		this.start = this.filter("S");
		this.end = this.filter("E");
	}

	filter(char) {
		for (let y = 0; y < this.gridSize; y++) {
			for (let x = 0; x < this.gridSize; x++) {
				if (this.grid[y][x].value == char) return this.grid[y][x];
			}
		}
	}
}

class Reindeer {
	/** @type {number} x */ x;
	/** @type {number} y */ y;
	/** @type {string} value */ value;

	constructor(x, y, value) {
		this.x = x;
		this.y = y;
		this.value = value;
		this.visited = false;
	}

	get string() {
		return `${this.x},${this.y}`;
	}
}

const maze = new Maze(
	readFileSync("./test.txt", "utf-8")
		.split("\n")
		.map((r, y) => r.split("").map((c, x) => new Reindeer(x, y, c)))
);

const race = () => {
	const root = maze.start,
		queue = [root],
		maps = [];

	let nodes = new Map();
	root.visited = true;
	// nodes.set(root, null);

	while (queue.length > 0) {
		const v = queue.shift();

		let adjacents = [];

		if (v.x > 0) adjacents.push(maze.grid[v.y][v.x - 1]);
		if (v.x < maze.gridSize - 1) adjacents.push(maze.grid[v.y][v.x + 1]);
		if (v.y > 0) adjacents.push(maze.grid[v.y - 1][v.x]);
		if (v.y < maze.gridSize - 1) adjacents.push(maze.grid[v.y + 1][v.x]);

		for (const adjacent of adjacents) {
			if (!adjacent.visited && adjacent.value != "#") {
				// if (nodes.get(v))

				//todo handle turns

				nodes.set(adjacent.string, v);
				adjacent.visited = true;
				queue.push(adjacent);

				if (adjacent.value == "E")
					maps.push(new Map(Array.from(nodes).slice()));
			}
		}
	}

	return maps;
};

const allRes = race();

for (const res of allRes) {
	let last = maze.end.string,
		steps = 0;

	while (res.has(last)) {
		const parent = res.get(last);
		console.log(parent);
		last = parent.string;
		steps++;
	}
	console.log(steps);
}
