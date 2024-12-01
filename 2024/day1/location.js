const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((l) => l.split(/\s+/).map((n) => parseInt(n)));

const list1 = input.map((l) => l[0]).sort((a, b) => a - b);
const list2 = input.map((l) => l[1]).sort((a, b) => a - b);

let totalDifference = 0,
	similarityScore = 0;
for (let i = 0; i < input.length; i++) {
	totalDifference += Math.abs(list1[i] - list2[i]);

	similarityScore += list1[i] * list2.filter((n) => n === list1[i]).length;
}

console.log("Sum of differences:", totalDifference);
console.log("Total similarity score:", similarityScore);
