// @ts-nocheck
// CREATING ELEMENTS
// NOTE Swap this file inside index.html <script src>

// Create element
const li = document.createElement("li");

// Add a class to element using .className
li.className = "collection-item";

// Add an id
li.id = "new-item-id";

// Add attribute
li.setAttribute("title", "New Item"); // <li class id title> all set!

// Create text node using .createTextNode and append with .appendChild();
// NOTE This is the visible text between open/close <li>HERE</li>
li.appendChild(document.createTextNode("Hello World"));

// Create a new link element <a> for the delete 'x'
const link = document.createElement("a");
// Add classes (check HTML <a> delete for ref)
link.className = "delete-item secondary-content";
// Add icon <i> HTML directly using innerHTML
link.innerHTML = '<i class="fa fa-remove"></i>';
// Add href="#" to link  -- ?? What does '#' do? SPECIFIES html el to scroll to ('#some-id')
// By itself, '#' scrolls to top of page.
link.href = "#";
// Append this link as a child to our li element
li.appendChild(link);

// Append li as child to ul using .appendChild(li)
document.querySelector("ul.collection").appendChild(li); // finally see it in Tasks!
console.log(li);
