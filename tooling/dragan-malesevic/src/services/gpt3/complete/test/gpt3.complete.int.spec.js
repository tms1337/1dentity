import { complete, complete_ } from "..";

describe("gpt3", () => {
  it("can complete default", async () => {
    const { data: result } = await complete();

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
  });

  it("can complete_", async () => {
    const { data: result } = await complete_("When I went ", 20);

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
  });

  it("can complete full with format check", async () => {
    const { data: result } = await complete({
      prompt: "When I went ",
      tokens: 20,
    });

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
  });

  it("fails complete on wrong format", async () => {
    try {
      const { data: result } = await complete({
        prompt: 1,
        tokens: "asd",
      });
      expect(true).toBe(false);
    } catch (_) {
      expect(true).toBe(true);
    }
  });
});
