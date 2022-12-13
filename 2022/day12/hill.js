const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((l) => l.replace("S", "A").replace("E", "Z").split(""));

const squares = [],
	routes = [],
	h = (r, c) =>
		"abcdefghijklmnopqrstuvwxyz".split("").indexOf(input[r][c].toLowerCase()),
	canMove = (height, r, c) => h(r, c) - height < 2;

let start = "",
	end = "";

for (let row = 0; row < input.length; row++) {
	for (let col = 0; col < input[row].length; col++) {
		const addRoute = (height, r, c) =>
			canMove(height, r, c) ? routes.push([`${row},${col}`, `${r},${c}`]) : -1;

		let square = input[row][col],
			height = h(row, col),
			index = `${row},${col}`;

		if (square === "A") start = index;
		if (square === "Z") end = index;

		squares.push(index);

		// Test directions
		if (row > 0) addRoute(height, row - 1, col);
		if (row < input.length - 1) addRoute(height, row + 1, col);
		if (col > 0) addRoute(height, row, col - 1);
		if (col < input[row].length - 1) addRoute(height, row, col + 1);
	}
}

const connections = new Map();

squares.forEach((square) => {
	connections.set(square, []);
	routes
		.filter((r) => r[0] === square)
		.forEach((r) => connections.get(r[0]).push(r[1]));
});

const findSteps = (start, end) => {
	/**
	 * Breadth-First Search
	 * @param {string} startNode
	 * @param {string} targetNode
	 */
	const bfs = (startNode, targetNode) => {
		let nodes = {};
		nodes[startNode] = null;

		const queue = [startNode],
			visited = new Set(queue);

		while (queue.length > 0) {
			const square = queue.shift(),
				destinations = connections.get(square);

			for (const destination of destinations) {
				if (!visited.has(destination)) {
					nodes[destination] = square;
					visited.add(destination);
					queue.push(destination);
				}

				if (destination === targetNode) return nodes;
			}
		}

		return {};
	};

	let parent = bfs(start, end),
		steps = 0,
		node = end;

	while (parent[node]) {
		steps++;
		node = parent[node];
	}

	return steps;
};

// Part 1
let steps = findSteps(start, end);
console.log(
	`Shortest path from start to end: ${steps} step${steps != 1 ? "s" : ""}`
);

// Part 2
let paths = [];

for (let r = 0; r < input.length; r++)
	for (let c = 0; c < input[r].length; c++)
		if (input[r][c].toLowerCase() === "a")
			paths.push(findSteps(`${r},${c}`, end));

console.log(
	`Shortest path from lowest point: ${Math.min(
		...paths.filter((p) => p > 0)
	)} steps`
);
