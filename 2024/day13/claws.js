const inputs = require("fs").readFileSync("./input.txt", "utf-8").split("\n\n");

const nTokens = (/** @type {number[]} */ [a1, a2, b1, b2, c1, c2]) => {
	const A = (c1 * b2 - b1 * c2) / (a1 * b2 - b1 * a2);
	const B = (a1 * c2 - c1 * a2) / (a1 * b2 - b1 * a2);

	if (Number.isInteger(A) && Number.isInteger(B)) return A * 3 + B;
	return 0;
};

const main = (adjustMeasurements = false) => {
	let totalTokens = 0;

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];

		let matches = [...input.matchAll(/(\d+).+?(\d+)/g)];

		let vars = [];

		for (let i = 0; i < matches.length; i++)
			vars.push(parseInt(matches[i][1]), parseInt(matches[i][2]));

		if (adjustMeasurements) vars.splice(4, 2, vars[4] + 1e13, vars[5] + 1e13);

		totalTokens += nTokens(vars);
	}

	return totalTokens;
};

console.log("Tokens:", main());
console.log("Tokens, with adjusted measurements:", main(true));
