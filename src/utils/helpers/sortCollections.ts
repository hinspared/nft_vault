import { type Collection } from "@prisma/client";

export default function sortBy(
  collections: Collection[],
  arg1: keyof Collection,
  arg2: string
) {
  const up = collections
    .map((copy) => copy)
    .sort((a, b) => Number(a[arg1]) - Number(b[arg1]));
  const down = collections
    .map((copy) => copy)
    .sort((a, b) => Number(b[arg1]) - Number(a[arg1]));
  return arg2 === "down" ? up : down;
}
