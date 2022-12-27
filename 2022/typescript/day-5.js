"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var lines = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "day-5.txt"), "utf-8")
    .split("\n");
var divide = 0;
for (var i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("move")) {
        divide = i - 2;
        break;
    }
}
var stackCount = parseInt(lines[divide].at(lines[divide].length - 2));
var stacks = [];
for (var i = 0; i < stackCount; i++) {
    stacks.push([]);
}
for (var i = divide - 1; i >= 0; i--) {
    var line = lines.at(i);
    var j = 0;
    var char = void 0;
    var stackIndex = 0;
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
for (var i = divide + 2; i < lines.length; i++) {
    var line = lines
        .at(i)
        .replace(/((move)|(from)|(to)) /g, "");
    var _a = line.split(" ").map(Number), crateCount = _a[0], from = _a[1], to = _a[2];
    if (crateCount === 1) {
        stacks[to - 1].push(stacks[from - 1].pop());
    }
    else {
        stacks[from - 1].reverse();
        for (var j = 0; j < crateCount; j++) {
            stacks[to - 1].push(stacks[from - 1].pop());
        }
    }
    for (var _i = 0, stacks_1 = stacks; _i < stacks_1.length; _i++) {
        var stack = stacks_1[_i];
        console.log(stack.join(" "));
    }
    console.log();
}
