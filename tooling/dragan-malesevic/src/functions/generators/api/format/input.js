import { exampleToYup } from "../../../../lib/format";

export const inputSample = { apiDef: {}, register: {} };

export const inputFormat = exampleToYup(inputSample);
export default inputFormat;
