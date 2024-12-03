import { Solver } from "./utils.ts";

const re = /mul\((\d+),(\d+)\)/g;


const fn: Solver<number> = async (lines) => {
    let sum = 0;
    for await (const line of lines) {
        for (let [, a, b] of line.matchAll(re)) {
            sum += Number.parseInt(a) * Number.parseInt(b);
        }
    }
    return [
        sum,
        0
    ];
}

export default fn;
