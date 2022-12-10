/**
 * Solve instructions and return value of wires
 * @param {String[]} input - List of instructions
 * @param {{wire:value}} wires - Object of wires to start with
 */
const solveWires = (input, wires = {}) => {
	let unknown = [];

	const parseInstruction = (instruction, wires) => {
		let dir = instruction.split(" "),
			u16 = (n) => new Uint16Array([n])[0];

		if (dir[1] === "->") {
			if (!isNaN(dir[0]) || dir[0] in wires)
				wires[dir[2]] = wires[dir[0]] ?? parseInt(dir[0]);
			else unknown.push(instruction);
		} else if (dir[0] === "NOT") {
			if (dir[1] in wires) wires[dir[3]] = u16(~wires[dir[1]]);
			else unknown.push(instruction);
		} else {
			if (
				(!(dir[0] in wires) && isNaN(dir[0])) ||
				(!(dir[2] in wires) && isNaN(dir[2]))
			)
				unknown.push(instruction);
			else {
				let arg1 = wires[dir[0]] ?? parseInt(dir[0]),
					arg2 = wires[dir[2]] ?? parseInt(dir[2]);
				wires[dir[4]] =
					dir[1] === "AND"
						? u16(arg1 & arg2)
						: dir[1] === "OR"
						? u16(arg1 | arg2)
						: dir[1] === "LSHIFT"
						? u16(arg1 << arg2)
						: u16(arg1 >> arg2);
			}
		}
	};

	for (let i = 0; i < input.length; i++) {
		parseInstruction(input[i], wires);
	}

	while (unknown.length > 0) {
		for (let j = 0; j < unknown.length; j++) {
			let input = unknown[j];
			unknown.splice(j, 1);
			parseInstruction(input, wires);
		}
	}

	return wires;
};

const fs = require("fs");

// Part 1
console.log(
	`Value of wire A: ${
		solveWires(fs.readFileSync("./input.txt", "utf-8").split("\n"))["a"]
	}`
);

// Part 2
console.log(
	`Value of wire A after override: ${
		solveWires(fs.readFileSync("./input2.txt", "utf-8").split("\n"), {
			b: 3176,
		})["a"]
	}`
);
