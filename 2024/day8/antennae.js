const input = require("fs").readFileSync("./input.txt", "utf-8"),
	map = input.split("\n").map((r) => r.split("")),
	mapSize = map.length;

const foundFreqs = new Set(input.match(/[^\s.]/g));
const freqObj = {};

// for each frequency get positions of their antennae
for (const freq of foundFreqs.values()) {
	freqObj[freq] = [];

	for (let y = 0; y < mapSize; y++) {
		for (let x = 0; x < mapSize; x++) {
			if (map[y][x] === freq) freqObj[freq].push({ x, y });
		}
	}
}

const main = (/** @type {boolean} */ resonantHarmonics = false) => {
	const antinodes = new Set(),
		visualMap = map.slice();

	// for each point on the map
	for (let y = 0; y < mapSize; y++) {
		for (let x = 0; x < mapSize; x++) {
			// for each frequency
			for (const freq of Object.keys(freqObj)) {
				/** @type {{x: number, y: number}[]} */
				let antennae = freqObj[freq];

				for (let i = 0; i < antennae.length; i++) {
					const { x: x2, y: y2 } = antennae[i];

					for (let j = 0; j < antennae.length; j++) {
						// dont test against the same antenna
						if (i === j) continue;

						const { x: x3, y: y3 } = antennae[j];

						// calculate the area of the triangle of the points
						const area = x * (y2 - y3) + x2 * (y3 - y) + x3 * (y - y2);

						if (
							(resonantHarmonics && area === 0) ||
							(x - x2 == (x - x3) * 2 && y - y2 == (y - y3) * 2)
						) {
							antinodes.add(`${x},${y}`);
							visualMap[y][x] = "#";
						}
					}
				}
			}
		}
	}

	console.log(visualMap.map((r) => r.join("")).join("\n"));

	return antinodes.size;
};

console.log(main());
console.log();
console.log(main(true));
