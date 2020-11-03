// @ts-nocheck
// Define UI variables that we'll use
const formElement = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks btn black");
const filterInput = document.getElementById("filter");
const taskInput = document.querySelector("#task");

// Call a function to load all event listeners
loadEventListeners();

// Create a function to load all event listeners
function loadEventListeners() {
  // Add task event to form (because type="submit")
  formElement.addEventListener("submit", addTask);
  // Remove task event to taskList (for event delegation to <li> children)
  taskList.addEventListener("click", removeTask);
}

// ====== ADD TASK EVENT HANDLER
function addTask(event) {
  // === Check there is actually a new task input value
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // === Store the new task that was entered
  const newTask = taskInput.value;
  console.log(`New Task: ${newTask}`);

  // === Create a new <li> element with <a> link to later append to <ul>
  const li = document.createElement("li");
  // Add a class to li
  li.className = "collection-item";
  // Create a text node and append to <li>
  li.appendChild(document.createTextNode(newTask)); // <li>{newTask}</li>
  // Create new delete link element
  const link = document.createElement("a");
  // Add a class to link
  link.className = "delete-item secondary-content";
  // Add icon HTML to the link assigning a FontAwesome 'x' icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append our new link to our new <li> element
  li.appendChild(link);

  // === Append our new/complete <li> to taskList <ul>
  taskList.appendChild(li);

  // === Clear input field
  taskInput.value = "";

  // === prevent default of form submit
  event.preventDefault();
}

// ====== REMOVE TASK EVENT HANDLER
function removeTask(event) {
  // Need to target the delete-item element
  // console.log(event.target); // <i> -- NEED parentElement! <a>
  // Check that the parentElement has a class of "delete-item"
  // NOTE Can use classList+contains() or parentElement.matches("delete-item")
  // === classList + contains()
  // if (event.target.parentElement.classList.contains("delete-item")) {
  //   // console.log(event.target); // <i>
  //   // Add a confirmation message to the user to confirm the deletion
  //   // Remove the entire <li> element (parent of parent; <i> <a> <li> <ul>)
  //   event.target.parentElement.parentElement.remove();
  // }
  // === matches()
  if (event.target.parentElement.matches(".delete-item")) {
    // Add a confirmation for user
    if (confirm("Are you sure?")) {
      // Remove the entire <li> element (parent of parent; <i> <a> <li> <ul>)
      event.target.parentElement.parentElement.remove();
    }
  }
}
