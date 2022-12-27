import { readFileSync } from 'fs';
import { join } from 'path';


let lines = readFileSync(
    join(__dirname, "day-4.txt"), "utf-8"
    )
    .split("\n");

type Elf = {
    lower: number,
    upper: number,
};

let fullyOverlap = (elfOne: Elf, elfTwo: Elf) => {
    return elfOne.lower <= elfTwo.upper && elfTwo.lower <= elfOne.upper;
}

let include = (id: number, elf: Elf) => {
    return elf.lower <= id && id <= elf.upper;
}

let counter: number = 0;

for (let line of lines) {
    let elfOne: Elf = {
        lower: 0,
        upper: 0,     
    }; 
    
    let elfTwo: Elf = {
        lower: 0,
        upper: 0,
    };
    
    let [rangeOne, rangeTwo] = line.split(",");

    [elfOne.lower, elfOne.upper] = rangeOne.split("-").map((x) => parseInt(x));
    [elfTwo.lower, elfTwo.upper] = rangeTwo.split("-").map((x) => parseInt(x));
    
    if (fullyOverlap(elfOne, elfTwo)) {
        counter++;
    } else if (fullyOverlap(elfTwo, elfOne)) {
        counter++;
    } else if (elfOne.lower === elfOne.upper) {
        if (include(elfOne.lower, elfTwo)) {
            counter++;
        }
    } else if (elfTwo.lower === elfTwo.upper) {
        if (include(elfTwo.lower, elfOne)) {
            counter++;
        }
    }
}

console.log(counter++);