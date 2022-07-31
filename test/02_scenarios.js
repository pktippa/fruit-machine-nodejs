import assert from "assert";
import {
  isJackpot,
  anyAdjacentCharsSame,
  isEachCharacterDifferent,
} from "../src/scenarios.js";

describe("Is Jackpot", function () {
  describe("success", function () {
    it("all characters same", function () {
      const playResult = ["A", "A", "A", "A"];
      const res = isJackpot(playResult);
      assert.equal(res, true);
    });
  });
  describe("failure", function () {
    it("not all characters same should return false", function () {
      const playResult = ["A", "B", "A", "C"];
      const res = isJackpot(playResult);
      assert.equal(res, false);
    });
  });
});

describe("is each character different", function () {
  describe("success", function () {
    it("all characters different should return true", function () {
      const playResult = ["A", "B", "C", "D"];
      const res = isEachCharacterDifferent(playResult);
      assert.equal(res, true);
    });
  });

  describe("failure", function () {
    it("if any character duplicates should return false", function () {
      const playResult = ["A", "A", "B", "C"];
      const res = isEachCharacterDifferent(playResult);
      assert.equal(res, false);
    });
  });
});

describe("any adjacent character same", function () {
  describe("success", function () {
    it("if two or more adjacent characters same then return true", function () {
      const playResult = ["A", "B", "B", "C"];
      const res = anyAdjacentCharsSame(playResult);
      assert.equal(res, true);
    });
  });

  describe("failure", function () {
    it("if adjacent chars are not same, return false", function () {
      const playResult = ["A", "C", "D", "E"];
      const res = anyAdjacentCharsSame(playResult);
      assert.equal(res, false);
    });
  });
});
