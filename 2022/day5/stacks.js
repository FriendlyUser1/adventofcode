import { readFileSync } from "node:fs";

// Parsing input

const parseInput = (input) => {
	let nStacks = 0,
		hStacks = [],
		stacks = ["_"];

	for (let line = 0; !input[line].startsWith(" 1"); line++) {
		let stack = input[line]
			.split("    ")
			.map((s) => (s.length > 3 ? s.split(" ") : s))
			.flat();

		nStacks = stack.length;
		hStacks.push(stack);
	}

	for (let j = 0; j < nStacks; j++) {
		let cStack = "";
		for (let k = 0; k < hStacks.length; k++)
			if (hStacks[k][j] !== "") cStack += hStacks[k][j].replace(/[\[\]]/g, "");
		stacks.push(cStack);
	}

	return stacks;
};

// Solving instructions

const solve = (input, model = "9000") => {
	let stacks = parseInput(input);

	for (let instr = 2; instr < input.length; instr++) {
		if (!input[instr].startsWith("move")) continue;

		let dir = input[instr].match(/(\d+)/g).map((n) => parseInt(n)),
			cr = stacks[dir[1]].substring(0, dir[0]);

		if (model !== "9001") cr = cr.split("").reverse().join("");

		stacks[dir[1]] = stacks[dir[1]].slice(dir[0]);
		stacks[dir[2]] = cr + stacks[dir[2]];
	}

	let tops = "";
	for (let stack = 1; stack < stacks.length; stack++) tops += stacks[stack][0];

	return `The top crates: ${tops}`;
};

const input = readFileSync("./input.txt", "utf-8").split("\n");

console.log(solve(input)); // Part 1
console.log(solve(input, "9001")); // Part 2
