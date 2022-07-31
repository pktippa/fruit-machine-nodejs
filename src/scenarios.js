// Jackpot: if all characters are same
export function isJackpot(result) {
  let prevChar = result[0];
  for (let i = 1; i < result.length; i++) {
    const currentChar = result[i];
    if (currentChar !== prevChar) return false;
    prevChar = currentChar;
  }
  return true;
}

// If each slot has a different character then the machine should pay out £10.
export function isEachCharacterDifferent(result) {
  const charTraversal = {};
  for (let i = 0; i < result.length; i++) {
    //  if it is already traversed
    if (charTraversal[result[i]]) return false;
    // else set to already traversed
    else charTraversal[result[i]] = true;
  }
  return true;
}

export function anyAdjacentCharsSame(result) {
  let prevChar = result[0];
  for (let i = 1; i < result.length; i++) {
    const currentChar = result[i];
    if (currentChar === prevChar) return true;
    prevChar = currentChar;
  }
  return false;
}
