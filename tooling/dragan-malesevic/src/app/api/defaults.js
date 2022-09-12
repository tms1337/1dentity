// helpers
import { loadYaml_ } from "../../lib/yaml/load";
import { generateApiFromJson_ } from "../../functions/generators/api";

// defs
import { def as completeDef } from "../../services/gpt3/complete";
import { def as sentimentDef } from "../../services/gpt3/sentiment";

// wrappers
import { def as expressInWrapperDef } from "../../functions/wrappers/express/in";
import { def as expressOutWrapperDef } from "../../functions/wrappers/express/out";

export const register = {
  "services/gpt3/complete": completeDef,
  "services/gpt3/sentiment": sentimentDef,

  "wrappers/express/in": expressInWrapperDef,
  "wrappers/express/out": expressOutWrapperDef,
};

export const apiDef = loadYaml_(__dirname + "/api.schema.yaml");

export const app = generateApiFromJson_(apiDef, register);
