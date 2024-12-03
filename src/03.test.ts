import { scaffold } from "./utils.ts";
import fn from "./03.ts";

scaffold("day 3", fn, [
  [
    "../input/03.sample.txt",
    161,
    48,
  ],
  [
    "../input/03.txt",
    174103751,
    100411201
  ]
]);