const [day] = Deno.args;
const padded = day.padStart(2, "0");

await Deno.writeTextFile(`./src/${padded}.ts`, `
import { Solver } from "./utils.ts";

const fn: Solver<number> = async (lines) => {
    const result: [number, number] = [0, 0];
    for await (const line of lines) {
        // do stuff
    }
    return result;
}

export default fn;`);
await Deno.writeTextFile(`./src/${padded}.test.ts`, `
import { scaffold } from "./utils.ts";
import fn from "./${padded}.ts";

scaffold("day ${day}", fn, [
  [
    "../input/${padded}.sample.txt",
    0,
    0,
  ],
  [
    "../input/${padded}.txt",
    0,
    0
  ]
]);`);
await Deno.create(`./input/${padded}.sample.txt`);
await Deno.create(`./input/${padded}.txt`)
