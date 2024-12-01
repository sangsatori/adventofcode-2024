import { Solver, reNumbers } from "./utils.ts";

/**
 * Gets next smallest pair from both inputs
 */
const getNextSmallestPair = function* (L: number[], R: number[]) {
    const length = L.length;
    let i = 0;
    while (i < length) {
        yield [L[i], R[i]].sort();
        i++;
    }
}

const fn: Solver<number> = async (lines) => {
    const L: number[] = [];
    const R: number[] = [];
    {
        let i = 0;
        for await (const line of lines)
            for (const [token] of line.matchAll(reNumbers)) {
                (i % 2 ? R : L).push(Number.parseInt(token, 10));
                i++;
            }
    }
    L.sort(); R.sort();

    const countsInR = R.reduce(
        (counts, k) =>
            counts.set(
                k,
                (counts.get(k) || 0) + 1),
        new Map<number, number>());

    {
        let distanceSum = 0;
        let similarityScore = 0;
        for (const [a, b] of getNextSmallestPair(L, R))
            distanceSum += (b - a);
    
        for (const k of L)
            similarityScore += k * (countsInR.get(k) || 0 );
    
        return [
            distanceSum,
            similarityScore
        ];
    }
}

export default fn;
