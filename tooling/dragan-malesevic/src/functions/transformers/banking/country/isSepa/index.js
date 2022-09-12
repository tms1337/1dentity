import { pipeAsync } from "../../../../../lib/functional";

// helpers
import { checkFormat_ } from "../../../../../lib/format";
import { strequal } from "../../../../../lib/str";

// formats
import inputFormat, { inputSample } from "./format/input";
import outputFormat from "./format/output";

import { myCountryList } from "./data";

const createIsSepa =
  ({ countryList } = { countryList: myCountryList }) =>
  async ({ country } = inputSample) => {
    const is = countryList.some((x) => strequal(x, country));

    return { data: is };
  };
export const createIsSepa_ = (countryList) => createIsSepa({ countryList });

export const isSepa = createIsSepa();
export const isSepa_ = (country) => isSepa({ country });

export const isSepaFull = pipeAsync(
  checkFormat_(inputFormat),
  isSepa,
  checkFormat_(outputFormat)
);

export const def = {
  inputFormat,
  outputFormat,
  f: isSepaFull,
};
export default isSepaFull;
