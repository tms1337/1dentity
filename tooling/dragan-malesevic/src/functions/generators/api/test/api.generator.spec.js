import generateApiFromJson, { generateApiFromJson_ } from "..";

import { loadYaml_ } from "../../../../lib/yaml/load";

import { def as completeDef } from "../../../../services/gpt3/complete";
import { def as sentimentDef } from "../../../../services/gpt3/sentiment";

import { def as expressInWrapperDef } from "../../../wrappers/express/in";
import { def as expressOutWrapperDef } from "../../../wrappers/express/out";

const register = {
  "services/gpt3/complete": completeDef,
  "services/gpt3/sentiment": sentimentDef,

  "wrappers/express/in": expressInWrapperDef,
  "wrappers/express/out": expressOutWrapperDef,
};

const apiDef = loadYaml_(__dirname + "/api.schema.yaml");

describe("apiFromJson", () => {
  it("generates correct REST api", async () => {
    const result = generateApiFromJson({ apiDef, register });

    expect(result.start).toBeDefined();
  });

  it("generates correct REST api using _", async () => {
    const result = generateApiFromJson_(apiDef, register);

    expect(result.start).toBeDefined();
  });
});
