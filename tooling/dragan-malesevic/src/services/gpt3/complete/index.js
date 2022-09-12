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

export const createComplete =
  ({
    apiKey = UPSTART_OPENAI_API_KEY,
    logger = createLoggerWithPrefix_("services_gpt3"),
  } = {}) =>
  async ({ prompt, tokens } = inputSample) => {
    logger.debug({ prompt, tokens });

    const openai = new OpenAI(apiKey);

    const response = await openai.complete({
      engine: "davinci",
      prompt,
      maxTokens: tokens,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["\n"],
    });

    const {
      data: {
        choices: [result_],
      },
    } = response;
    logger.debug({ result_ });

    const result = result_.text.trim();
    logger.debug({ result });

    return { data: result };
  };

export const createComplete_ = (apiKey, logger) =>
  createComplete({ apiKey, logger });
export const complete = createComplete();
export const complete_ = (prompt, tokens) => complete({ prompt, tokens });

export const completeFull = pipeAsync(
  checkFormat_(inputFormat),
  complete,
  checkFormat_(outputFormat)
);

export const def = {
  inputFormat,
  outputFormat,
  f: completeFull,
};
export default completeFull;
