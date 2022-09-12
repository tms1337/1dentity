import loadYaml, { loadYaml_ } from "..";

describe("loadYaml", () => {
  it("loads yaml from the same folder correctly", () => {
    const result = loadYaml({ fileUrl: __dirname + "/test1.yaml" });

    expect(result).toBeDefined();
    expect(result).toEqual({
      type: "REST",
      endpoints: {
        "/gpt3/complete": {
          pipe: [
            {
              at: "services",
              which: "gpt3/complete",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
        "/gpt3/sentiment": {
          pipe: [
            {
              at: "services",
              which: "gpt3/sentiment",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
      },
    });
  });

  it("loads yaml from the same folder correctly using _ function", () => {
    const result = loadYaml_(__dirname + "/test1.yaml");

    expect(result).toBeDefined();
    expect(result).toEqual({
      type: "REST",
      endpoints: {
        "/gpt3/complete": {
          pipe: [
            {
              at: "services",
              which: "gpt3/complete",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
        "/gpt3/sentiment": {
          pipe: [
            {
              at: "services",
              which: "gpt3/sentiment",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
      },
    });
  });

  it("loads yaml from the subfolder correctly", () => {
    const fileUrl = __dirname + "/sub/test2.yaml";
    const result = loadYaml({ fileUrl });

    expect(result).toBeDefined();
    expect(result).toEqual({
      type: "REST",
      endpoints: {
        "/gpt3/complete": {
          pipe: [
            {
              at: "services",
              which: "gpt3/complete",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
        "/gpt3/sentiment": {
          pipe: [
            {
              at: "services",
              which: "gpt3/sentiment",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
      },
    });
  });

  it("loads yaml from the subfolder correctly using _", () => {
    const fileUrl = __dirname + "/sub/test2.yaml";
    const result = loadYaml_(fileUrl);

    expect(result).toBeDefined();
    expect(result).toEqual({
      type: "REST",
      endpoints: {
        "/gpt3/complete": {
          pipe: [
            {
              at: "services",
              which: "gpt3/complete",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
        "/gpt3/sentiment": {
          pipe: [
            {
              at: "services",
              which: "gpt3/sentiment",
            },
            {
              at: "wrappers",
              which: "express",
            },
          ],
        },
      },
    });
  });
});
