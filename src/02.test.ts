import { scaffold } from "./utils.ts";
import fn from "./02.ts";

scaffold("day 2", fn, [
  [
    "../input/02.sample.txt",
    2,
    0,
  ],
  [
    "../input/02.txt",
    660,
    0
  ]
]);