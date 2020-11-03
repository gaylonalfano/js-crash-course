// @ts-nocheck
// Define UI variables that we'll use
const formElement = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks.btn.black");
const filterInput = document.getElementById("filter");
const taskInput = document.querySelector("#task");

console.log(clearBtn);

// Call a function to load all event listeners
loadEventListeners();

// Create a function to load all event listeners
function loadEventListeners() {
  // Add task event to form (because type="submit")
  formElement.addEventListener("submit", addTask);
  // Remove task event to taskList (for event delegation to <li> children)
  taskList.addEventListener("click", removeTask);
  // Clear all tasks event for clearBtn
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event for filterInput
  filterInput.addEventListener("keyup", filterTasks);
}

// ====== ADD TASK EVENT HANDLER
function addTask(event) {
  // === Check there is actually a new task input value
  if (taskInput.value === "") {
    alert("Add a task");
    // FIXME Will still add an empty <li> to the <ul> taskList
    // NOTE Use 'return' to stop function!
    return;
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

// ====== CLEAR ALL TASKS EVENT HANDLER
function clearTasks() {
  if (confirm("Are you sure?")) {
    console.log(taskList.children); // HTMLCollection
    console.log(taskList.childElementCount); // 2
    // Remove all <li> elements from <ul> (taskList)
    // NOTE Two approaches: 1. set innerHTML = "" or use while loop w/ firstChild
    // === Set innerHTML = ""
    // NOTE 3 elements took 1313ms
    // taskList.innerHTML = "";

    // === Use while loop w/ removeChild(taskList.firstChild) (faster actually)
    // NOTE 3 elements took 1747ms
    // while (taskList.childElementCount > 0) {
    //   taskList.removeChild(taskList.firstElementChild);
    // }

    // === Use while loop w/ removeChild(taskList.firstChild) (faster actually)
    // NOTE 3 elements took 1577ms
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

// ====== FILTER TASKS EVENT HANDLER
function filterTasks(event) {
  // Let's get the filter input value
  // TODO? Any reason not to use filterText instead of e.target.value?
  const filterText = filterInput.value.toLowerCase();
  console.log(filterText);
  // const text = event.target.value.toLowerCase();
  // console.log(text);

  // ====== MY ATTEMPT ======
  // Retrieve all <li> elements using class '.collection-item'
  // NOTE NodeList (querySelectorAll()) is like an Array. HTMLCollection
  // HTMLCollection (getElementByClass) has to be first converted to Array.
  taskList.querySelectorAll(".collection-item").forEach((task) => {
    // Target the CHILD's task text content
    const taskContent = task.firstChild.textContent.toLowerCase();

    // Check that it contains the filterText.
    // If so, continue/leave the <li> element. Else, hide the <li>
    // FIXME For some reason the first letter for filter doesn't work
    // NOTE Turns out I needed taskContent.toLowerCase()!
    if (!taskContent.includes(filterText)) {
      task.hidden = true;
    } else {
      task.hidden = false;
    }
  });
  // ====== BRAD'S ATTEMPT ======
  // document.querySelectorAll(".collection-item").forEach(function (task) {
  //   const item = task.firstChild.textContent;
  //   // Check if there is a match with filter input text
  //   if (item.toLowerCase().indexOf(filterText) !== -1) {
  //     task.style.display = "block";
  //   } else {
  //     task.style.display = "none";
  //   }
  // });
}
