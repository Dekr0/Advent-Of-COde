"use strict";
var _a;
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var decode = ["r", "p", "s"];
var asciiA = "A".charCodeAt(0);
var asciiX = "B".charCodeAt(0);
var score = {
    r: 1,
    p: 2,
    s: 3
};
var outcome = {
    r: { r: 3, p: 0, s: 6 },
    p: { r: 6, p: 3, s: 0 },
    s: { r: 0, p: 6, s: 3 }
};
var lines = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "day-2.txt"), 'utf-8')
    .split("\n");
var totalScore = 0;
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var p1Encode = void 0, p2Encode = void 0;
    _a = line.split(" "), p1Encode = _a[0], p2Encode = _a[1];
    var p1Choice = decode[p1Encode.charCodeAt(0) - asciiA];
    var p2Choice = decode[p2Encode.charCodeAt(0) - asciiX];
    var outcomeScore = outcome[p1Choice][p2Choice];
    totalScore += outcomeScore ? outcomeScore == 0 : outcomeScore + score[p2Choice];
}
console.log(totalScore);
