// helpers
import { loadYaml_ } from "../../../src/lib/yaml/load";
import { generateApiFromJson_ } from "../../../src/functions/generators/api";

// defs
import { def as completeDef } from "../../../src/services/gpt3/complete";

// wrappers
import { def as expressInWrapperDef } from "../../../src/functions/wrappers/express/in";
import { def as expressOutWrapperDef } from "../../../src/functions/wrappers/express/out";

const register = {
  "services/gpt3/complete": completeDef,

  "wrappers/express/in": expressInWrapperDef,
  "wrappers/express/out": expressOutWrapperDef,
};

const apiDef = loadYaml_(__dirname + "/api.schema.yaml");

const app = generateApiFromJson_(apiDef, register);

app.start();
