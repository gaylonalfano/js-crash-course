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
  // Add DOM Load event to document to getLocalStorageTasks
  document.addEventListener("DOMContentLoaded", getLocalStorageTasks);
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
  // TODO Refactor this block to it's own function for reuse (e.g., getLocalStorageTasks)
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

  // === Save tasks to Local Storage using a new custom function
  storeTaskInLocalStorage(newTask);

  // === Clear input field
  taskInput.value = "";

  // === prevent default of form submit
  event.preventDefault();
}

// ====== LOAD/DISPLAY TASKS FROM LOCAL STORAGE
function getLocalStorageTasks() {
  // Check if 'tasks' already stored in LS
  let tasks;
  if (!localStorage.getItem("tasks")) {
    // If 'tasks' key:value doesn't exist set tasks to empty []
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Loop through tasks and display in <ul> taskList
  tasks.forEach((task) => {
    // === Create a new <li> element with <a> link to later append to <ul>
    // TODO Refactor this block to it's own function for reuse (e.g., addTask)
    const li = document.createElement("li");
    // Add a class to li
    li.className = "collection-item";
    // Create a text node and append to <li>
    li.appendChild(document.createTextNode(task)); // <li>{task}</li>
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
  });
}

// ====== STORE TASK TO LOCAL STORAGE
function storeTaskInLocalStorage(task) {
  // === MY ATTEMPT ===
  // Want to store in an array of tasks (tasks=[task1, task2, task3])
  // let updatedTasks;
  // const originalTasksString = localStorage.getItem("tasks");
  // // Try to retrieve existing tasks from Local Storage
  // // Check if 'null' (falsey)
  // if (originalTasksString) {
  //   const originalTasksArray = JSON.parse(originalTasksString);
  //   updatedTasks = [...originalTasksArray, task];
  //   console.log(`HAS original: ${updatedTasks}`);
  //   // Store in local storage
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  // } else {
  //   updatedTasks = [];
  //   updatedTasks.push(task);
  //   console.log(`NO original: ${updatedTasks}`);
  //   // Store in local storage
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  // }

  // === BRAD'S APPROACH ===
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    // If 'tasks' key:value doesn't exist set tasks to empty []
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Add the new task to list of tasks
  tasks.push(task);

  // Save in local storage as string
  localStorage.setItem("tasks", JSON.stringify(tasks));
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

      // Remove the task from local storage by passing in entire <li> element
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

// ====== REMOVE TASK FROM LOCAL STORAGE
// NOTE Takes an <li> element as argument and searches on textContent to delete
function removeTaskFromLocalStorage(taskItemElement) {
  // Check if 'tasks' already stored in LS
  let tasks;
  if (!localStorage.getItem("tasks")) {
    // If 'tasks' key:value doesn't exist set tasks to empty []
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Loop through 'tasks' to find match
  tasks.forEach((task, index) => {
    // NOTE 'task' is already type String so can compare directly w/ textContent
    // console.log(taskItemElement); // <li class="collection-item">"Walk dog"
    const taskItemElementTextContent = taskItemElement.textContent; // "Walk dog"
    if (task === taskItemElementTextContent) {
      // Match is found so we can delete from local storage
      // Use splice(start, deleteCount?, item) to update array
      tasks.splice(index, 1);

      // Update 'tasks' inside local storage
      // NOTE Brad placed this bit outside of this forEach() loop.
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
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

    // === Finally delete/remove the tasks from local storage
    localStorage.clear();
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
