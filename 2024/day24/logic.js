class Monitor {
	/**
	 * @param {string[][]} wires
	 * @param {string[][]} statements
	 */
	constructor(wires, statements) {
		this.known = new Map();
		for (let i = 0; i < wires.length; i++) {
			const kv = wires[i];
			const k = kv[0].replace(":", "");

			this.known.set(k, parseInt(kv[1]));
		}

		this.stmts = new Map();
		for (let i = 0; i < statements.length; i++) {
			const k = `${statements[i].slice(0, 3).join(" ")} ${i}`;

			this.stmts.set(k, statements[i][4]);
		}
	}

	getPossible() {
		const possibleKeys = this.stmts
			.keys()
			.filter(
				(key) =>
					this.known.has(key.split(" ")[0]) && this.known.has(key.split(" ")[2])
			);

		return [...possibleKeys];
	}

	solve(/** @type {string} */ stmt) {
		const stmtArr = stmt.split(" ");

		const wire1 = this.known.get(stmtArr[0]),
			wire2 = this.known.get(stmtArr[2]),
			op = stmtArr[1];

		if (op == "AND") return wire1 & wire2;
		else if (op == "OR") return wire1 | wire2;
		else return wire1 ^ wire2;
	}

	answer() {
		return parseInt(
			[...this.known.keys()]
				.filter((k) => k.startsWith("z"))
				.sort()
				.map((zk) => this.known.get(zk))
				.reverse()
				.join(""),
			2
		);
	}

	run() {
		let possible = this.getPossible();

		while (possible.length > 0) {
			for (const stmt of possible) {
				const val = this.solve(stmt);
				this.known.set(this.stmts.get(stmt), val);
				this.stmts.delete(stmt);
			}

			possible = this.getPossible();
		}

		return this.answer();
	}
}

const [wireInput, stmtInput] = (await Bun.file("./input.txt").text())
	.split("\n\n")
	.map((l) => l.split("\n").map((d) => d.split(" ")));

const monitor = new Monitor(wireInput, stmtInput);

console.log(monitor.run());
