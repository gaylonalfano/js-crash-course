// @ts-nocheck

// // === Event BUBBLING (Child UP TO Parent)
// // NOTE Need to click on the card title element to trigger 'click' event
// // NOTE Top-Bottom is actually bubbling UP via the DOM
// document.querySelector(".card-title").addEventListener("click", () => {
//   console.log("card title");
// });
// document.querySelector(".card-content").addEventListener("click", (e) => {
//   console.log("card content");
// });
// document.querySelector(".card").addEventListener("click", () => {
//   console.log("card");
// });
// document.querySelector(".col").addEventListener("click", () => {
//   console.log("col");
// });

// === WITHOUT Event Delegation
// NOTE It ONLY twiggers on the FIRST list item link (all others don't register!)
// This is when/why we need event delegation
// const deleteItemLinkElement = document.querySelector(".delete-item"); // <a class="delete-item">
// deleteItemLinkElement.addEventListener("click", deleteItem);

// function deleteItem() {
//   console.log("delete item");
// }

// === Event DELEGATION (Parent DOWN TO child)
// NOTE We can add the event listener to ANY parent (no matter how high up)
document.body.addEventListener("click", deleteItem);

function deleteItem(e) {
  console.log(`TARGET: ${e.target}`); // target icon <i> if I click 'x'. Better to deal with <a> tag instead
  console.log(`PARENT ELEMENT: ${e.target.parentElement}`);

  // Target 'x' delete link METHOD 1:
  // This works but it's fragile if you happen to change the className on an element:
  // if (e.target.parentElement.className === "delete-item secondary-content") {
  //   console.log("delete item");
  // }

  // Target 'x' delete link METHOD 2 (better):
  // Better is to use classList with .contains() instead of className
  // NOTE We could even add a new class to a link and this would still work
  // if (e.target.parentElement.classList.contains("delete-item")) {
  //   console.log("delete-item");
  // }

  // Target 'x' delete link METHOD 3 (best?):
  // Use the Element.matches() method
  if (e.target.parentElement.matches(".delete-item")) {
    console.log("delete item");
    // Now actually delete the entire <li>
    // NOTE e.target.parentElement = <a>, so parentElement.parentElement = <li>
    e.target.parentElement.parentElement.remove();
  }
}
