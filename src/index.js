import inquirer from "inquirer";
import { add, subtract, getFreePlaysForAmount } from "./util.js";
import { play, evaluatePlay } from "./play.js";

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

async function start(
  input_amount,
  input_machine_balance,
  input_free_plays = 0
) {
  const result = play();
  console.log("\n\n Slots : ", result.join(" | "));
  const { amount, free_plays, machine_balance } = runAndUpdate(
    result,
    input_amount,
    input_machine_balance,
    input_free_plays
  );
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

export function runAndUpdate(result, amount, machine_balance, free_plays) {
  // after user play a game reduce 20p or free play for each play
  if (amount < 0.2 && free_plays) {
    free_plays -= 1;
  } else {
    amount = subtract(amount, 0.2);
  }
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
  return {
    amount,
    machine_balance,
    free_plays,
  };
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

main();
