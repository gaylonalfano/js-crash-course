// @ts-nocheck
// TRAVERSING THE DOM
// NOTE Swap this file inside index.html <script src>
let val;

const list = document.querySelector("ul.collection");
const listItem = document.querySelector("li.collection-item:first-child");

val = listItem;
val = list;

// Get child nodes (NodeList) - Returns all types of nodes not just elements
val = list.childNodes;
val = list.childNodes[0];
val = list.childNodes[0].nodeName;
val = list.childNodes[1].nodeType;

// 1 - Element
// 2 - Attribute (deprecated)
// 3 - Text node
// 8 - Comment
// 9 - Document itself
// 10 - Doctype

// Get children element nodes (HTMLCollection) - Returns just the elements
// NOTE These are the actual <li> elements in the Tasks list
val = list.children;
val = list.children[1].textContent = "Hello"; // Changes from 'List Item' to 'Hello'

// Get chidren of children
list.children[3].children[0].id = "test-link";
val = list.children[3].children[0];

// Returns the first child (regardless if node is an element or text)
val = list.firstChild;
// Use firstElementChild to only get an element node back
val = list.firstElementChild; // <li class="collection-item">

// Returns the last child (regardless if node is an element or text)
val = list.lastChild;
// Use lastElementChild to only get an element node back
val = list.lastElementChild; // <li class="collection-item">

// Get the count of child elements (li elements within the ul element)
val = list.childElementCount; // 5 -- because we have 5 <li> elements inside <ul>

// Get parent node
val = listItem.parentNode; // <ul>
val = listItem.parentElement; // <ul>

// // Get parent of parent li -> ul -> div
val = listItem.parentElement.parentElement; // <div class="card-action">

// // Get next sibling
val = listItem.nextSibling; // #text node
val = listItem.nextElementSibling; // <li>
val =
  listItem.nextElementSibling.nextElementSibling.previousElementSibling
    .innerText; // Hello element

// // Get previous sibling
val = listItem.previousSibling; // #text
// val = listItem.previousElementSibling; // null because listItem is the first in the list
console.log(val);
