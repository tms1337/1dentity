import { mergeDeepRight } from "ramda";

// helpers
import { checkFormat_ } from "../format";

export const pipeAsync =
  (...fs) =>
  async (x) => {
    let result = await x;
    for (const f of fs) {
      if (!f) {
        continue;
      } else {
        result = await f(result);
      }
    }

    return result;
  };

export const arrayify = (x) => (Array.isArray(x) ? x : [x]);

export const flatMapAsync =
  (...fs) =>
  async (x) => {
    return x;
  };

export const flattenArgs =
  (f) =>
  (...args) =>
    f(args.map((x) => ({ [x]: x })).reduce(mergeDeepRight, {}));
