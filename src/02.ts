import { Solver, reNumbers } from "./utils.ts";

const fn: Solver<number> = async (lines) => {
    let countSafe = 0;

    parseLine:
    for await (const line of lines) {
        let prev = null;
        let order = null;
        for (const [val] of line.matchAll(reNumbers)) {
            const next = Number.parseInt(val, 10);
            if (prev) {
                order ??= (next > prev) ? 'asc' : 'dsc';
                const dt = next - prev;
                if ((
                    order === 'asc' &&
                    !(dt > 0 && dt < 4)
                ) || (
                    order === 'dsc' &&
                    !(dt < 0 && dt > -4)
                )) continue parseLine;
            }
            prev = next;
        }
        countSafe++;
    }
    return [
        countSafe,
        0
    ];
}

export default fn;
