import { readFileSync } from "node:fs";

const diskMap = readFileSync("./input.txt", "utf-8").split("");

// IDS CAN BE ABOVE 9
// ID 10+ still only takes 1 space

// SETUP
let disk = [];
let dataLength = 0;
let files = [];

for (let i = 0, id = 0; i < diskMap.length; i++) {
	let blockLen = parseInt(diskMap[i]);

	let file = [];
	let char = "";

	if (i % 2 == 0) {
		dataLength += blockLen;
		char = (id++).toString();
	} else char = ".";

	for (let _ = 0; _ < blockLen; _++) file.push(char);

	files.push(file);
	disk.push(...file);
}

const checksum = (filesys) =>
	filesys
		.map((d) => parseInt(d))
		.reduce((acc, current, i) => {
			if (isNaN(current)) return acc;
			return acc + current * i;
		});

const part1 = () => {
	let offset = 0;
	let sortedDisk = [];

	for (let i = 0; i < disk.length; i++) {
		const char = disk[i];

		if (char !== ".") {
			sortedDisk.push(char);
			continue;
		}

		let lastN = disk.at(--offset);
		while (lastN === ".") lastN = disk.at(--offset);

		sortedDisk.push(lastN);
	}

	return checksum(sortedDisk.slice(0, dataLength));
};

const part2 = () => {
	let dataFiles = files.filter(
		(file) => file.length > 0 && !file.includes(".")
	);

	// for each id
	for (let i = dataFiles.length - 1; i > 0; i--) {
		const fileToMove = dataFiles[i];
		const fileSize = fileToMove.length;

		// Try and find a group of enough space
		const targetLocation = files.findIndex(
			(potentialSpace) =>
				potentialSpace.includes(".") &&
				potentialSpace.filter((d) => d === ".").length >= fileSize
		);

		if (targetLocation === -1) continue;

		if (files[targetLocation].length == fileSize) {
			files[targetLocation] = fileToMove;
		} else {
			files[targetLocation].splice(
				files[targetLocation].indexOf("."),
				fileSize,
				...fileToMove
			);
		}

		const oldFileLocation = files.findLastIndex((file) =>
			file.includes(fileToMove[0])
		);
		files[oldFileLocation] = files[oldFileLocation].map(() => ".");
		dataFiles.pop();
	}

	return checksum(files.filter((file) => file.length > 0).flat());
};

console.log(part1());
console.log(part2());
