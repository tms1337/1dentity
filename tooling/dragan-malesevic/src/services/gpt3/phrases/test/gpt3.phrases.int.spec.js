import { phrases_ } from "..";

// sample data
import text1 from "./text1";
import text2 from "./text2";

jest.setTimeout(30 * 10 ** 3);

describe("gpt3", () => {
  it("can extract phrases with default topN", async () => {
    const { data: result } = await phrases_(text1);

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
  });

  it("can extract phrases with custom topN", async () => {
    const { data: result } = await phrases_(text1, 10);

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
  });

  it("can extract phrases from text2 with custom topN", async () => {
    const { data: result } = await phrases_(text2, 7);

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
  });
});
