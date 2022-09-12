import bodyParser from "body-parser";

// helpers
import { strequal } from "../../../lib/str";
import { pipeAsync } from "../../../lib/functional";

// format
import inputFormat, { inputSample } from "./format/input";
import outputFormat from "./format/output";

export const generateApiFromJson = ({ apiDef, register } = inputSample) => {
  const { type, endpoints: endpoints_ = [] } = apiDef;

  if (strequal(type, "REST")) {
    const express = require("express");
    const app = express();
    const { port = 3000 } = apiDef;

    app.use(bodyParser.json());

    const endpoints = Object.entries(endpoints_);

    const routes = endpoints.map(([at, params]) => {
      const method = params.method.toLowerCase();
      const pipe_ = pipeAsync(
        ...params.pipe.map((x) => {
          return register[x].f;
        })
      );

      app[method](at, pipe_);
    });

    return {
      start: async () => {
        app.listen(port, () => {
          console.log(`Example app listening on port ${port}`);
        });
      },
    };
  }
};

export const generateApiFromJson_ = (apiDef, register) =>
  generateApiFromJson({ apiDef, register });

export const def = {
  inputFormat,
  outputFormat,
  f: generateApiFromJson,
};
export default generateApiFromJson;
