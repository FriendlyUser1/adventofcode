const compute = (/** @type {bigint} */ regA) => {
	let out = [],
		a = regA,
		b,
		c;

	while (a != 0n) {
		b = a & 7n;
		b ^= 6n; // Flips 4,2 bits
		c = a >> b;
		b ^= c;
		b ^= 7n; // Flips the bits
		a >>= 3n;
		out.push(b & 7n); // Output first 3 bits of b
	}

	return out;
};

const input = (await Bun.file("./input.txt").text()).split("\n");

const program = input[4].split(" ")[1].split(","),
	registerA = BigInt(input[0].split(" ")[2]);

const search = () => {
	let stack = [];

	stack.push([]);

	while (stack.length > 0) {
		const ans = stack.pop(),
			ansLen = ans.length;

		const checkPart = (a) => a.slice(15 - ansLen).join(",");

		// Goal reached
		if (ansLen == 16) return parseInt(ans.join(""), 8);

		// Our found so far + whatever padding to 16
		const paddedInput = ans.concat(new Array(16 - ansLen).fill(1));

		for (let i = 0; i < 8; i++) {
			const testResult = compute(
				BigInt(parseInt(paddedInput.with(ansLen, i).join(""), 8))
			);

			// If the end matches the target
			if (
				testResult.length == 16 &&
				checkPart(testResult) == checkPart(program)
			)
				stack.push(ans.concat(i));
		}
	}
};

console.log("With given values:", compute(registerA).join(","));
console.log("Register A to get program output:", search());
