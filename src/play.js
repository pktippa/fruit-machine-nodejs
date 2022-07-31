import {
  isJackpot,
  anyAdjacentCharsSame,
  isEachCharacterDifferent,
} from "./scenarios.js";
export function play() {
  let slots = [];
  let possible = "ABCDEABCDEABCDEABCDE";

  for (let i = 0; i < 4; i++)
    slots.push(possible.charAt(Math.floor(Math.random() * possible.length)));

  return slots;
}

export function evaluatePlay(result) {
  if (isJackpot(result)) {
    console.log("\nWON JACKPOT. CONGRATULATIONS!!. WON £20.");
    return { won: 20 };
  } else if (isEachCharacterDifferent(result)) {
    console.log("\nCONGRATULATIONS!!. WON £10.");
    return { won: 10 };
  } else if (anyAdjacentCharsSame(result)) {
    console.log("\nCONGRATULATIONS!!. WON £1.");
    return { won: 1 };
  } else {
    console.log("\nSorry, did not won anything. Up for another game.?");
    return { won: 0 };
  }
}
