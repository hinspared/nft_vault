import { escapeRegExp } from ".";

describe("escapeRegExp", () => {
  it("escapes special characters in a string", () => {
    expect(escapeRegExp("[-[]{}()*+?.,\\^$|#\\s")).toBe(
      "\\[\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\\\\\^\\$\\|\\#\\\\s"
    );
  });

  it("leaves normal characters unchanged", () => {
    expect(escapeRegExp("abcdefghijklmnopqrstuvwxyz")).toBe(
      "abcdefghijklmnopqrstuvwxyz"
    );
  });

  it("returns an empty string for an empty input", () => {
    expect(escapeRegExp("")).toBe("");
  });

  it("handles a string with multiple special characters", () => {
    expect(escapeRegExp("[-[]{}()*+?.,\\^$|#\\sabc")).toBe(
      "\\[\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\\\\\^\\$\\|\\#\\\\sabc"
    );
  });

  it("handles a string with special characters at the beginning and end", () => {
    expect(escapeRegExp("[-[]{}()*+?.,\\^$|#\\sabc[]{}()*+?.,\\^$|#\\s")).toBe(
      "\\[\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\\\\\^\\$\\|\\#\\\\sabc\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\\\\\^\\$\\|\\#\\\\s"
    );
  });
});
