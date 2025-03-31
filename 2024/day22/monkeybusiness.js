import { readFileSync } from "node:fs";

const generate = (secret) => {
	const PRUNE = 16777216n;

	const step1 = secret * 64n;
	secret ^= step1;
	secret %= PRUNE;

	const step2 = secret / 32n;
	secret ^= step2;
	secret %= PRUNE;

	const step3 = secret * 2048n;
	secret = secret ^ step3;
	secret = secret % PRUNE;

	return secret;
};

const secrets = readFileSync("./test.txt", "utf-8")
	.split("\n")
	.map((n) => BigInt(n));

const nGenerations = 2000;

let total = 0;
const allChanges = [];

for (let i = 0; i < secrets.length; i++) {
	let secret = secrets[i];
	const prices = [parseInt(secret.toString()) % 10];

	for (let _ = 0; _ < nGenerations; _++) {
		const res = generate(secret);
		secret = res;
		prices.push(parseInt(res) % 10);
	}

	const priceChanges = [];
	for (let j = 1; j < prices.length; j++)
		priceChanges.push(prices[j] - prices[j - 1]);

	allChanges.push(priceChanges);

	total += parseInt(secret.toString());
}

// console.log("Total after 2000 generations:", total);

const allSequences = {};

for (let i = 0; i < allChanges.length; i++) {
	const priceChanges = allChanges[i];

	for (let j = 0; j < priceChanges.length - 3; j++) {
		const seq = priceChanges.slice(j, j + 4).toString();

		allSequences[seq] = Object.hasOwn(allSequences, seq)
			? allSequences[seq]
			: [1];
	}
}

const sequencesByFrequency = Object.keys(allSequences).sort(
	(a, b) => allSequences[b] - allSequences[a]
);
