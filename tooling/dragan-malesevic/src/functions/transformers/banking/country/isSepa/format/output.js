// helpers
import { exampleToYup } from "../../../../../../lib/format";

export const outputSamle = {
  data: { isSEPA: false },
};

const outputFormat = exampleToYup(outputSamle);
export default outputFormat;
