// @ts-nocheck
// NOTE local (persistent) vs. session (removed when browser closes) storage

// // Set local storage item
// // NOTE Must convert/save as STRING using JSON.stringify()
// // NOTE Can convert back to object or array using JSON.parse()
// localStorage.setItem("name", "John");
// localStorage.setItem("age", "40");

// // Set session storage item
// sessionStorage.setItem("name", "Beth");

// // Remove from storage
// localStorage.removeItem("name");

// // Get from storage
// const name = localStorage.getItem("name");
// const age = localStorage.getItem("age");

// // Clear local storage (turns value to null)
// localStorage.clear();
// sessionStorage.clear();

// console.log(name, age);

// // === Add new task to local storage (MY ATTEMPT)
// // 1. Select the form element
// const formElement = document.getElementById("task-form");
// // 2. Add event listener for 'submit' event
// formElement.addEventListener("submit", addTask);
// // 3. Build addTask() submit handler function that stores input submission to local storage
// function addTask(e) {
//   // 3.1 prevent form submit default
//   e.preventDefault();
//   // 3.2 Retrieve input value
//   const taskInputElement = document.getElementById("task");
//   const taskValue = taskInputElement.value;
//   // 3.3 Assign a 'key' for this task
//   const key = Math.random().toString();
//   // 3.4 Store key: taskValue pair to local storage
//   localStorage.setItem(key, taskValue);
// }

// // === Add new task to local storage (BRAD'S but overwrites!)
// document.querySelector("form").addEventListener("submit", function (e) {
//   const task = document.getElementById("task").value;
//   console.log(task);
//   localStorage.setItem("task", task);
//   alert("Task saved");

//   e.preventDefault();
// });

// === Add new task to local storage (BRAD'S with Array of tasks)
document.querySelector("form").addEventListener("submit", function (e) {
  const task = document.getElementById("task").value;

  // Initialize our tasks array
  let tasks;

  // Check local storage for existing items (i.e., empty/null)
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Retrieve STRING of tasks array and convert to JS Array using JSON.parse()
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Push/append this new task to our tasks array
  tasks.push(task);

  // Now need to reset/update localStorage with updated data
  // NOTE We must store as STRING so need to JSON.stringify(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Notify user that the new task has been saved
  alert("Task saved");

  e.preventDefault();
});

// === Retrieve these tasks from local storage and loop through them
// NOTE Again, we must convert the STRING back to Array using JSON.parse();
const tasks = JSON.parse(localStorage.getItem("tasks"));

tasks.forEach((task) => {
  console.log(task);
});

// tasks.forEach(function (task) {
//   console.log(task);
// });
