import { readFileSync } from "fs";
import { join } from "path";


const asciiLower: number = "a".charCodeAt(0);
const asciiUpper: number = "A".charCodeAt(0);


const isLower = (ascii: number) => {
    return asciiLower <= ascii;
};

const isUpper = (ascii: number) => {
    return asciiUpper <= ascii && ascii <= asciiLower;
};


let lines = readFileSync(
        join(__dirname, "day-3.txt"), 'utf-8'
    )
    .split("\n");


let itemPriority: Map<string, number> = new Map<string, number>();

// type Ruckstack = {
//     dpOne: Map<string, number>,
//     dpTwo: Map<string, number>,
//     commonPriority: number,
// }

let sumPriority: number = 0;

// for (let line of lines) {
//     let ruckstack: Ruckstack = {
//         dpOne: new Map<string, number>(),
//         dpTwo: new Map<string, number>(),
//         commonPriority: 0,
//     }

//     for (let i: number = 0; i < line.length / 2; i++) {
//         const item: string = line[i];
//         const ascii: number = item.charCodeAt(0);

//         if (!itemPriority.has(item)) {

//             if (isUpper(ascii)) {
//                 itemPriority.set(item, ascii - asciiUpper + 27);
//             } else {
//                 itemPriority.set(item, ascii - asciiLower + 1);
//             }
//         }

//         if (ruckstack.dpOne.has(item)) {
//             ruckstack.dpOne.set(item, ruckstack.dpOne.get(item) + 1);
//         } else {
//             ruckstack.dpOne.set(item, 1);
//         }
//     }

//     for (let i: number = line.length / 2; i < line.length; i++) {
//         const item: string = line[i];
//         const ascii: number = item.charCodeAt(0);

//         if (!itemPriority.has(item)) {
            
//             if (isUpper(ascii)) {
//                 itemPriority.set(item, ascii - asciiUpper + 27);
//             } else {
//                 itemPriority.set(item, ascii - asciiLower + 1);
//             }
//         }

//         if (ruckstack.dpTwo.has(item)) {
//             ruckstack.dpTwo.set(item, ruckstack.dpTwo.get(item) + 1);
//         } else {
//             ruckstack.dpTwo.set(item, 1);
//         }

//         if (ruckstack.dpOne.has(item)) {
//             ruckstack.commonPriority = itemPriority.get(item);
//         }
//     }

//     sumPriority += ruckstack.commonPriority;
// }

for (let i: number = 0; i < lines.length; i++) {
    let previousRuckstack: Set<string>;
    let commonItem: string;

    for (let j: number = 0; j < 3 && i + j < lines.length; j++) {
        let line = lines[i + j];

        console.log(line);

        let currentRuckstack: Set<string> = new Set<string>();
        
        for (let k: number = 0; k < line.length; k++) {
            const item: string = line[k];
            const ascii: number = item.charCodeAt(0);

            if (!itemPriority.has(item)) {

                if (isUpper(ascii)) {
                    itemPriority.set(item, ascii - asciiUpper + 27);
                } else {
                    itemPriority.set(item, ascii - asciiLower + 1);
                }
            }

            currentRuckstack.add(item);
        }

        if (j > 0) {
            let intersection: Set<string> = new Set(
                [...previousRuckstack].filter(x => currentRuckstack.has(x))
            )

            previousRuckstack = intersection;
        } else {
            previousRuckstack = currentRuckstack;
        }
    }

    console.log("");

    i += 2;

    sumPriority += itemPriority.get([...previousRuckstack][0]);
    
    console.log(sumPriority)
}

console.log(sumPriority);