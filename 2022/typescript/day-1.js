"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var lines = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'day-1.txt'), 'utf-8').split('\n');
var elf;
var elf_number = 0;
var elfs = [];
var max_calories = 0;
for (var i = 0; i < lines.length; i++) {
    var total_calories = 0;
    var item_calories = [];
    for (var j = i; j < lines.length; j++) {
        if (lines[j].length == 0) {
            i = j;
            break;
        }
        var calories = parseInt(lines[j], 10);
        item_calories.push(calories);
        total_calories += calories;
    }
    elfs.push({
        elf_number: elf_number,
        item_calroies: item_calories,
        total_calories: total_calories
    });
    if (total_calories > max_calories) {
        max_calories = total_calories;
    }
    elf_number++;
}
elfs.sort(function (a, b) {
    return b.total_calories - a.total_calories;
});
var top_three_total = 0;
for (var i = 0; i < 3; i++) {
    top_three_total += elfs[i].total_calories;
}
console.log(top_three_total);
