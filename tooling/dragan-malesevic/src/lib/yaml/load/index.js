import yaml from "js-yaml";
import fs from "fs";

export const loadYaml = ({ fileUrl }) => {
  const doc = yaml.load(fs.readFileSync(fileUrl, "utf8"));
  return doc;
};

export const loadYaml_ = (fileUrl) => loadYaml({ fileUrl });

export default loadYaml;
