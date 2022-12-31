import { readFileSync } from 'fs';
import { join } from 'path';


let lines = readFileSync(join(__dirname, "day-8-ex.txt"), "utf-8").split("\n");

let heights: number[][] = [];

let maxHeighRow: number[] = [];
let maxHeighCol: number[] = [];

for (let i: number = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let j: number = 0; j < line.length; j++) {
        let char = line[j];

        if (maxHeighRow)
    }
}