import { sentiment, sentiment_ } from "..";

describe("gpt3 sentiment", () => {
  it("can calculate default sentiment", async () => {
    const { data: result } = await sentiment();

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(result).toEqual("Neutral");
  });

  it("can calculate positive sentiment", async () => {
    const { data: result } = await sentiment({
      sentence: "I loved the new Batman movie",
    });

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(result).toEqual("Positive");
  });

  it("can calculate positive sentiment using _", async () => {
    const { data: result } = await sentiment_("I loved the new Batman movie!");

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(result).toEqual("Positive");
  });

  it("can calculate negative sentiment using _", async () => {
    const { data: result } = await sentiment_(
      "I didn't really fancy new Batman movie too much"
    );

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(result).toEqual("Negative");
  });

  it("can calculate negative sentiment using _", async () => {
    const { data: result } = await sentiment_(
      "The intended objective was achieved however deployment was not your responsibility, hence can't be attributed to you."
    );

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(
      result.indexOf("Negative") !== -1 || result.indexOf("Neutral") !== -1
    ).toBe(true);
  });

  it("can calculate negative sentiment using _", async () => {
    const { data: result } = await sentiment_(
      "Made attempts to plan ahead to ensure minimal unknown bugs in team's work, however often lost track along the way.  Often demonstrated awareness of code related bottlenecks but can improve further."
    );

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(
      result.indexOf("Negative") !== -1 || result.indexOf("Neutral") !== -1
    ).toBe(true);
  });

  it("can calculate neutral sentiment using _", async () => {
    const { data: result } = await sentiment_(
      "Deploys a problem-solving mindset to find root cause and also optimized processes to avoid repeat mistakes. However is usually more reactive than proactive. Can improve on shipping timelines."
    );

    expect(result).toBeDefined();
    expect(result.length > 0).toBe(true);
    expect(
      result.indexOf("Positive") !== -1 || result.indexOf("Neutral") !== -1
    ).toBe(true);
  });
});
