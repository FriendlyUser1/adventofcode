const reports = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.split("\n")
	.map((r) => r.split(" ").map((l) => parseInt(l)));

function checkLevels(levels) {
	const checkOrder = (fn) => levels.slice().sort(fn).join() != levels.join();

	// Levels should be unique
	if (levels.length != new Set(levels).size) return 0;

	// Levels should all be ascending or descending
	if (checkOrder((a, b) => a - b) && checkOrder((a, b) => b - a)) return 0;

	// The difference between levels shouldn't exceed 3
	for (let j = 1; j < levels.length; j++)
		if (Math.abs(levels[j] - levels[j - 1]) > 3) return 0;

	return 1;
}

function checkReports(reports, useDampener) {
	let safeReports = 0;

	for (let i = 0; i < reports.length; i++) {
		if (checkLevels(reports[i])) safeReports++;
		else if (useDampener)
			for (let j = 0; j < reports[i].length; j++)
				if (checkLevels(reports[i].toSpliced(j, 1))) {
					safeReports++;
					break;
				}
	}

	return safeReports;
}

console.log("Safe reports:", checkReports(reports));

console.log(
	`Safe reports (using the Problem Dampener™):`,
	checkReports(reports, true)
);
