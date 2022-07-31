import assert from "assert";
import { play } from "../src/index.js";
describe("Play", function () {
  describe("get random slots", function () {
    it("should have length 4 and all alphabets should be either A,B,C,D,E", function () {
      const result = play();
      assert.equal(result.length, 4);
      for (const val of result) {
        assert.equal(["A", "B", "C", "D", "E"].includes(val), true);
      }
    });
  });
});
