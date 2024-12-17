import { readFileSync } from "node:fs";

const inputs = readFileSync("./input.txt", "utf-8").split("\n");
const mod = (n1, n2) => ((n1 % n2) + n2) % n2;

const WIDTH = 101,
	HEIGHT = 103,
	HALFWIDTH = 50,
	HALFHEIGHT = 51;

class Robot {
	/** @type {number} x */ x;
	/** @type {number} x */ y;
	/** @type {number} x */ velX;
	/** @type {number} x */ velY;

	constructor(x, y, velX, velY) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
	}

	move() {
		this.y = mod(this.y + this.velY, HEIGHT);
		this.x = mod(this.x + this.velX, WIDTH);

		return this;
	}

	get quad() {
		let [x, y, HW, HH] = [this.x, this.y, HALFWIDTH, HALFHEIGHT];

		return x == HW || y == HH ? 4 : x < HW ? (y < HH ? 0 : 2) : y < HH ? 1 : 3;
	}
}

/** @returns {Set<Robot>} */
const getRobots = () => {
	const robots = new Set();

	for (const input of inputs.values()) {
		const matches = [...input.matchAll(/-?\d+,-?\d+/g)].map((match) =>
			match[0].split(",").map((n) => parseInt(n))
		);
		let robot = new Robot(...matches.flat());
		robots.add(robot);
	}

	return robots;
};

const checkSafety = (seconds) => {
	const robots = getRobots();

	for (let _ = 0; _ < 100; _++) robots.forEach((robot) => robot.move());

	let quads = [0, 0, 0, 0];
	robots.forEach((robot) => {
		if (robot.quad < 4) quads[robot.quad]++;
	});

	const safetyFactor = quads.reduce((acc, quad) => quad * acc);

	return `Safety factor after ${seconds} seconds: ${safetyFactor}`;
};

const findTree = (char) => {
	const robots = getRobots();
	let foundTree = false,
		visual = [],
		sec = 0;

	const isTree = (row) => new RegExp(`${char}{31}`).test(row.join(""));

	while (!foundTree) {
		visual = [];

		robots.forEach((robot) => robot.move());
		sec++;

		for (let _ = 0; _ < HEIGHT; _++) visual.push(" ".repeat(WIDTH).split(""));

		for (const robot of robots.values())
			if (visual[robot.y][robot.x] == " ") visual[robot.y][robot.x] = char;

		foundTree = visual.some(isTree);
	}

	let treeStart = visual.findIndex(isTree),
		treeEnd = visual.findLastIndex(isTree);

	console.log("\n[...]");
	console.log(
		visual
			.slice(treeStart, treeEnd + 1)
			.map((row) => row.join(""))
			.join("\n")
	);
	console.log("[...]\n");

	return `Found tree at ${sec} seconds.`;
};

console.log(checkSafety(100));
console.log(findTree("X"));
