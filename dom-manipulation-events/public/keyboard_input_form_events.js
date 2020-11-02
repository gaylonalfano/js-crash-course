// @ts-nocheck

const formElement = document.getElementById("task-form");
const taskInput = document.getElementById("task");
const tasksHeading = document.getElementById("task-title");
const selectList = document.querySelector("select");

// To clear/reset an input field
// NOTE Currently there is a default set by value="Walk the dog"
taskInput.value = "";

// === Form events (listen for a 'submit' event on the form)
// NOTE Default for forms is to fire off a redirect (similar to <a> link)
// formElement.addEventListener("submit", runEvent);

// === Keyboard and input field events
// NOTE 'keydown' and 'keypress' updates on SECOND press. 'keyup' on RELEASE

// Keydown
// taskInput.addEventListener("keydown", runEvent);

// Keyup
// taskInput.addEventListener("keyup", runEvent);

// Keypress
// taskInput.addEventListener("keypress", runEvent);

// Focus - Click INTO an input
// taskInput.addEventListener("focus", runEvent);

// Blur - Click OUTSIDE an input
// taskInput.addEventListener("blur", runEvent);

// Cut - When you cut something from input
// taskInput.addEventListener("cut", runEvent);

// Paste
// taskInput.addEventListener("paste", runEvent);

// Input event - NOTE Triggers on ANY input event
// taskInput.addEventListener("input", runEvent);

// Change event - Used on a Select List (Dropdown) <select><option>
// NOTE You can capture the new selected value using e.target.value
selectList.addEventListener("change", runEvent);

function runEvent(e) {
  console.log(`Event Type: ${e.type}`); // submit
  // console.log(`Event Target: ${e.target}`); // [object HTMLFormElement]

  // Catch the input on each keyup (key press) event using e.target.value
  // NOTE The event.target is the ELEMENT the event happens on (i.e., taskInput)
  console.log(e.target.value);

  // Replace 'Tasks' heading/title with whatever is inputted into taskInput
  // tasksHeading.textContent = `${e.target.value}`;

  // // Get input value
  // console.log(taskInput.value); // Walk the dog

  // Prevent form default redirect behavior
  // e.preventDefault();
}
