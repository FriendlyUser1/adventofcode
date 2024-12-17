import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const testEquation = (
	/** @type {number[]} */ ns,
	/** @type {string[]} */ ops,
	/** @type {number} */ target
) => {
	let res = ns[0];

	for (let i = 1; i < ns.length; i++) {
		// Earlier return for incorrect combination (saves 0.5s)
		if (res > target) return 0;

		const op = ops[i - 1];
		if (op === "+") res += ns[i];
		else if (op === "*") res *= ns[i];
		else if (op === "||") res = parseInt(`${res}${ns[i]}`);
	}

	return res;
};

/**
 * @param {(...args: number[]) => void} fn
 * @param {number} loops
 * @param {string[]} ops
 */
const iterateCombinations = (fn, loops, ops) => {
	let evalString = "";
	let args = [];

	for (let loop = 0; loop < loops; loop++) {
		let argName = `arg${loop}`;
		args.push(argName);

		evalString += `for (let ${argName} = 0; ${argName} < ${ops.length}; ${argName}++) {`;
	}

	evalString += `fn(${args.join(",")})`;

	evalString += "}".repeat(loops);

	return eval(evalString);
};

const validTestVals = new Set();

/** @param {string[]} ops */
const main = (ops) => {
	for (let row = 0; row < input.length; row++) {
		const values = input[row].match(/\d+/g).map((n) => parseInt(n));
		const testValue = values.shift();

		const opFn = (/** @type {number[]} */ ...opIndices) => {
			let res = testEquation(
				values,
				opIndices.map((opIndex) => ops[opIndex]),
				testValue
			);

			if (res == testValue) {
				validTestVals.add(testValue);
				// Don't test the rest of the combinations (saves 1.5s)
				throw Error("Exit eval");
			}
		};

		try {
			iterateCombinations(opFn, values.length - 1, ops);
		} catch (err) {
			if (err.message !== "Exit eval") throw err;
		}
	}

	return [0, ...validTestVals.values()].reduce((p, c) => p + c);
};

// ~35ms
console.log("Calibration 1:", main(["+", "*"]));

// ~2.5s
console.log("Calibration 2:", main(["+", "*", "||"]));
