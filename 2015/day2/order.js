const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n"),
	paper = 0,
	ribbon = 0;

const calculateWrapping = (l, w, h) => {
	(l = +l), (w = +w), (h = +h); // Convert to number
	let s1 = l * w,
		s2 = w * h,
		s3 = h * l;
	return [
		2 * s1 + 2 * s2 + 2 * s3 + Math.min(s1, s2, s3), // surface area + area of smallest side
		l * w * h + Math.min(l + l + w + w, l + l + h + h, w + w + h + h), // ribbon for bow + ribbon around smallest perimeter
	];
};

for (let i = 0; i < input.length; i++) {
	let dim = input[i].split("x"),
		calcs = calculateWrapping(dim[0], dim[1], dim[2]);
	paper += calcs[0];
	ribbon += calcs[1];
}

console.log(`Total amount of wrapping paper to order: ${paper} feet`);
console.log(`Total amount of ribbon to order: ${ribbon} feet`);
