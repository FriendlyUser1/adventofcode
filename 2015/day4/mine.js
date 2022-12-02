const crypto = require("crypto");

let hexHash = "",
	zeroes = 6,
	n = 0;

while (!hexHash.startsWith("0".repeat(zeroes)))
	hexHash = crypto.createHash("md5").update(`ckczppom${n++}`).digest("hex");

console.log(`Number: ${n - 1}`);
