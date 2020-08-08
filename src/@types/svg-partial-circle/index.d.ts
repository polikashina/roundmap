/// <reference types="node" />

declare module "svg-partial-circle" {
  import partialCircle from "svg-partial-circle";

  type Path = (string | number)[];

  export default function partialCircle(cx: number, cy: number, r: number, start: number, end: number): Path[];
}
