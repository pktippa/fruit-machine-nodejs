import inquirer from "inquirer";

async function main() {
  console.log("Welcome to Fruit Machine game.");
  let user = await inquirer.prompt({
    type: "number",
    name: "amount",
    message:
      "Enter initial amount to play in £: (Ex: 1 for 1£, 1.2 for 1£ 20p)",
  });
  if (isNaN(user["amount"])) {
    console.log("Entering amount should be number");
    return;
  } else if (Number(user["amount"]) < 0.2) {
    console.log("Requires 20p minimum to play a game.");
    return;
  }
  const startGame = await promptToContinue(true);
  if (startGame) start(user["amount"]);
}

async function start(amount) {
  const result = play();
  // after user play a game reduce 20p for each play
  amount = Number((amount - 0.2).toFixed(2));
  console.log("\n\n Slots : ", result.join(" | "));
  const { won } = evaluatePlay(result);
  // amount added to user won play
  if (won) amount = Number((amount + won).toFixed(2));
  if (amount >= 0.2) {
    console.log("\n\nBalance: ", amount);
    const continuePlay = await promptToContinue();
    if (continuePlay) {
      start(amount);
    } else {
      console.log(`\nTotal Balance: £${amount}`);
      console.log("\n\nThanks for choosing Fruit Machine.");
    }
  } else {
    console.log("\n\nRequires 20p minimum to play a game.");
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
  let possible = "ABCDEABCDE";

  for (var i = 0; i < 4; i++)
    slots.push(possible.charAt(Math.floor(Math.random() * possible.length)));

  return slots;
}

function evaluatePlay(result) {
  if (isJackpot(result)) {
    console.log("\nWON JACKPOT. CONGRATULATIONS!!. WON £20.");
    return { won: 20 };
  } else if (isEachCharacterDifference(result)) {
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
