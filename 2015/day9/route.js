import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

let locations = new Set();

input.forEach((d) => {
	d.match(/([A-Z][\S]+)/g).forEach((l) => locations.add(l)); // Get locations from input line
});

// Function from https://stackoverflow.com/a/71878206
const combinations = (arr) => {
	let length = arr.length,
		result = [arr.slice()],
		c = new Array(length).fill(0),
		i = 1,
		k,
		p;

	while (i < length) {
		if (c[i] < i) {
			k = i % 2 && c[i];
			p = arr[i];
			arr[i] = arr[k];
			arr[k] = p;
			++c[i];
			i = 1;
			result.push(arr.slice());
		} else {
			c[i] = 0;
			++i;
		}
	}
	return result;
};

let routes = combinations(Array.from(locations)),
	routeDistances = [];

routes.splice(routes.length / 2, routes.length / 2); // Remove the duplicate (reversed) routes

for (let i = 0; i < routes.length; i++) {
	let distance = 0;
	for (let j = 0; j < routes[i].length - 1; j++) {
		distance += +input
			.filter(
				(l) => l.includes(routes[i][j]) && l.includes(routes[i][j + 1])
			)[0]
			.split(" ")[4];
	}
	routeDistances.push(distance);
}

let min = Math.min(...routeDistances),
	max = Math.max(...routeDistances);

// Part 1
console.log(
	`Shortest route: ${routes[routeDistances.indexOf(min)].join(
		" -> "
	)}, distance: ${min}`
);

// Part 2
console.log(
	`Longest route: ${routes[routeDistances.indexOf(max)].join(
		" -> "
	)}, distance: ${max}`
);
