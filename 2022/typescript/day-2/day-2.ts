import { readFileSync } from "fs";
import { join } from "path";


const decode: string[] = ["r", "p", "s"];

const asciiA: number = "A".charCodeAt(0);
const asciiX: number = "X".charCodeAt(0);

const score = {
    r: 1,
    p: 2,
    s: 3,
};

const outcome: object = {
    r: {r: 3, p: 0, s: 6},
    p: {r: 6, p: 3, s: 0},
    s: {r: 0, p: 6, s: 3},
};

const matchChoice: object = {
    r: {X: "s", Y: "r", Z: "p"},
    p: {X: "r", Y: "p", Z: "s"},
    s: {X: "p", Y: "s", Z: "r"},
}

let lines = readFileSync(
        join(__dirname, "day-2.txt"),'utf-8'
    )
    .split("\n");

let totalScore: number = 0;

// for (let line of lines) {
//     let p1Encode: string, p2Encode: string;

//     [p1Encode, p2Encode] = line.split(" ");

//     let p1Choice: string = decode[p1Encode.charCodeAt(0) - asciiA];
//     let p2Choice: string = decode[p2Encode.charCodeAt(0) - asciiX];
    
//     let result: number = outcome[p2Choice][p1Choice] + score[p2Choice]; 
  
//     totalScore += result;
// }

for (let line of lines) {
    let p1Encode: string, p2Encode: string;

    [p1Encode, p2Encode] = line.split(" ");

    let p1Choice: string = decode[p1Encode.charCodeAt(0) - asciiA];
    
    let p2Choice: string = matchChoice[p1Choice][p2Encode];

    let result: number = outcome[p2Choice][p1Choice] + score[p2Choice];

    totalScore += result;
}

console.log(totalScore);