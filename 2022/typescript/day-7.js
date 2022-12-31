"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var Component = /** @class */ (function () {
    function Component(name, size, parent) {
        if (parent === void 0) { parent = null(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))); }
        this.name = name;
        this.size = size;
        this.parent = parent;
    }
    Component.prototype.getSize = function () {
        return this.size;
    };
    return Component;
}());
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return File;
}(Component));
var Folder = /** @class */ (function (_super) {
    __extends(Folder, _super);
    function Folder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.components = [];
        return _this;
    }
    Folder.prototype.addComponent = function (component) {
        this.components.push(component);
    };
    Folder.prototype.getSize = function () {
        this.size = 0;
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var components = _a[_i];
            this.size += components.getSize();
        }
        return this.size;
    };
    return Folder;
}(Component));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
        this.structure = new Map();
        this.pwd = null;
        this.structure.set("/", new Folder("/", 0));
    }
    FileSystem.prototype.cd = function (dir) {
        if (dir === "..") {
            if (this.pwd.name === "/") {
                return;
            }
            this.pwd = this.pwd.parent;
        }
        else {
            this.pwd = this.structure.get(dir);
        }
    };
    FileSystem.prototype.getComponent = function (name) {
        return this.structure.get(name);
    };
    return FileSystem;
}());
function solve() {
    var lines = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "day-7-ex.txt"), "utf-8")
        .split("\n");
    var fileSystem = new FileSystem();
}
solve();
var templateObject_1;
