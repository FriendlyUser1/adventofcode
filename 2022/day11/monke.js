const monkeys = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("\n\n")
	.map((m) => m.split("\n").map((a) => a.trim()));

const play = (rounds, relief = true) => {
	let monkeyObj = {},
		supermod = 1; // https://www.reddit.com/r/adventofcode/comments/zih7gf/comment/izr79go/?utm_source=share&utm_medium=web2x&context=3

	// Build monkey objects
	for (let monkey = 0; monkey < monkeys.length; monkey++) {
		let m = monkeys[monkey];
		supermod *= parseInt(m[3].slice(19));
		monkeyObj[m[0][7]] = {
			items: m[1].slice(16).split(", "),
			operation: m[2].slice(17),
			test(w) {
				return w % eval(m[3].slice(19)) === 0
					? parseInt(m[4].slice(25))
					: parseInt(m[5].slice(26));
			},
		};
	}

	let activity = new Array(monkeys.length).fill(0);

	for (let round = 0; round < rounds; round++) {
		for (let monkey = 0; monkey < monkeys.length; monkey++) {
			let m = monkeyObj[monkey],
				toInspect = m.items.length;

			// Each item
			for (let item = 0; item < toInspect; item++) {
				// inspect
				activity[monkey] += 1;

				// operation
				let old = m.items[0] % supermod;
				let worry = eval(m.operation);

				// relief
				if (relief) worry = Math.floor(worry / 3);

				// test and throw
				m.items.splice(0, 1);
				monkeyObj[m.test(worry)].items.push(worry);
			}
		}
	}

	return activity
		.sort((a, b) => a - b)
		.slice(activity.length - 2)
		.reduce((a, n) => a * n);
};

console.log(`Monkey business after 20 rounds: ${play(20)}`); // Part 1
console.log(`Monkey business after 10000 rounds: ${play(10000, false)}`); // Part 2
