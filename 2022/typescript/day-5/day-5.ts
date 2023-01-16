import { readFileSync } from 'fs';
import { join } from 'path';

let lines: string[] = readFileSync(
    join(__dirname, "day-5.txt"), "utf-8"
    )
    .split("\n");

let divide: number = 0;

for (let i: number = 0; i < lines.length; i++) {
    if (lines[i].startsWith("move")) {
        divide = i - 2;
        break;
    }
}

let stackCount: number = parseInt(lines[divide].at(lines[divide].length - 2));

let stacks: string[][] = [];

for (let i: number = 0; i < stackCount; i++) {
    stacks.push([]);
}

for (let i: number = divide - 1; i >= 0; i--) {
    let line: string = lines.at(i);

    let j: number = 0;
    let char: string;
    let stackIndex: number = 0;

    while (j < line.length && stackIndex < stackCount) {
        char = line.at(j);

        if (char === "[") {
            stacks[stackIndex].push(line.at(j + 1));
        }

        stackIndex++;
        j += 4;
    }
}

console.log(stacks);

for (let i: number = divide + 2; i < lines.length; i++) {
    let line: string = lines
                            .at(i)
                            .replace(/((move)|(from)|(to)) /g, "");

    let [crateCount, from, to]: number[] = line.split(" ").map(Number);

    const cratesToMove: string[] = [];
    for (let j: number = 0; j < crateCount; j++) {
        cratesToMove.push(stacks[from - 1].pop());
    }

    cratesToMove.reverse();

    for (let crate of cratesToMove) {
        stacks[to - 1].push(crate);
    }
}

let topStack: string = "";
for (let i: number = 0; i < stackCount; i++) {
    topStack += stacks[i].pop();   
}

console.log(topStack);