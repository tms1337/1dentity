require("dotenv").config();

import OpenAI from "openai-api";

// helpers
import { checkFormat, checkFormat_ } from "../../../lib/format";
import { pipeAsync } from "../../../lib/functional";
import { createLoggerWithPrefix_ } from "../../../lib/logger";

// format
import inputFormat, { inputSample } from "./format/input";
import outputFormat from "./format/output";

// envs
const { UPSTART_OPENAI_API_KEY } = process.env;

export const createPhrases =
  ({
    apiKey = UPSTART_OPENAI_API_KEY,
    logger = createLoggerWithPrefix_("services_gpt3"),
  } = {}) =>
  async ({ prompt, topN = 5 } = inputSample) => {
    logger.debug({ prompt, topN });

    const openai = new OpenAI(apiKey);

    const response = await openai.complete({
      prompt: `Extract most frequent phrases from text:\n\n
${prompt.substring(0, 4000).replace("\n\n", "\nText: ")}.\n\n
| Phrase | Frequency |`,
      engine: "text-davinci-002",
      temperature: 0.1,
      max_tokens: 15 * topN,
      top_p: 1,
      bestOf: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
    });

    const {
      data: {
        choices: [result_],
      },
    } = response;

    const result = result_.text
      .trim()
      .split("\n")
      .slice(1)
      .map((x) => x.split("|"))
      .map((x) => [x?.[1]?.trim(), x?.[2]?.trim()]);

    return { data: result };
  };

export const createPhrases_ = (apiKey, logger) =>
  createPhrases({ apiKey, logger });
export const phrases = createPhrases();
export const phrases_ = (prompt, topN) => phrases({ prompt, topN });

export const phrasesFull = pipeAsync(
  checkFormat_(inputFormat),
  phrases,
  checkFormat_(outputFormat)
);

export const def = {
  inputFormat,
  outputFormat,
  f: phrasesFull,
};
export default phrasesFull;
