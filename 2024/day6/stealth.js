const fs = require("fs"),
	input = fs.readFileSync("./input.txt", "utf-8"),
	map = input.split("\n"),
	clearmap = input.replace("^", ".").split("\n"),
	mapHeight = map.length,
	mapWidth = map[0].length;

class Guard {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} dir direction
	 * @param {Array<number>} obstacle
	 */
	constructor(y, x, dir = 0, obstacle = null) {
		this.y = y;
		this.x = x;
		this.dir = dir % 4;

		this.inBounds = this.#checkInBounds(y, x);

		this.obstacle = obstacle;

		this.history = new Set().add(this.string);
		this.stepCount = 0;
	}

	step() {
		// Get next position
		let next = this.#nextPos;

		// Check if next position is in bounds
		this.inBounds = this.#checkInBounds(next[0], next[1]);

		if (!this.inBounds) return;

		// Check if next position is an obstacle '#'
		while (
			map[next[0]][next[1]] == "#" ||
			(this.obstacle &&
				next[0] == this.obstacle[0] &&
				next[1] == this.obstacle[1])
		) {
			this.dir = (this.dir + 1) % 4;
			next = this.#nextPos;
		}

		this.stepCount++;

		// Apply new position
		this.y = next[0];
		this.x = next[1];

		// Add to log of visited positions
		this.history.add(this.string);
	}

	visualise() {
		return clearmap
			.with(
				this.y,
				clearmap[this.y]
					.split("")
					.with(
						this.x,
						this.dir == 0
							? "🞁"
							: this.dir == 1
							? "🞂"
							: this.dir == 2
							? "🞃"
							: "🞀"
					)
					.join("")
			)
			.join("\n");
	}

	/**
	 * @param {number} y
	 * @param {number} x
	 */
	#checkInBounds(y, x) {
		return y >= 0 && x >= 0 && y < mapHeight && x < mapWidth;
	}

	get string() {
		return `${this.y},${this.x}`;
	}

	get #nextPos() {
		switch (this.dir) {
			case 0: // UP
				return [this.y - 1, this.x];
			case 1: // RIGHT
				return [this.y, this.x + 1];
			case 2: // DOWN
				return [this.y + 1, this.x];
			default: // LEFT
				return [this.y, this.x - 1];
		}
	}
}

// 'guard' is our main node, that the loop tests will be spawned from.
let guard;

// Get initial position
for (let y = 0; y < map.length; y++) {
	if (!map[y].includes("^")) continue;
	guard = new Guard(y, map[y].indexOf("^"));
	break;
}

let loopsFound = 0;

/** @param {Guard} guard */
async function visualise(guard) {
	await new Promise((r) => setTimeout(r, CONSOLEDELAYMS));
	process.stdout.cursorTo(0, 0);
	process.stdout.clearScreenDown();
	process.stdout.write(guard.visualise());
}

async function main() {
	let lastDir = guard.dir;
	let lastUniquePositions = guard.history.size;
	let lastPosition = [guard.y, guard.x];

	while (guard.inBounds) {
		if (ENABLEVISUALISATION) await visualise(guard);

		guard.step();

		// If the position is new
		if (guard.history.size > lastUniquePositions) {
			// Child guard to test the possible loop
			let child = new Guard(lastPosition[0], lastPosition[1], lastDir, [
				guard.y,
				guard.x,
			]);

			while (child.inBounds && child.stepCount < STEPLIMIT) {
				// if (ENABLEVISUALISATION) await visualise(child);
				child.step();
			}

			if (child.stepCount == STEPLIMIT) loopsFound++;
		}

		lastDir = guard.dir;
		lastPosition = [guard.y, guard.x];
		lastUniquePositions = guard.history.size;
	}
}

const ENABLEVISUALISATION = false,
	STEPLIMIT = 6000,
	CONSOLEDELAYMS = 100;

main().then(() => {
	console.log(
		`
The guard visited ${guard.history.size} unique positions in ${guard.stepCount} steps.
We found ${loopsFound} places for a loop lasting at least ${STEPLIMIT} steps.
		`
	);
});
