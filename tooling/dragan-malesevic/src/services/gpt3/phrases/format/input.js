// helpers
import { exampleToYup } from "../../../../lib/format";

export const inputSample = {
  prompt: "Hello johny",
  topN: 5,
};

const inputFormat = exampleToYup(inputSample);
export default inputFormat;
