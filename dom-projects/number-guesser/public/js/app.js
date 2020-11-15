/*
GAME FUNCTION:
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// ===== UI ELEMENTS
const gameElement = document.getElementById("game");
const gameRulesElement = document.getElementById("game_rules");
const minRangeInput = document.getElementById("min_range_input");
const minRangeSpan = document.getElementById("min_range");
const maxRangeInput = document.getElementById("max_range_input");
const maxRangeSpan = document.getElementById("max_range");
const numOfAttemptsSelector = document.getElementById("number_of_attempts");
const attemptsRemainingSpan = document.getElementById("attempts_remaining");
const userGuessInput = document.getElementById("user_guess");
const guessErrorMessage = document.getElementById("guess_error");
const submitButton = document.getElementById("guess_btn");

// ===== GAME VALUES
// Static variables
// let minRange;
// let maxRange;
// let winningNumber = 2; // TODO Create fn for generating random number
// let attemptsAllowed;

// Dynamic variables:
let guessValue;
// let attemptsMade;
// let attemptsRemaining; // undefined on init (or NaN if formula)
let isValidAttempt = false;
// let isGameActive = false;

// ===== MANAGE GAME STATE VIA OBJECT
// FIXME Add default/init values or use some sort of setState() function?
// FIXME Do I add ALL variables to this obj? Or leave guessValue and isValidAttempt as global?
// FIXME Could consider adding 'guesses' Array property to store all guesses made
const gameState = {
  // isGameActive: false,
  // winningNumber: generateWinningNumber(gameState),
  // winningNumber: generateWinningNumber(gameState.minRange, gameState.maxRange),
  winningNumber: 0,
  minRange: parseInt(minRangeInput.value),
  maxRange: parseInt(maxRangeInput.value),
  attemptsAllowed: parseInt(numOfAttemptsSelector.value),
  attemptsMade: 0,
  // userGuesses: [],
};

loadEventListeners();

// ===== LOAD EVENT LISTENERS FOR TIDINESS
function loadEventListeners() {
  // === ADD LOAD EVENT LISTENER ON WINDOW TO INIT CONTENT
  // FIXME ? Do I need to init game values on load?
  document.addEventListener("DOMContentLoaded", () => {
    // === Load initial UI content
    minRangeSpan.textContent = minRangeInput.value;
    maxRangeSpan.textContent = maxRangeInput.value;
    attemptsRemainingSpan.textContent = numOfAttemptsSelector.value;
  });

  // === ADD CHANGE EVENT LISTENER MIN RANGE
  // NOTE Going to see if I can do the same but for the other input fields
  minRangeInput.addEventListener("change", (e) => {
    setGameState({ minRange: parseInt(e.target.value) });
  });

  // === ADD CHANGE EVENT LISTENER MAX RANGE
  // NOTE Going to see if I can do the same but for the other input fields
  maxRangeInput.addEventListener("change", (e) => {
    setGameState({ maxRange: parseInt(e.target.value) });
  });

  // === ADD CHANGE EVENT LISTENER TO ATTEMPTS SELECT LIST
  // NOTE I want to trigger a refresh of the UI with update values
  // NOTE Think there is DOM diffing option?
  // FIXME passing gameState doesn't work. What if I pass attemptsRemaining()?
  // numOfAttemptsSelector.addEventListener("change", setGameState(gameState));
  // NOTE You can capture the new selected value using e.target.value
  // numOfAttemptsSelector.addEventListener(
  //   "change",
  //   setGameState({ attemptsAllowed: this.event.target.value })
  // );
  numOfAttemptsSelector.addEventListener("change", (e) => {
    setGameState({ attemptsAllowed: parseInt(e.target.value) });
  }); // WORKS!!!

  // === ADD CLICK EVENT LISTENER TO BUTTON
  // NOTE User clicks to submit, need to validate inputs and then process
  submitButton.addEventListener("click", submitGuessAttempt);

  // ===== ADD MOUSEDOWN EVENT LISTENER FOR PLAY AGAIN
  // NOTE User can click the Play again? button to reset/reload the page
  // Need to use event delegation since class is added after initial load
  // Attach listener to a parent element (e.g., the 'game' form element)
  game.addEventListener("mousedown", (e) => {
    // NOTE When gameOver() we add play-again class to our submitButton
    // Check whether 'play-again' class has been added to submitButton
    if (e.target.classList.contains("play-again")) {
      console.log("MOUSEDOWN EVENT button has play-again class!");
      // Clear the gameRulesContent otherwise it shows up before the full reload
      // FIXME Could consider adding a "loading..."
      gameRulesElement.innerHTML = "Resetting game...";
      // Reload/reset the entire game
      window.location.reload();
    }
  });
}

// ===== MAKE attemptsRemaining A FUNCTION OF OUR STATE
function attemptsRemaining(state) {
  console.log("COMPUTING attemptsRemaining...");
  return state.attemptsAllowed - state.attemptsMade;
}

// ===== MAKE isGameActive A FUNCTION OF OUR STATE
// FIXME ? Should I embed the enabling/disabling of inputs here or keep separate?
// Or should I use after updating state after valid attempt?
function isGameActive(state) {
  console.log("COMPUTING isGameActive...");
  if (state.attemptsMade === 0) {
    // Inactive, so user can configure
    // enableInputs(state);
    return false;
  } else if (attemptsRemaining(state) > 0) {
    // Active, so user cannot change rules
    // disableInputs(state);
    return true;
  } else if (attemptsRemaining(state) === 0) {
    // User is out of attempts
    // enableInputs(state);
    return false;
  }
  // TODO Need to add another return true for a catch-all?
}

// ===== MAKE generateWinningNumber A FUNCTION OF OUR STATE
// FIXME ? Add a property on state or no? I believe yes...
// UPDATE -
function generateWinningNumber(state) {
  console.log("GENERATING WINNING NUMBER...");
  // FIXME ? Do I pass state as the arg or min, max?
  const minRange = state.minRange;
  const maxRange = state.maxRange;

  // Compute a random number integer between these values
  const winningNumber =
    Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  console.log(`winningNumber is: ${winningNumber}`);

  return winningNumber;
}

// ===== SET GAME RULES CONTENT
// NOTE This just sets the rules content. Still need to render
function gameRulesContent(state) {
  // FIXME Currently have to maintain the same code in two places (here and index.html)
  // TODO ? Do I need to use 'return'?
  const rulesContent = `
            <p id="game_rules" class="mt-4 text-lg leading-6 text-gray-500">
            Guess a number between
            <span id="min_range" class="font-medium text-gray-900">${
              state.minRange
            }</span> and
            <span id="max_range" class="font-medium text-gray-900">${
              state.maxRange
            }</span>
            correctly and be a winner!<br /><br />
            You have
            <span
              id="attempts_remaining"
              class="font-medium text-gray-900"
            >${attemptsRemaining(state)}</span>
            ${
              attemptsRemaining(state) === 1 ? "attempt" : "attempts"
            } remaining!
          </p>
  `;

  return rulesContent;
}

// ===== RENDER UI WITH UPDATED CONTENT
// NOTE Ideally this can trigger on some sort of state 'change' event
function renderGameRules(state) {
  console.log("RENDERING UI...");
  // Target the <p id=game_rules> element and update html
  gameRulesElement.innerHTML = gameRulesContent(state);
}

// ===== SET GAME STATE
// FIXME Should only update values that have changed. Maybe use a copy or localStorage?
// TODO Want to set/update the game values
function setGameState(state) {
  console.log("SETTING GAME STATE...");
  // Update any state properties that have been passed in
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      // Update global gameState object
      gameState[key] = state[key];
    }
  }

  // NOTE Looks like rendering here is best. Need to pass updated gameState obj.
  return renderGameRules(gameState);
}

// ===== DISABLE INPUTS WHILE GAME ACTIVE
function disableInputs() {
  console.log(`UI DISABLED. Game is ACTIVE...`);
  minRangeInput.disabled = true;
  minRangeInput.classList.add("bg-gray-200");
  maxRangeInput.disabled = true;
  maxRangeInput.classList.add("bg-gray-200");
  numOfAttemptsSelector.disabled = true;
  numOfAttemptsSelector.classList.add("bg-gray-200");
}

// ===== ENABLE INPUTS WHILE GAME INACTIVE
// NOTE Using add/remove() instead of toggle() so they don't always fire
function enableInputs() {
  console.log(`UI ENABLED. Game is INACTIVE...`);
  minRangeInput.disabled = false;
  minRangeInput.classList.remove("bg-gray-200");
  maxRangeInput.disabled = false;
  maxRangeInput.classList.remove("bg-gray-200");
  numOfAttemptsSelector.disabled = false;
  numOfAttemptsSelector.classList.remove("bg-gray-200");
}

// ===== GAME OVER SCENARIOS (WIN OR LOSE)
function gameOver(isWin) {
  // isWin: Boolean and we'll base color on that
  let color;
  isWin === true ? (color = "green") : (color = "red");
  // Disable inputs UI regardless of win or lose
  disableInputs();
  // Disable the input since the game is over
  userGuessInput.disabled = true;
  // Change border color
  // userGuessInput.style.borderColor = "green";
  userGuessInput.classList.add(`bg-${color}-200`);
  // Replace UI game rules with a winning message
  if (isWin === true) {
    // FIXME Use textContent instead of innerHTML
    gameRulesElement.innerHTML = `<h3>You won! ${
      gameState.winningNumber
    } is correct! You guessed correctly in ${gameState.attemptsMade} ${
      gameState.attemptsMade === 1 ? "attempt!" : "attempts!"
    }`;
    gameRulesElement.classList.add(`text-${color}-600`, "font-medium");
  } else {
    gameRulesElement.innerHTML = `<h3>You lost. ${gameState.winningNumber} is the winning number. Better luck next time!`;
    gameRulesElement.classList.add(`text-${color}-600`, "font-medium");
  }

  // Change button text to "Play again?"
  submitButton.textContent = "Play again?";

  // Add a new class to our button so we can later target it for 'mousedown' event
  submitButton.classList.add("play-again");
}

// ===== VALIDATE THE SUBMISSION WITH STATE
function validateAttempt() {
  // NOTE Using global isValidAttempt, guessValue and gameState.isGameActive
  console.log("VALIDATING ATTEMPT...");

  // console.log(`Guess value BEFORE: ${guessValue}`); // FIXME undefined!
  console.log(`minRange BEFORE validating: ${gameState.minRange}`);
  console.log(`maxRange BEFORE validating: ${gameState.maxRange}`);
  console.log(
    `attemptsRemaining BEFORE validating: ${attemptsRemaining(gameState)}`
  );

  // Update guessValue with input value, otherwise it's undefined
  guessValue = parseInt(userGuessInput.value);

  if (!isGameActive(gameState)) {
    // Is it the very first attempt?
    if (gameState.attemptsMade === 0) {
      console.log("FIRST ATTEMPT. CAN CONTINUE VALIDATING...");
    } else {
      // Game is truly INVALID
      console.log("GAME IS INACTIVE! STOPPING VALIDATING...");
      enableInputs();
      return;
    }
  }

  // Validate the user's inputs
  if (
    guessValue >= gameState.minRange &&
    guessValue <= gameState.maxRange &&
    attemptsRemaining(gameState) > 0
  ) {
    console.log(`VALID ATTEMPT. guessValue: ${guessValue}`);
    // Remove invalid attempt error message if present
    if (!guessErrorMessage.hidden) {
      // Remove/hide error message
      guessErrorMessage.hidden = true;
    }

    // Everything checks out so it's a valid attempt
    isValidAttempt = true;
    console.log(`VALID ATTEMPT. isValidAttempt: ${isValidAttempt}`);

    // Generate the winning number based on rules if valid and first attempt
    if (isValidAttempt && gameState.attemptsMade === 0) {
      // NOTE Not sure if I should have state as param or min, max
      // Update state with our winningNumber
      setGameState({ winningNumber: generateWinningNumber(gameState) });
    }

    // Time to update our gameState using our helper
    // console.log(`gameState BEFORE: ${Object.entries(gameState)}`);
    console.log("gameState BEFORE updating state...");
    console.table(gameState);
    setGameState({
      // FIXME What if I dont' add this as a prop but just a func?
      // isGameActive: isGameActive(gameState),
      // attemptsMade: gameState.attemptsMade++, // FIXME Not incrementing right away! Have to retrieve twice!
      attemptsMade: (gameState.attemptsMade += 1), // Works!
    });
    console.log(
      `isGameActive AFTER updating state: ${isGameActive(gameState)}`
    );
    // Check the updated gameState and toggle UI inputs
    isGameActive(gameState) ? disableInputs() : enableInputs();
    console.log("gameState AFTER updating state...");
    console.table(gameState);

    // Update our attemptsRemaining using our function since state changed
    attemptsRemaining(gameState);
    console.log(
      `attemptsRemaing AFTER valid attempt: ${attemptsRemaining(gameState)}`
    );

    // Check if it's the winning number (i.e., guessValue === winningNumber)
    // If so, then make the borderColor "green" or "red" if incorrect.
    if (guessValue === gameState.winningNumber) {
      gameOver(true);
    } else {
      // Wrong guess
      // Check if any attempts remaining
      if (attemptsRemaining(gameState) === 0) {
        gameOver(false);
      } else {
        // Wrong guess but still have attempts remaining
        // Change border color red
        userGuessInput.classList.add("bg-red-200");
        // Clear the input for the user
        userGuessInput.value = "";
      }
    }
  } else {
    isValidAttempt = false;
    console.log(`INVALID! isValidAttempt: ${isValidAttempt}`);
    guessErrorMessage.hidden = false;
  }
}

// ===== CLICK EVENT SUBMIT ATTEMPT HANDLER
// TODO Build submmit click handler logic
function submitGuessAttempt(e) {
  // Disable/Enable the inputs UI if the game is active/inactive
  // FIXME Do I need to add this in validateAttempt or before in main click handler?
  // gameState.isGameActive ? disableInputs(gameState) : enableInputs(gameState);

  // TODO Validate the inputs
  validateAttempt();
  // // Check if isGameActive = true or false
  // if (!isGameActive) {
  //   // This is the first successful click so lets make the game active/live
  //   isGameActive = true;
  //   // Initialize the game rules/values
  //   setGameValues();
  //   validateAttempt();
  //   console.log(`Guess: ${guessValue}`);
  // }

  // Disable UI while game is active
  // disableInputs();
  // === Capture attempts made
  // if (attemptsMade === 0) {
  //   // Start the game
  //   setGameValues();

  //   // Disable UI if game is active (attempts made > 0)
  //   disableInputs();

  //   // Update UI Content
  //   updateUiContent();
  // }

  // // === Check that enough attempts remain
  // console.log(
  //   `SUBMIT. AFTER validateAttempt() attemptsRemaining: ${attemptsRemaining}`
  // );
  // // console.log(`Attempts made: ${attemptsMade}`);
  // // TODO Check that these are updated/latest
  // // TODO Need to have a function that retrieves latest values
  // // FIXME Need to disable the inputs while attemptsRemaining > 0
  // console.log(`Max Refresh: ${maxRangeInput.value}`);
  // console.log(`Game active? ${gameState.isGameActive}`);
  e.preventDefault();
}
