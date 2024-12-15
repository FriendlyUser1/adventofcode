class Warehouse {
	/** @type {string[][]} grid */ grid;
	/** @type {string[]} moves */ moves;
	/** @type {number} x */ x;
	/** @type {number} y */ y;

	constructor(map, moves) {
		this.grid = map;
		this.moves = moves;

		// Get inital coords
		this.grid.forEach((row, y) =>
			row.forEach((col, x) => {
				if (col === "@") {
					this.x = x;
					this.y = y;
				}
			})
		);
	}

	move(dir) {
		console.log(
			"MOVING",
			["UP", "DOWN", "LEFT", "RIGHT"][dir],
			"FROM",
			this.x,
			this.y
		);

		const nextX = this.x + (dir == 2 ? -1 : dir == 3 ? 1 : 0);
		const nextY = this.y + (dir == 0 ? -1 : dir == 1 ? 1 : 0);

		const nextPlace = this.grid[nextY][nextX];

		if (nextPlace == "#") return "Wall!";
		if (nextPlace == "O") {
			const column = this.grid.map((row) => row[this.x]).flat(),
				row = this.grid[this.y];

			const upVals = column.slice(0, this.y),
				downVals = column.slice(nextY),
				leftVals = row.slice(0, this.x),
				rightVals = row.slice(nextX);

			// check if there is space between the box
			// and the nearest wall
			if (
				(dir == 0 &&
					!column.slice(upVals.lastIndexOf("#"), this.y).includes(".")) ||
				(dir == 1 &&
					!column.slice(nextY, nextY + downVals.indexOf("#")).includes(".")) ||
				(dir == 2 &&
					!row.slice(leftVals.lastIndexOf("#"), this.x).includes(".")) ||
				(dir == 3 &&
					!row.slice(nextX, nextX + rightVals.indexOf("#")).includes("."))
			)
				return "Can't move box!";

			// update box positions
			if (dir == 0)
				for (let i = upVals.lastIndexOf("."); i < this.y; i++)
					this.grid[i][this.x] = "O";
			else if (dir == 1)
				for (let i = nextY + 1; i <= nextY + downVals.indexOf("."); i++)
					this.grid[i][this.x] = "O";
			else if (dir == 2)
				for (let i = leftVals.lastIndexOf("."); i < this.x; i++)
					this.grid[this.y][i] = "O";
			else if (dir == 3)
				for (let i = nextX + 1; i <= nextX + rightVals.indexOf("."); i++)
					this.grid[this.y][i] = "O";
		}

		this.grid[this.y][this.x] = ".";
		this.x = nextX;
		this.y = nextY;
		this.grid[this.y][this.x] = "@";

		return "";
	}

	async run() {
		await this.print("Initial state");

		for (let i = 0; i < this.moves.length; i++) {
			const move = this.moves[i];
			let debug = this.move(["^", "v", "<", ">"].indexOf(move));

			await this.print(`Trying ${move}\n${debug}`);
		}

		console.log(
			"Total GPS coords:",
			this.grid.reduce(
				(rowAcc, row, y) =>
					rowAcc +
					row.reduce(
						(colAcc, col, x) => (col == "O" ? colAcc + 100 * y + x : colAcc),
						0
					),
				0
			)
		);
	}

	async print(msg) {
		process.stdout.cursorTo(0, 0);
		process.stdout.clearScreenDown();
		console.log(this.grid.map((r) => r.join("")).join("\n"));
		console.log(msg);
		await new Promise((r) => setTimeout(r, 1));
	}
}

const input = require("fs").readFileSync("./input.txt", "utf-8").split("\n\n");
const inputMap = input[0].split("\n").map((r) => r.split(""));
const inputMoves = input[1].replace(/\n/g, "").split("");

const main = async () => await new Warehouse(inputMap, inputMoves).run();

main();
