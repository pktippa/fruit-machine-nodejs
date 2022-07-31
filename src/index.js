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
  const machine_balance = 20;
  if (startGame) start(user["amount"], machine_balance);
}

async function start(amount, machine_balance, free_plays = 0) {
  const result = play();

  // after user play a game reduce 20p or free play for each play
  if (amount < 0.2 && free_plays) {
    free_plays -= 1;
  } else {
    amount = subtract(amount, 0.2);
  }
  console.log("\n\n Slots : ", result.join(" | "));
  const { won } = evaluatePlay(result);
  // amount added to user won play
  if (won) {
    if (won > machine_balance) {
      amount = add(amount, machine_balance);
      free_plays += getFreePlaysForAmount(subtract(won, machine_balance));
      machine_balance = 0;
    } else {
      machine_balance = subtract(machine_balance, won);
      amount = add(amount, won);
    }
  }
  if (amount >= 0.2 || free_plays > 0) {
    console.log(
      "\n\nBalance: ",
      amount,
      ` Free plays: `,
      free_plays,
      " Machine balance: ",
      machine_balance
    );
    const continuePlay = await promptToContinue();
    if (continuePlay) {
      start(amount, machine_balance, free_plays);
    } else {
      console.log(`\nTotal Balance: £${amount}. Free plays: ${free_plays}`);
      console.log("\n\nThanks for choosing Fruit Machine.");
    }
  } else {
    console.log("\n\nRequires 20p minimum to play a game.");
  }
}

function add(first, second) {
  return Number((first + second).toFixed(2));
}
function subtract(first, second) {
  return Number((first - second).toFixed(2));
}

function getFreePlaysForAmount(amount) {
  return amount / 0.2;
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
  let possible = "ABCDEABCDEABCDEABCDE";

  for (let i = 0; i < 4; i++)
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

export { play };
