/**
 * Play "look-and-say"
 * @param {string} nStart - String of starting number
 * @param {number} iter - Number of iterations
 * @returns {string} String of number after processing
 */
const play = (nStart, iter) => {
	const parseSeq = (s) => {
		let sArr = s.split(""),
			newSeq = "",
			run = 1;

		if (s.length < 2) return `1${s}`;

		for (let ns = 0; ns < sArr.length; ns++) {
			if (sArr[ns - 1] === sArr[ns]) run++;
			else run = 1;

			if (sArr[ns + 1] !== sArr[ns]) newSeq += `${run}${sArr[ns]}`;
		}

		return newSeq;
	};

	let seq = nStart;
	for (let i = 0; i < iter; i++) seq = parseSeq(seq);

	return seq;
};

const input = "1113122113";

console.log(play(input, 40).length); // Part 1
console.log(play(input, 50).length); // Part 2
