const VISUALISE = false;

class Warehouse {
	/** @type {string[][]} grid */ grid;
	/** @type {string[]} moves */ moves;
	/** @type {number} x */ x;
	/** @type {number} y */ y;

	constructor(map, moves, wide) {
		this.grid = map;
		this.moves = moves;
		this.boxType = wide ? "[" : "O";

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
		const nextX = this.x + (dir == 2 ? -1 : dir == 3 ? 1 : 0);
		const nextY = this.y + (dir == 0 ? -1 : dir == 1 ? 1 : 0);

		const nextPlace = this.grid[nextY][nextX];

		if (nextPlace == "#") return "Wall!";
		if (nextPlace != ".") {
			const column = this.grid.map((row) => row[this.x]).flat(),
				row = this.grid[this.y],
				upVals = column.slice(0, this.y),
				downVals = column.slice(nextY),
				leftVals = row.slice(0, this.x),
				rightVals = row.slice(nextX);

			// left / right
			if (dir > 1) {
				if (
					(dir == 2 &&
						!row.slice(leftVals.lastIndexOf("#"), this.x).includes(".")) ||
					(dir == 3 &&
						!row.slice(nextX, nextX + rightVals.indexOf("#")).includes("."))
				)
					return "Can't move box!";

				this.grid[this.y].splice(
					dir > 2 ? nextX + rightVals.indexOf(".") : leftVals.lastIndexOf("."),
					1
				);

				this.grid[this.y].splice(nextX, 0, ".");
			} else if (nextPlace == "O") {
				// Check if valid move
				if (
					(dir == 0 &&
						!column.slice(upVals.lastIndexOf("#"), this.y).includes(".")) ||
					(dir == 1 &&
						!column.slice(nextY, nextY + downVals.indexOf("#")).includes("."))
				)
					return "Can't move box!";

				// Update grid
				let yStart = dir < 1 ? upVals.lastIndexOf(".") : nextY + 1,
					yLimit = dir < 1 ? this.y - 1 : nextY + downVals.indexOf(".");

				for (let y = yStart; y <= yLimit; y++) this.grid[y][this.x] = "O";
			} else {
				// Check if valid move
				const boxesToMove = [];
				const yMode = dir < 1 ? -1 : 1;

				const colsToCheck = new Set().add(this.x);

				if (nextPlace == "[") colsToCheck.add(this.x + 1);
				else colsToCheck.add(this.x - 1);

				let currentRow = this.y + yMode;

				while (colsToCheck.size > 0) {
					for (const col of colsToCheck.values()) {
						const current = this.grid[currentRow][col];

						if ("[]".includes(current))
							boxesToMove.push({ x: col, y: currentRow, value: current });

						if (current == "[") colsToCheck.add(col + 1);
						else if (current == "]") colsToCheck.add(col - 1);
						else if (current == "#") return "Can't move box!";
						else colsToCheck.delete(col);
					}

					currentRow += yMode;
				}

				// Update grid
				boxesToMove.forEach((box) => (this.grid[box.y][box.x] = "."));

				boxesToMove.forEach(
					(box) => (this.grid[box.y + yMode][box.x] = box.value)
				);
			}
		}

		this.grid[this.y][this.x] = ".";
		this.x = nextX;
		this.y = nextY;
		this.grid[this.y][this.x] = "@";

		return "";
	}

	async run() {
		if (VISUALISE) await this.print("Initial state");

		for (let i = 0; i < this.moves.length; i++) {
			const instruction = this.moves[i],
				msg = this.move(["^", "v", "<", ">"].indexOf(instruction));

			if (VISUALISE) await this.print(`Trying ${instruction}\n${msg}`);
		}

		const rowTotals = this.grid.map((row, y) =>
			row.reduce(
				(colAcc, col, x) =>
					col == this.boxType ? colAcc + 100 * y + x : colAcc,
				0
			)
		);

		const totalGPS = rowTotals.reduce((total, _, y) => total + rowTotals[y]);

		console.log("Total GPS coords:", totalGPS);

		return totalGPS;
	}

	async print(msg) {
		process.stdout.cursorTo(0, 0);
		process.stdout.clearScreenDown();
		console.log(this.grid.map((r) => r.join("")).join("\n"));
		console.log(msg);
		await new Promise((r) => setTimeout(r, 1));
	}
}

const input = require("fs").readFileSync("./input.txt", "utf-8").split("\n\n"),
	inputMoves = input[1].replace(/\n/g, "").split("");

const warehouse1 = input[0].split("\n").map((r) => r.split("")),
	warehouse2 = warehouse1.map((row) =>
		row
			.map((col) => {
				if (col == "#") return ["#", "#"];
				if (col == "O") return ["[", "]"];
				if (col == ".") return [".", "."];
				if (col == "@") return ["@", "."];
			})
			.flat()
	);

const main = async (warehouseMap, isWide = false) =>
	await new Warehouse(warehouseMap, inputMoves, isWide).run();

main(warehouse1);
main(warehouse2, true);
