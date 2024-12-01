import { scaffold } from "./utils.ts";
import fn from "./01.ts";

scaffold("day 1", fn, [
  [
    "../input/01.sample.txt",
    11,
    31,
  ],
  [
    "../input/01.txt",
    2166959,
    23741109
  ]
]);