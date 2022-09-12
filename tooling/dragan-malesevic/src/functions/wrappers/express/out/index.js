// helpers
import { checkFormat_ } from "../../../../lib/format";
import { pipeAsync, toVariants_ } from "../../../../lib/functional";

// formats
import inputFormat, { inputSample } from "./format/input";
import outputFormat from "./format/output";

export const createExpressOut =
  ({} = {}) =>
  async (x = inputSample) =>
    x;

export const createExpressOut_ = () => createExpressOut();
export const expressOut = createExpressOut();
export const expressOut_ = () => expressOut();

export const expressOutFull = pipeAsync(
  checkFormat_(inputFormat),
  expressOut,
  checkFormat_(outputFormat)
);

export const def = {
  inputFormat,
  outputFormat,
  f: expressOutFull,
};
export default expressOutFull;
