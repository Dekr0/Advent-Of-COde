import { readFileSync } from 'fs';
import { join } from 'path';

let lines = readFileSync(
    join(__dirname, "day-6.txt"), "utf-8"
    )
    .split("\n");

let charCount = 0;

for (let line of lines) {
    let buffer: string = "";
    let count = 0;

    for (let char of line) {
        if (buffer.includes(char)) {
            buffer = buffer.slice(buffer.indexOf(char) + 1);
        }

        buffer += char;
        count++;

        if (buffer.length == 14) {
            break;
        }
    }

    charCount += count;
}

console.log(charCount);