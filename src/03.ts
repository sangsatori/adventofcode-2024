import { Solver } from "./utils.ts";

const re = /(?<enable>do\(\))|(?<disable>don't\(\))|mul\((?<x>\d+),(?<y>\d+)\)/g;

const fn: Solver<number> = async (lines) => {
    let sum1 = 0;
    let sum2 = 0;
    let enabled = true;
    for await (const line of lines) {
        for (const [, enable, disable, x, y] of line.matchAll(re)) {
            if (enable)
                enabled = true;
            if (disable)
                enabled = false
            if (x && y) {
                const product = Number.parseInt(x) * Number.parseInt(y);
                sum1 += product;
                if (enabled)
                    sum2 += product;
            }
        }
    }

    return [sum1, sum2];
}

export default fn;
