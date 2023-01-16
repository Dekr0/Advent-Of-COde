import { join } from 'path';
import { readFileSync } from 'fs';

const lines = readFileSync(join(__dirname, 'day-1.txt'), 'utf-8').split('\n');

let elf: {
    elf_number: number;
    item_calroies: number[];
    total_calories: number;
}

let elf_number: number = 0;
let elfs: typeof elf[] = [];
let max_calories: number = 0;

for (var i = 0; i < lines.length; i++) {
    let total_calories: number = 0;
    let item_calories: number[] = [];

    for (var j = i; j < lines.length; j++) {
        if (lines[j].length == 0) {
            i = j;
            break;     
        }

        const calories = parseInt(lines[j], 10);

        item_calories.push(calories);

        total_calories += calories;
    }

    elfs.push({
        elf_number: elf_number,
        item_calroies: item_calories,
        total_calories: total_calories,
    });

    if (total_calories > max_calories) {
        max_calories = total_calories;
    }

    elf_number++;
}

elfs.sort(
    (a, b) => {
        return b.total_calories - a.total_calories;
    }
)

let top_three_total: number = 0;
for (var i = 0; i < 3; i++) {
    top_three_total += elfs[i].total_calories;
}

console.log(top_three_total);