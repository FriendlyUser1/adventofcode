import { readFileSync } from "node:fs";

const deliver = (input) => {
	let x = 0,
		y = 0,
		delivered = 1,
		houses = { "0,0": 1 };

	for (let i = 0; i < input.length; i++) {
		let dir = input[i];

		if (dir == "^") y++;
		if (dir == "v") y--;
		if (dir == ">") x++;
		if (dir == "<") x--;

		let id = `${x},${y}`;

		if (houses[id]) houses[id]++;
		else {
			delivered++;
			houses[id] = 1;
		}
	}

	return houses;
};

const input = readFileSync("./input.txt", "utf-8").split("");

// Part 1
console.log(
	`Houses with 1+ presents, Santa: ${Object.keys(deliver(input)).length}`
);

let input1 = [],
	input2 = [];

for (let j = 0; j < input.length; j++)
	j % 2 === 0 ? input1.push(input[j]) : input2.push(input[j]);

// Part 2
console.log(
	`Houses with 1+ presents, Santa + Robo-Santa: ${
		Object.keys({ ...deliver(input1), ...deliver(input2) }).length
	}`
);
