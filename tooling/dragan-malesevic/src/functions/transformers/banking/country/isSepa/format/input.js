import { any } from "ramda";

// helpers
import { strequal } from "../../../../../../lib/str";
import { exampleToYup } from "../../../../../../lib/format";

// data
import { myCountryList } from "../data";

const isInCountryList = (x) => myCountryLis.some((y) => strequal(x, y));

export const inputSample = {
  country: "BA",
  country_: isInCountryList,
};

const inputFormat = exampleToYup(inputSample);
export default inputFormat;
