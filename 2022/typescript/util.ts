import { join } from 'path';
import { readFileSync } from 'fs';


export function read(filename: string, separator: string): string[] {
    return readFileSync(join(__dirname, filename), 'utf-8').split(separator);
}