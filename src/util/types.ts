export type UnwrapArray<T> = T extends Array<infer T>
  ? T
  : unknown;
