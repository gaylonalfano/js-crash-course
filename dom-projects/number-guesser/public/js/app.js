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
let minRange,
  maxRange,
  guessValue,
  winningNumber,
  attemptsMade,
  attemptsRemaining,
  isGameActive = false;

// ===== SET/INIT GAME VALUES
// TODO Want to set/update the game values
const initGameValues = () => {
  // Retrieve game values and rules
  minRange = minRangeInput.value;
  maxRange = maxRangeInput.value;
  guessValue = userGuessInput.value;
  winningNumber = 2; // TODO Create fn for generating random number
  attemptsMade = 0; // TODO Create fn for calculating attempts made
  attemptsRemaining = numOfAttemptsSelector.value - attemptsMade;
};

// TODO ?? ===== CALCULATE ATTEMPTS MADE

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
  minRangeSpan.textContent = minRange;
  maxRangeSpan.textContent = maxRange;
  attemptsRemainingSpan.textContent = attemptsRemaining;
};

// ===== START/INIT GAME
// TODO Thinking of consolidating a lot of the initializing into this function
const initGame = () => {
  initGameValues();
  updateUiContent();
};

// ===== VALIDATE THE SUBMISSION
// TODO Need to ensure we have enough attempts and the inputs are all compliant
const validateAttempt = () => {
  if (
    // attemptsRemaining > 0 &&
    // guessValue >= minRange &&
    // guessValue <= maxRange
    attemptsRemaining > 0
  ) {
    console.log("VALID");
  } else {
    console.log("INVALID");
  }
};

// ===== IMPLEMENT HANDLER LOGIC
// TODO Build submmit click handler logic
const submitGuessAttempt = (e) => {
  console.log(`${attemptsRemaining - attemptsMade}`);
  console.log(`Attempts made: ${attemptsMade}`);
  console.log(`Guess: ${guessValue}`);
  console.log(`isGameActive: ${isGameActive}`);
  // Check if isGameActive = true or false
  if (!isGameActive) {
    // This is the first successful click so lets make the game active/live
    isGameActive = true;
    // Initialize the game rules/values
    initGameValues();
    validateAttempt();
    console.log(`Guess: ${guessValue}`);
  }

  // Disable UI while game is active
  // disableInputs();

  // // === Capture attempts made
  // if (attemptsMade === 0) {
  //   // Start the game
  //   initGameValues();

  //   // Disable UI if game is active (attempts made > 0)
  //   disableInputs();

  //   // Update UI Content
  //   updateUiContent();
  // }

  // === Check that enough attempts remain
  console.log(`Attempts remaining: ${attemptsRemaining}`);
  console.log(`Attempts made: ${attemptsMade}`);
  console.log(`Min: ${minRange}`);
  console.log(`Max: ${maxRange}`);
  // TODO Check that these are updated/latest
  // TODO Need to have a function that retrieves latest values
  // FIXME Need to disable the inputs while attemptsRemaining > 0
  console.log(`Max Refresh: ${maxRangeInput.value}`);
  console.log(`Game active? ${isGameActive}`);
  e.preventDefault();
};

// ===== ADD LOAD EVENT LISTENER ON WINDOW TO INIT GAME
// FIXME Do I need to init game values on load?
document.addEventListener("DOMContentLoaded", initGame);

// ===== ADD CLICK EVENT LISTENER TO BUTTON
// NOTE User clicks to submit, need to validate inputs and then process
submitButton.addEventListener("click", submitGuessAttempt);
