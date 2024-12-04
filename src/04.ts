import { Solver } from "./utils.ts";

const searchSeq = 'MAS';
const searchVectors = [ // all the permutations apart from [0, 0] really
    [-1, 0],    // up:          Y (-1) X (0)
    [1, 0],     // down:        Y (+1) X (0)
    [0, 1],     // right:       Y (0)  X (+1)
    [0, -1],    // left:        Y (0)  X (-1)
    [-1, 1],    // RightTop:    Y (-1) X (+1)
    [1, 1],     // RightBottom: y (+1) x (+1)
    [1, -1],    // LeftBottom:  Y (+1) x (-1)
    [-1, -1]    // LeftTop:     y (-1) x (-1)
];

const fn: Solver<number> = async (lines) => {
    const matrix: string[][] = []; // y, x (keep it 2D)
    const startingPoints: [number, number][] = [];

    {
        let y = 0;
        for await (const line of lines) {
            matrix[y] = [];
            let x = 0;
            for (const char of line) {
                if (char === 'X') {
                    startingPoints.push([y, x]);
                } else if (searchSeq.includes(char)) {
                    matrix[y][x] = char;
                }
                x++;
            }
            y++;
        }
    }

    const sum1 = startingPoints.reduce((sum, [startY, startX]) => {
        let matches = 0;
    
        searchLoop:
        for (const [dtY, dtX] of searchVectors) {
            let y = startY;
            let x = startX;
            for (const char of searchSeq) {
                y += dtY;
                x += dtX;
                if (char !== matrix?.[y]?.[x])
                    continue searchLoop;
            }
            matches++;
        }
        return sum + matches;
    }, 0);

    return [sum1, 0];
}

export default fn;
