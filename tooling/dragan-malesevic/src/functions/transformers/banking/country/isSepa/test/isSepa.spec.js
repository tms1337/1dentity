import isSepaFull, { isSepa_ } from "..";

describe("banking isSepa", () => {
  it("runs for BA", async () => {
    const { data: result } = await isSepa_("BA");

    expect(result).toEqual(true);
  });

  it("runs for AMFIBIJA", async () => {
    const { data: result } = await isSepaFull("AMFIBIJA");

    expect(result).toEqual(false);
  });
});
