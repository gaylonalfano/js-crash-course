// @ts-nocheck
// REPLACE AND DELETE ELEMENTS
// NOTE Change the src in index.html to point to this file.

// === REPLACE ELEMENTS
const newHeading = document.createElement("h2");
newHeading.id = "task-title";
// Add a new text node <h2>TEXT</h2>
newHeading.appendChild(document.createTextNode("Task List"));

// Get original heading (one we want to replace)
const oldHeading = document.getElementById("task-title");
// Need a parent so we can use replaceChild(), which is called on a parent (div)
// const parentElement = document.getElementById("card-action"); // null
const parentElement = document.querySelector(".card-action"); // [object HTMLDivElement]

// Replace existing <h5> with this new <h2>
parentElement.replaceChild(newHeading, oldHeading);

// === REMOVE ELEMENTS
const liElements = document.querySelectorAll("li"); // returns Array
const ulElement = document.querySelector("ul");

// Remove a specific list item
liElements[0].remove();
// Remove by Child Element
ulElement.removeChild(liElements[3]);

// === CLASSES and ATTRS
const firstLiElement = document.querySelector("li:first-child");
// Get the <a> tag link, which is the first child element of <li>
const link = firstLiElement.children[0]; // <a href="#" class="delete-item secondary-content"></a>
let val;

// Classes
val = link.className; // class="delete-item secondary-content"
val = link.classList; // DOMTokenList (not Array!)
val = link.classList[0]; // "delete-item"
link.classList.add("test"); // class="delete-item secondary-content test"
link.classList.remove("test");
val = link;

// Attributes
val = link.getAttribute("href");
val = link.setAttribute("href", "http://google.com");
link.setAttribute("title", "Google");
val = link.hasAttribute("title");
link.removeAttribute("title");
val = link;

console.log(val);
