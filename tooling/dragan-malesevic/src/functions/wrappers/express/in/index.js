// helpers
import { checkFormat_ } from "../../../../lib/format";
import { pipeAsync } from "../../../../lib/functional";

// formats
import inputFormat, { inputSample } from "./format/input";
import outputFormat from "./format/output";

export const createExpressIn =
  ({} = {}) =>
  async (x = inputSample) =>
    x;

export const expressIn = createExpressIn();
export const expressIn_ = () => expressIn();

export const expressInFull = pipeAsync(
  checkFormat_(inputFormat),
  expressIn,
  checkFormat_(outputFormat)
);

export const def = {
  inputFormat,
  outputFormat,
  f: expressInFull,
};
export default expressInFull;
