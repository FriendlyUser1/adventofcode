import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

let codelen = 0,
	strlen = 0;

for (let i = 0; i < input.length; i++) {
	codelen += input[i].length;
	strlen += eval(input[i]).length;
}

console.log(`Characters: ${codelen - strlen}`); // Part 1

let encodelen = 0;

for (let i = 0; i < input.length; i++) {
	encodelen += JSON.stringify(input[i]).length;
}

console.log(`Characters in new encoding: ${encodelen - codelen}`); // Part 2
