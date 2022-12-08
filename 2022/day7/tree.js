class Tree {
	constructor() {
		this.view = {};
		this.pwd = [];
	}

	add(item) {
		let curDir = this.pwd.reduce((curDir, d) => curDir[d], this.view);
		curDir[item[1]] = !isNaN(item[0]) ? parseInt(item[0]) : {};
	}

	cd(name) {
		if (name === "/") this.pwd = [];
		else if (name === "..") this.pwd.pop();
		else this.pwd.push(name);
	}
}

const input = require("fs").readFileSync(`./input.txt`, "utf-8").split("\n"),
	tree = new Tree();

for (let i = 0; i < input.length; i++) {
	let ins = input[i].split(" ");
	if (ins[0] === "$") {
		if (ins[1] === "cd") tree.cd(ins[2]);
	} else {
		tree.add(ins);
	}
}

let dirs = {};

const crawl = (dir = "", branch = tree.view) => {
	let size = 0;
	for (let [k, v] of Object.entries(branch)) {
		if (!isNaN(v)) size += v;
		else size += crawl(`${dir}/${k}`, branch[k]);
	}
	dirs[dir ? dir : "/"] = size;
	return size;
};

crawl();

dirs = Object.fromEntries(Object.entries(dirs).sort((a, b) => a[1] - b[1]));

// Part 1
console.log(
	`Small directory sizes: ${Object.values(dirs)
		.filter((n) => n < 100000)
		.reduce((a, n) => a + n, 0)}`
);

let spaceNeeded = 30000000 - (70000000 - dirs["/"]),
	deleteDir = Object.keys(dirs).filter((dir) => dirs[dir] >= spaceNeeded)[0];

console.log(`Directory to delete: "${deleteDir}", Size: ${dirs[deleteDir]}`); // Part 2
