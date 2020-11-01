// @ts-nocheck
// NOTE Change the index.html to point to this script

// Select the Clear Tasks button and add an event listener for 'click'
// <a class="clear-tasks btn black" href>Clear Tasks</a>
// NOTE Add href='#' to button in HTML file to stop browser from doing a refresh on click
// document.querySelector(".clear-tasks").addEventListener("click", (e) => {
//   console.log("Clicked");

//   e.preventDefault();
// });

// Using a named function instead and the EVENT OBJECT
document.querySelector(".clear-tasks").addEventListener("click", onClick);

function onClick(event) {
  // console.log("Clicked");

  let val;
  val = event;

  // Event target
  val = event.target; // <a class="..."> HTML
  val = event.target.id;
  val = event.target.className; // clear-tasks btn black
  val = event.target.classList[1]; // btn
  // Change the text of the actual button
  event.target.innerText = "Ni hao!"; // Changes to 'Ni hao!' when clicked.

  // Event type
  val = event.type; // click or mouseover etc.

  // Timestamp
  // val = event.timeStamp; // 2182.585

  // Coordinates of event relative to the WINDOW (where on the screen)
  val = event.clientY;
  val = event.clientX;

  // Coordinates of event relative to the ELEMENT itself using offsetY/X
  val = event.offsetY;
  val = event.offsetX;

  console.log(val);
}
