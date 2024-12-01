import { Solver, reNumbers } from "./utils.ts";

// right, had a generic to infer turn type...
const fn: Solver<number> = async (lines) => {
    // uh how I do these definitions right...
    const L: number[] = [];
    const R: number[] = [];

    let distanceSum = 0;
    let similarityScore = 0;

    // we need to load both in memory
    let i = 0;
    for await (const line of lines) {
        for (const [token] of line.matchAll(reNumbers)) {
            (i % 2 ? R : L).push(Number.parseInt(token, 10));
            i++;
        }
    }
    // NOW WE HAVE COMPLETE LISTS

    const length = L.length;

    // sorts in-place
    L.sort();
    R.sort();

    const countsInR = R.reduce(
        (counts, k) => counts.set(k, (counts.get(k) || 0) + 1),
        new Map<number, number>());
    
    // TODO: docs on always returning in ascending order
    const getSmallestPair = function* () {
        let i = 0;
        while (i < length) {
            // maybe ensure they're always in ascending order?
            yield [L[i], R[i]].sort();
            i++;
        }
    }

    // NOW ACTUALLY COMPUTE RESULTS
    for (const [a, b] of getSmallestPair())
        distanceSum += (b - a);

    for (const k of L)
        similarityScore += k * (countsInR.get(k) || 0 );

    return [
        distanceSum,
        similarityScore
    ];
}

export default fn;