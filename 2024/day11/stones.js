const stones = {};

require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split(" ")
	.map((s) => parseInt(s))
	.forEach((s) => (stones[s] ? stones[s]++ : (stones[s] = 1)));

const blink = () => {
	const newStones = {};

	for (const stone of Object.keys(stones)) {
		const nStones = stones[stone],
			stoneN = parseInt(stone);

		const addStone = (n) => {
			if (newStones[n]) newStones[n] += nStones;
			else newStones[n] = nStones;
		};

		if (stoneN === 0) addStone(1);
		else if (stone.length % 2 === 0) {
			const halfLength = stone.length / 2,
				halfOne = parseInt(stone.substring(0, halfLength)),
				halfTwo = parseInt(stone.substring(halfLength));

			addStone(halfOne);
			addStone(halfTwo);
		} else addStone(stoneN * 2024);

		delete stones[stone];
	}

	for (const id of Object.keys(newStones)) {
		if (stones[id]) stones[id] += newStones[id];
		else stones[id] = newStones[id];
	}
};

for (let i = 0; i < 75; i++) blink();

let totalStones = 0;
for (const stone of Object.keys(stones)) totalStones += stones[stone];

console.log(totalStones);
