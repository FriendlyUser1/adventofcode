const findMarker = (input, len) => {
	for (let i = 0; i < input.length; i++) {
		let chars = [];
		for (let c = 0; c < len; c++) chars.push(input[i + c]);
		if (chars.length === new Set(chars).size) return i + len;
	}
};

const input = require("fs").readFileSync("./input.txt", "utf-8").split("");
console.log(`Packet marker after character ${findMarker(input, 4)}`);
console.log(`Message marker after character ${findMarker(input, 14)}`);
