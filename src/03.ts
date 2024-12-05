import { Solver } from "./utils.ts";

const re = /(?<enable>do\(\))|(?<disable>don't\(\))|mul\((?<x>\d+),(?<y>\d+)\)/g;

const fn: Solver<number> = async (lines) => {
    const result: [number, number] = [0, 0];

    let enabled = true;
    for await (const line of lines) {
        for (const { groups: { enable, disable, x, y } = {}} of line.matchAll(re)) {
            if (enable)
                enabled = true;
            if (disable)
                enabled = false
            if (x && y) {
                const product = Number.parseInt(x) * Number.parseInt(y);
                result[0] += product;
                if (enabled)
                    result[1] += product;
            }
        }
    }

    return result;
}

export default fn;
