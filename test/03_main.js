import assert from "assert";
import { runAndUpdate } from "../src/index.js";

describe("User Balance, Machine Balance, Free Plays", function () {
  it("for jackpot", function () {
    const iresult = ["C", "C", "C", "C"];
    const iamount = 1;
    const imachine_balance = 20;
    const ifree_plays = 0;
    const { amount, machine_balance, free_plays } = runAndUpdate(
      iresult,
      iamount,
      imachine_balance,
      ifree_plays
    );
    assert.equal(amount, 20.8);
    assert.equal(machine_balance, 0);
    assert.equal(free_plays, 0);
  });

  it("for all chars different", function () {
    const iresult = ["D", "B", "C", "A"];
    const iamount = 1;
    const imachine_balance = 20;
    const ifree_plays = 0;
    const { amount, machine_balance, free_plays } = runAndUpdate(
      iresult,
      iamount,
      imachine_balance,
      ifree_plays
    );
    assert.equal(amount, 10.8);
    assert.equal(machine_balance, 10);
    assert.equal(free_plays, 0);
  });

  it("two adjacent chars same", function () {
    const iresult = ["D", "D", "C", "A"];
    const iamount = 1;
    const imachine_balance = 20;
    const ifree_plays = 0;
    const { amount, machine_balance, free_plays } = runAndUpdate(
      iresult,
      iamount,
      imachine_balance,
      ifree_plays
    );
    assert.equal(amount, 1.8);
    assert.equal(machine_balance, 19);
    assert.equal(free_plays, 0);
  });

  it("for all chars different and machine balance low", function () {
    const iresult = ["B", "D", "C", "A"];
    const iamount = 10;
    const imachine_balance = 5;
    const ifree_plays = 0;
    const { amount, machine_balance, free_plays } = runAndUpdate(
      iresult,
      iamount,
      imachine_balance,
      ifree_plays
    );
    assert.equal(amount, 14.8);
    assert.equal(machine_balance, 0);
    // got 25 free plays for 5 pounds
    assert.equal(free_plays, 25);
  });

  it("two adjacent chars same and machine balance zero, existing free plays", function () {
    const iresult = ["B", "C", "C", "A"];
    const iamount = 10;
    const imachine_balance = 0;
    const ifree_plays = 10;
    const { amount, machine_balance, free_plays } = runAndUpdate(
      iresult,
      iamount,
      imachine_balance,
      ifree_plays
    );
    assert.equal(amount, 9.8);
    assert.equal(machine_balance, 0);
    // got 5 free plays for 1 pound
    assert.equal(free_plays, 15);
  });

  it("no balance and lost a play, deduct from free plays", function () {
    const iresult = ["A", "D", "C", "A"];
    const iamount = 0;
    const imachine_balance = 0;
    const ifree_plays = 10;
    const { amount, machine_balance, free_plays } = runAndUpdate(
      iresult,
      iamount,
      imachine_balance,
      ifree_plays
    );
    assert.equal(amount, 0);
    assert.equal(machine_balance, 0);
    // deduct from free play
    assert.equal(free_plays, 9);
  });
});
