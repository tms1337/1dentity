// helpers
import { exampleToYup } from "../../../../lib/format";

export const inputSample = {
  sentence: "Johny is a human",
};

const inputFormat = exampleToYup(inputSample);
export default inputFormat;
