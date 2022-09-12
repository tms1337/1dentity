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

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const createSentiment =
  ({
    apiKey = UPSTART_OPENAI_API_KEY,
    logger = createLoggerWithPrefix_("services_gpt3"),
  } = {}) =>
  async ({ sentence } = inputSample) => {
    logger.debug({ sentence });

    const openai = new OpenAI(apiKey);

    const response = await openai.complete({
      engine: "text-davinci-002",
      prompt: `Query: Calculate the sentiment score from -1 to 1 with granularity 0.1 for the next text.\n\n
Text: ${sentence}\n\n
Sentiment score:`,
      maxTokens: 128,
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      bestOf: 1,
      stop: ["\n"],
    });

    const {
      data: {
        choices: [{ text: result_ }],
      },
    } = response;
    logger.debug({ result_ });

    const result =
      parseFloat(result_) > 0.525
        ? "Positive"
        : parseFloat(result_) > -0.525
        ? "Neutral"
        : "Negative";
    logger.debug({ result });

    return { data: result };
  };

export const createSentiment_ = (apiKey, logger) =>
  createSentiment({ apiKey, logger });
export const sentiment = createSentiment();
export const sentiment_ = (sentence) => sentiment({ sentence });

export const sentimentFull = pipeAsync(
  checkFormat_(inputFormat),
  sentiment,
  checkFormat_(outputFormat)
);

export const def = {
  inputFormat,
  outputFormat,
  f: sentimentFull,
};
export default sentimentFull;
