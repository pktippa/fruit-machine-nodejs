import assert from "assert";
import { add, subtract, getFreePlaysForAmount } from "../src/util.js";

describe("Math operations", function () {
  it("add ", function () {
    const res = add(0.2, 0.4);
    assert.equal(res, 0.6);
  });

  it("subtract", function () {
    const res = subtract(1, 0.2);
    assert.equal(res, 0.8);
  });
});

describe("free plays to amount", function () {
  it("for 1 pound should get 5 free plays", function () {
    const res = getFreePlaysForAmount(1);
    assert.equal(res, 5);
  });

  it("for 20pence should get 1 free play", function () {
    const res = getFreePlaysForAmount(0.2);
    assert.equal(res, 1);
  });
});
