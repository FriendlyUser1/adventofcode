const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("")
	.map((n) => parseInt(n));
const len = input.length;

let sum = 0;
for (let i = 0; i < len; i++)
	if (input[i] == input[(i + 1) % len]) sum += input[i];

console.log(`The solution to the first captcha is ${sum}`);

sum = 0;
let half = len / 2;

for (let i = 0; i < len; i++)
	if (input[i] == input[(i + half) % len]) sum += input[i];

console.log(`The solution to the second captcha is ${sum}`);
