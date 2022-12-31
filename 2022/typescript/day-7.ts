import { readFileSync } from 'fs';
import { join } from 'path';


class Components {
    public path: string;
    public size: number;

    constructor(path: string, size: number) {
        this.path = path;
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }
}


class File extends Components {

}


class Folder extends Components {
    public components: Components[] = [];

    constructor(path: string, size: number) {
        super(path, size);
    }

    getSize(): number {
        let size = 0;

        for (let component of this.components) {
            size += component.getSize();
        }

        this.size = size;

        return size;
    }

    addComponent(component: Components): void {
        this.components.push(component);
    }
}


let paths: string[] = [];
let components: Map<string, Components> = new Map();


function cd(dir: string): void {
    if (dir === "..") {
        paths.pop();

        return;
    }

    paths.push(dir);
}


function pwd(): string {
    let path: string = paths.join("/");
    if (path.startsWith("//")) {
        path = path.slice(1);
    }

    return path;
} 


let lines = readFileSync(
    join(__dirname, "day-7.txt"), "utf-8"
    )
    .split("\n");

for (let line of lines) {
    if (line.startsWith("$ cd")) {
        let dir: string = line.split(" ")[2];

        cd(dir);

        let path: string = pwd();

        if (!components.has(path)) {
            components.set(path, new Folder(path, 0));
        }
    } else if (line.startsWith("dir")) {
        let [_, name]: string[] = line.split(" ");

        let dir: string = pwd();
        
        cd(name);
        let path: string = pwd();

        cd("..");

        if (!components.has(path)) {
            components.set(path, new Folder(path, 0));

            let parent: Folder = components.get(dir) as Folder;

            parent.addComponent(components.get(path) as Components);
        }
    } else if (line.startsWith("$ ls")) {
        continue;
    } else {
        let [size, name]: string[] = line.split(" ");

        let dir: string = pwd();

        cd(name);
        let path: string = pwd();

        cd("..");

        if (!components.has(path)) {
            components.set(path, new File(path, parseInt(size)));

            let parent: Folder = components.get(dir) as Folder;

            parent.addComponent(components.get(path) as Components);
        }
    }
}

// let total: number = 0;

const unused: number = 70000000 - (components.get("/")?.getSize() as number);
const update: number = 30000000;

let min: number = components.get("/")?.getSize() as number;

for (let component of components.values()) {
    // console.log(component.path, component.getSize());
    if (component instanceof Folder) {
        // console.log("Subcomponents:")
        // for (let c of component.components) {
        //     console.log(c.path, c.getSize());
        // }

        const size: number = component.getSize();
        if (size + unused > update) {
            min = Math.min(min, size);
        }
    }

    // console.log();
}

// console.log(total);
console.log(min);