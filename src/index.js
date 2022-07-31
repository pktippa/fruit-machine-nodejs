import inquirer from "inquirer";

async function main() {
  console.log("Welcome to Fruit Machine game.");
  let user = await inquirer.prompt({
    type: "input",
    name: "amount",
    message:
      "Enter initial amount to play in £: (Ex: 1 for 1£, 1.2 for 1£ 20p)",
  });
  const startGame = await promptToContinue(true);
  if (startGame) start(user["amount"]);
}

async function start(amount) {
  const result = play();
  console.log("Slots : ", result.join(" | "));
  evaluatePlay(result);
  const continuePlay = await promptToContinue();
  if (continuePlay) {
    start(amount);
  } else {
    console.log("Thanks for choosing Fruit Machine.");
  }
}

async function promptToContinue(first = false) {
  let choice = await inquirer.prompt({
    type: "list",
    name: "continue",
    message: first ? "Start Game?" : "Play another game?",
    choices: [
      {
        name: "Yes",
        value: true,
      },
      {
        name: "No",
        value: false,
      },
    ],
  });
  return choice["continue"];
}

function play() {
  let slots = [];
  let possible = "ABCDE";

  for (var i = 0; i < 5; i++)
    slots.push(possible.charAt(Math.floor(Math.random() * possible.length)));

  return slots;
}

function evaluatePlay(result) {
  if (isJackpot(result)) {
    console.log("WON JACKPOT");
    return;
  } else if (isEachCharacterDifference(result)) {
    console.log("CONGRATULATIONS!!. WON £10.");
    return;
  } else if (anyAdjacentCharsSame(result)) {
    console.log("CONGRATULATIONS!!. WON £1.");
    return;
  } else {
    console.log("Sorry, did not won anything. Up for another game.?");
  }
}

// Jackpot: if all characters are same
function isJackpot(result) {
  let prevChar = result[0];
  for (let i = 1; i < result.length; i++) {
    const currentChar = result[i];
    if (currentChar !== prevChar) return false;
    prevChar = currentChar;
  }
  return true;
}

// If each slot has a different character then the machine should pay out £10.
function isEachCharacterDifference(result) {
  const charTraversal = {};
  for (let i = 0; i < result.length; i++) {
    //  if it is already traversed
    if (charTraversal[result[i]]) return false;
    // else set to already traversed
    else charTraversal[result[i]] = true;
  }
  return true;
}

function anyAdjacentCharsSame(result) {
  let prevChar = result[0];
  for (let i = 1; i < result.length; i++) {
    const currentChar = result[i];
    if (currentChar === prevChar) return true;
    prevChar = currentChar;
  }
  return false;
}

main();
