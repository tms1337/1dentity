import { sentiment, sentiment_ } from "..";

import data from "./data";

jest.setTimeout(120 * 10 ** 3);

describe("gpt3 sentiment bench", () => {
  it("can run example", async () => {
    const results = await Promise.all(
      data.map(async (sentence) => {
        if (Math.random() < 0.2) {
          const { data: result } = await sentiment_(sentence);

          expect(result).toBeDefined();
          expect(result.length > 0).toBe(true);

          return sentence + "|" + result;
        }
      })
    );
  });
});
