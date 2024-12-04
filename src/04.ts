import { Solver } from "./utils.ts";

const searchSeq = 'MAS';
const searchVectors90Deg = [ // 90-degree straight
    [-1, 0],    // up:          Y (-1) X (0)
    [1, 0],     // down:        Y (+1) X (0)
    [0, 1],     // right:       Y (0)  X (+1)
    [0, -1]     // left:        Y (0)  X (-1)
];
const searchVectors45 = [ // 45-degree diagnonal
    [-1, 1],    // RightTop:    Y (-1) X (+1)
    [1, 1],     // RightBottom: y (+1) x (+1)
    [1, -1],    // LeftBottom:  Y (+1) x (-1)
    [-1, -1]    // LeftTop:     y (-1) x (-1)
];

const searchVectorsFull = [...searchVectors90Deg, ...searchVectors45];

const fn: Solver<number> = async (lines) => {
    const matrix: string[][] = []; // y, x (keep it 2D)
    const startingPointsX: [number, number][] = [];
    const startingPointsA: [number, number][] = [];

    {
        let y = 0;
        for await (const line of lines) {
            matrix[y] = [];
            let x = 0;
            for (const char of line) {
                if (char === 'X')
                    startingPointsX.push([y, x]);
                else if (searchSeq.includes(char)) {
                    matrix[y][x] = char;
                    if (char === 'A')
                        startingPointsA.push([y, x]);
                } x++;
            } y++;
        }
    }

    return [
        startingPointsX.reduce((sum, [startY, startX]) => {
            let matches = 0;
        
            searchLoop:
            for (const [dtY, dtX] of searchVectorsFull) {
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
        }, 0),
        startingPointsA.reduce((sum, [startY, startX]) => {
            const foundM = searchVectors45.filter(([dtY, dtX]) =>
                matrix?.[startY+dtY]?.[startX+dtX] === 'M');
    
            if (foundM.length === 2) {
                const foundS = foundM.filter(([dtY, dtX]) => 
                    matrix?.[startY-dtY]?.[startX-dtX] === 'S');
    
                if (foundS.length === 2)
                    return sum + 1;
            }
            return sum;
        }, 0)
    ];
}

export default fn;
