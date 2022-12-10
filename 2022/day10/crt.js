const instructions = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((i) => i.split(" "));

let cycle = 1,
	x = 1,
	noteCycle = 20,
	noteScreen = 40,
	signal = 0,
	screen = ["", "", "", "", "", ""];

// Check if cycle is notable and get signal strength
const check = () => {
	if (cycle === noteCycle) {
		signal += cycle * x;
		noteCycle += 40;
	}
};

// Draw to the screen (if haven't already in cycle)
const draw = () => {
	let index = noteScreen / 40 - 1;

	if (screen[index].length < cycle - noteScreen + 40 && cycle <= 240) {
		// If cycle index of current line is in sprite
		if ([x - 1, x, x + 1].some((n) => n === (cycle - 1) % 40))
			screen[index] += "#";
		else screen[index] += ".";
	}

	if (cycle === noteScreen && cycle !== 240) noteScreen += 40;
};

// Loop through instructions
for (let i = 0; i < instructions.length; i++) {
	draw();
	cycle++;
	check();
	if (instructions[i][0] === "addx") {
		draw();
		x += parseInt(instructions[i][1]);
		cycle++;
	}
	check();
	draw();
}

console.log(`Total signal strength: ${signal}`); // Part 1
console.log(`Screen:\n${screen.join("\n")}`); // Part 2
