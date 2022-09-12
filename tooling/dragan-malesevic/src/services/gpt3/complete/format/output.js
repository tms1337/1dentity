// helpers
import { exampleToYup } from "../../../../lib/format";

export const outputFormat_ = {
  data: "and that is all folks.",
};

const outputFormat = exampleToYup(outputFormat_);
export default outputFormat;
