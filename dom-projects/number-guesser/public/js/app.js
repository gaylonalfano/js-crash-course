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
  isGameActive: false,
  winningNumber: 2,
  minRange: parseInt(minRangeInput.value),
  maxRange: parseInt(maxRangeInput.value),
  attemptsAllowed: parseInt(numOfAttemptsSelector.value),
  attemptsMade: 0,
  // userGuesses: [],
};

// ===== MAKE attemptsRemaining A FUNCTION OF OUR STATE
const attemptsRemaining = (state) => {
  return state.attemptsAllowed - state.attemptsMade;
};

// ===== SET GAME RULES CONTENT
// NOTE This just sets the rules content. Still need to render
const gameRulesContent = (state) => {
  return `
          <p id="game_rules" class="mt-4 text-lg leading-6 text-gray-500">
            Guess a number between <span id="min_range">${
              state.minRange
            }</span> and
            <span id="max_range">${
              state.maxRange
            }</span> correctly and be a winner! You have
            <span id="attempts_remaining">${attemptsRemaining(
              state
            )}</span> attempts remaining!
          </p>
  `;
};

// ===== RENDER UI WITH UPDATED CONTENT
// NOTE Ideally this can trigger on some sort of state 'change' event
const renderGameRules = () => {
  // Target the <p id=game_rules> element and update html
  gameRulesElement.innerHTML = gameRulesContent(gameState);
};

// ===== GET GAME VALUES
// FIXME Could consider changing this function to updateGameValues
const getGameValues = () => {
  console.log("GET GAME VALUES...");
  // Retrieve game values and rules
  // NOTE Input values are all type string. Convert to number using parseInt()
  minRange = parseInt(minRangeInput.value);
  maxRange = parseInt(maxRangeInput.value);
  // console.log(`${typeof minRange}`); // number
  // console.log(`${typeof maxRange}`);
  guessValue = parseInt(userGuessInput.value);

  // Update/set attemptsAllowed value
  // NOTE This is static and is undefined on DOMContentLoaded init
  attemptsAllowed = parseInt(numOfAttemptsSelector.value);
  console.log(`attemptsAllowed: ${attemptsAllowed}`);
  // if (isNaN(attemptsAllowed) || attemptsAllowed === undefined) {
  //   console.log(`attemptsAllowed BEFORE setting: ${attemptsAllowed}`); // undefined
  //   console.log("attemptsAllowed is NaN! Setting to 0");
  //   attemptsAllowed = ;
  //   console.log(`attemptsAllowed AFTER setting: ${attemptsAllowed}`); // 0
  // }

  // Update/set attemptsMade value
  if (isNaN(attemptsMade) || attemptsMade === undefined) {
    console.log(`attemptsMade BEFORE setting: ${attemptsMade}`); // undefined
    console.log("attemptsMade is NaN! Setting to 0");
    attemptsMade = 0;
    console.log(`attemptsMade AFTER setting: ${attemptsMade}`); // 0
  }

  // Update/set attemptsRemaining value
  if (isNaN(attemptsRemaining) || attemptsRemaining === undefined) {
    console.log(`attemptsRemaining BEFORE setting: ${attemptsRemaining}`); // undefined
    console.log(
      `attemptsRemaining is NaN! Setting to (${attemptsAllowed - attemptsMade})`
    );
    // Set initial value to equal attemptsAllowed
    attemptsRemaining = attemptsAllowed;
    // console.log(`Type: ${typeof attemptsRemaining}`); // number
  } else {
    // All subsequent values need to deduct attempts made
    attemptsRemaining = attemptsAllowed - attemptsMade;
    console.log(`attemptsRemaining AFTER setting: ${attemptsRemaining}`); // 0
  }

  // // FIXME Can't subtract attemptsMade as I really want to simply decrement by 1 --
  // // NOTE attemptsRemaining will get decremented by 1 inside validateAttempt()
  // attemptsRemaining = parseInt(numOfAttemptsSelector.value) - attemptsMade;
  // console.log(`attemptsRemaining from getGameValues: ${attemptsRemaining}`);
};

// ===== VALIDATE THE SUBMISSION
// TODO Need to ensure we have enough attempts and the inputs are all compliant
const validateAttempt = () => {
  // NOTE Using global isValidAttempt and isGameActive variables to manage state
  // Retrieve user input/game values
  getGameValues();

  // FIXME Do I need to split up this validation logic to first check if game is active?
  // Then check whether the user inputs are valid?

  if (
    guessValue >= minRange &&
    guessValue <= maxRange &&
    attemptsRemaining > 0
  ) {
    console.log(`Guess value: ${guessValue}`);
    console.log("Guess is >= minRange");
    console.log("Guess is <= maxRange");
    // console.log(`VALID! attemptsRemaining: ${attemptsRemaining}`);

    // Everything checks out so it's a valid attempt
    isValidAttempt = true;
    console.log(`VALID! isValidAttempt? ${isValidAttempt}`);

    // If everything checks out and we have attempts then game is active
    isGameActive = true;
    console.log(`isGameActive? ${isGameActive}`);

    // Increase attemptsMade by 1 since this is a valid attempt
    // attemptsMade += 1;
    attemptsMade++;
    console.log(`attemptsMade? ${attemptsMade}`);

    // Update the global attemptsRemaining value by decrementing by 1
    // FIXME Do I need this if I have attemptsRemaining - attemptsMade in getGameValues()?
    // FIXME I believe yes...
    // attemptsRemaining -= 1;
    attemptsRemaining--;
    console.log(`attemptsRemaing AFTER valid attempt: ${attemptsRemaining}`);
  } else {
    isValidAttempt = false;
    console.log(`INVALID! isValidAttempt? ${isValidAttempt}`);
    guessErrorMessage.toggleAttribute("hidden");
  }
};

// ===== SET GAME STATE
// FIXME Should only update values that have changed. Maybe use a copy or localStorage?
// TODO Want to set/update the game values
const setGameState = (state) => {
  // Update any state properties that have been passed in
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      // Update global gameState object
      gameState[key] = state[key];
    }
  }
  // FIXME Render here or elsewhere?
  return renderGameRules();
};

// ===== DISABLE INPUTS WHILE GAME IS LIVE
const disableInputs = () => {
  // FIXME ? Need to do logic here or in main handler? Maybe could use a while loop?
  console.log(`UI DISABLED. ${attemptsMade} attempts made.`);
  minRangeInput.disabled = true;
  minRangeInput.classList.toggle("bg-gray-200");
  maxRangeInput.disabled = true;
  maxRangeInput.classList.toggle("bg-gray-200");
  numOfAttemptsSelector.disabled = true;
  numOfAttemptsSelector.classList.toggle("bg-gray-200");
};

// ===== ASSIGN/UPDATE UI MIN/MAX TO GAME RULES TO BE DYNAMIC
// NOTE These are the <span> elements inside the game rules up top
// NOTE Need these to be reactive eventually when user changes the values
// TODO ? Should I set the min/max props on <input> based on user input?
const updateUiContent = () => {
  // TODO Want to update the UI content as game rules and values change
  // FIXME Do I call this on 'click' event? Maybe when first guess is submitted
  // and we disable the UI inputs while active?
  minRangeSpan.textContent = minRange;
  maxRangeSpan.textContent = maxRange;
  attemptsRemainingSpan.textContent = attemptsRemaining;
};

// // ===== START/INIT GAME
// // TODO Thinking of consolidating a lot of the initializing into this function
// const initContentAndValues = () => {
//   setGameValues();
//   updateUiContent();
// };

// ===== IMPLEMENT HANDLER LOGIC
// TODO Build submmit click handler logic
const submitGuessAttempt = (e) => {
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

  // // === Capture attempts made
  // if (attemptsMade === 0) {
  //   // Start the game
  //   setGameValues();

  //   // Disable UI if game is active (attempts made > 0)
  //   disableInputs();

  //   // Update UI Content
  //   updateUiContent();
  // }

  // === Check that enough attempts remain
  console.log(
    `SUBMIT. AFTER validateAttempt() attemptsRemaining: ${attemptsRemaining}`
  );
  console.log(`Attempts made: ${attemptsMade}`);
  // TODO Check that these are updated/latest
  // TODO Need to have a function that retrieves latest values
  // FIXME Need to disable the inputs while attemptsRemaining > 0
  console.log(`Max Refresh: ${maxRangeInput.value}`);
  console.log(`Game active? ${isGameActive}`);
  e.preventDefault();
};

// ===== ADD LOAD EVENT LISTENER ON WINDOW TO INIT CONTENT
// FIXME Do I need to init game values on load?
document.addEventListener("DOMContentLoaded", () => {
  // === Load initial UI content
  minRangeSpan.textContent = minRangeInput.value;
  maxRangeSpan.textContent = maxRangeInput.value;
  attemptsRemainingSpan.textContent = numOfAttemptsSelector.value;
});

// ===== ADD CHANGE EVENT LISTENER MIN RANGE
// NOTE Going to see if I can do the same but for the other input fields
minRangeInput.addEventListener("change", (e) => {
  setGameState({ minRange: e.target.value });
});

// ===== ADD CHANGE EVENT LISTENER MAX RANGE
// NOTE Going to see if I can do the same but for the other input fields
maxRangeInput.addEventListener("change", (e) => {
  setGameState({ maxRange: e.target.value });
});

// ===== ADD CHANGE EVENT LISTENER TO ATTEMPTS SELECT LIST
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
  setGameState({ attemptsAllowed: e.target.value });
}); // WORKS!!!

// ===== ADD CLICK EVENT LISTENER TO BUTTON
// NOTE User clicks to submit, need to validate inputs and then process
submitButton.addEventListener("click", submitGuessAttempt);
