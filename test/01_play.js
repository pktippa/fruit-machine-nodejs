import assert from "assert";
import { play, evaluatePlay } from "../src/play.js";

// disable logging for tests
console.log = () => {};
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

describe("evaluatePlay", function () {
  it("for jackpot return won = 20", function () {
    const playResult = ["B", "B", "B", "B"];
    const res = evaluatePlay(playResult);
    assert.equal(res.won, 20);
  });
  it("for each character different should return won = 10", function () {
    const playResult = ["A", "B", "C", "E"];
    const res = evaluatePlay(playResult);
    assert.equal(res.won, 10);
  });
  it("adjacent char differnt won = 1", function () {
    const playResult = ["A", "A", "B", "C"];
    const res = evaluatePlay(playResult);
    assert.equal(res.won, 1);
  });
  it("if non of above success scenarios match, return won = 0 ", function () {
    const playResult = ["A", "B", "C", "B"];
    const res = evaluatePlay(playResult);
    assert.equal(res.won, 0);
  });
});
