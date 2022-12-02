const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n"),
	lights = new Array(1000).fill().map((x) => new Array(1000).fill(0)); // 2D array of 1 million "lights"

for (let i = 0; i < input.length; i++) {
	let dir = input[i],
		coords = dir.match(/(\d+)/g),
		toggle = dir.startsWith("toggle"),
		on = dir.startsWith("turn on"),
		off = dir.startsWith("turn off");

	for (let x = +coords[0]; x <= +coords[2]; x++) {
		for (let y = +coords[1]; y <= +coords[3]; y++) {
			if (on) lights[x][y] += 1; // = 1; Part 1
			if (off) if (lights[x][y] > 0) lights[x][y] -= 1; // = 0; Part 1
			if (toggle) {
				lights[x][y] += 2;
				// lights[x][y] = Number(!lights[x][y]); Part 1
			}
		}
	}
}

// Count up the brightness of the lights
let lit = 0;
for (let j = 0; j < 1000; j++) {
	for (let k = 0; k < 1000; k++) {
		lit += lights[j][k];
	}
}

console.log(lit);
