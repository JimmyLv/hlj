const { execSync } = require("child_process");

const exec = (cmd) => {
  try {
    return execSync(
        "node src/" + cmd.split(" ")[0] + ".js" + " " + cmd.split(" ")[1]
    ).toString();
  } catch (e) {
    return e;
  }
};

describe("JavaScript TDD framework", () => {
  it("is a CLI program", () => {
    const stdout = exec("hlj sum.test.js");
    expect(stdout).toContain("PASS");
  });
  it("should return PASS when test passed", () => {
    const stdout = exec("hlj sum.test.js");
    expect(stdout).toContain("PASS");
  });
  it('should return ERROR when test failed', () => {
    const stdout = exec("hlj failed.test.js");
    expect(stdout).toContain("ERROR");
  });
  describe('Test report', () => {
    it('should output number of tests passed', () => {
      const stdout = exec("hlj two-tests.test.js");
      expect(stdout).toBe("" +
          "PASS two-tests.test.js\n" +
          "Tests: 2 passed, 2 total\n");
    });
    it('should output number of tests passed while there are failed tests', () => {
      const stdout = exec("hlj passed-and-failed.test.js");
      expect(stdout).toBe("" +
          "ERROR passed-and-failed.test.js\n" +
          "Tests: 1 passed, 2 total\n");
    });
  });
});
