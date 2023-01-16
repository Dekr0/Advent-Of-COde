import { exit } from 'process';
import { read } from '../util';


let trees: number[][] = [];
let numRow = 0;
let numCol = 0;


function solve() {
    // Remember to delete the last line in the file.
    const lines = read('day-8/day-8.txt', '\n');

    for (let i = 0; i < lines.length; i++) {
        trees[i] = [];
        for (let j = 0; j < lines[i].length; j++) {    
            let height = parseInt(lines[i][j]);
            trees[i].push(height);
        }
    }

    let numRow = trees.length;
    let numCol = trees[0].length;
    let count = numRow * 2 + (numCol - 2) * 2;

    let highestScenicScore = 0;

    for (let row = 1; row < numRow - 1; row++) {
        let visitedTallestTree = {col: 0, height: trees[row][0]}; // for part 1 

        for (let col = 1; col < numCol - 1; col++) {
            let height = trees[row][col];

            // if (trees[row][0] >= height && trees[row][numCol - 1] >= height && trees[0][col] >= height && trees[numRow - 1][col] >= height) {
            //     continue;
            // }

            // let isVisibleLeft = true;
            // let isVisibleRight = true;
            // let isVisibleUp = true;
            // let isVisibleDown = true;

            // if (visitedTallestTree.height >= height) {
            //     isVisibleLeft = false;
            // } else {
            //     visitedTallestTree = {col, height};

            //     count += 1;
            //     continue;
            // }

            // for (let i = col + 1; i < numCol; i++) {
            //     if (trees[row][i] >= height) {
            //         isVisibleRight = false;
            //         break;
            //     }
            // }

            // // look at up
            // for (let i = 0; i < numRow; i++) {
            //     if (trees[i][col]>= height) {
            //         if (i < row) {
            //             isVisibleUp = false;
            //             i = row;
            //         } else {
            //             isVisibleDown = false;
            //             break;
            //         }
            //     }
            // }

            // if (isVisibleLeft || isVisibleRight || isVisibleUp || isVisibleDown) {
            //     count += 1;
            // }

            let visibleLeft = 0;
            let visibleRight = 0;
            let visibleUp = 0;
            let visibleDown = 0;

            for (let i = col - 1; i >= 0; i--) {
                visibleLeft += 1;
                if (trees[row][i] >= height) {
                    break;
                }
            }

            for (let i = col + 1; i < numCol; i++) {
                visibleRight += 1;
                if (trees[row][i] >= height) {
                    break;
                }
            }

            for (let i = row - 1; i >= 0; i--) {
                visibleUp += 1;
                if (trees[i][col] >= height) {
                    break;
                }
            }

            for (let i = row + 1; i < numRow; i++) {
                visibleDown += 1;
                if (trees[i][col] >= height) {
                    break;
                }
            }

            let scenicScore = visibleLeft * visibleRight * visibleUp * visibleDown;
            highestScenicScore = Math.max(highestScenicScore, scenicScore);
        }
    }

    return highestScenicScore;
    // return count;
}


console.log(solve());