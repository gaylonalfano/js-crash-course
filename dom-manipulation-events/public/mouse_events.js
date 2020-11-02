// @ts-nocheck

// Let's make some pointers first
const clearBtn = document.querySelector(".clear-tasks");
const card = document.querySelector(".card");
const tasksHeading = document.getElementById("task-title");

// Create a standard event handler (const ARROW FUNCTION must be declared before)
// const runEvent = (e) => {
//   console.log(`Event Type: ${e.type}`);
// };

// // Single-Click event listener
// clearBtn.addEventListener("click", runEvent);

// // Double-Click event listener
// clearBtn.addEventListener("dblclick", runEvent);

// // Mousedown (click-and-hold) event listener
// clearBtn.addEventListener("mousedown", runEvent);

// // Mouseup (click-and-hold) event listener
// clearBtn.addEventListener("mouseup", runEvent);

// // Mouseenter (hover over PARENT element) event listener
// card.addEventListener("mouseenter", runEvent);

// // Mouseleave (hover out of PARENT element) event listener
// card.addEventListener("mouseleave", runEvent);

// // Mouseover (hover over parent + child elements)
// card.addEventListener("mouseover", runEvent);

// // Mouseout (hover out of parent + child elements)
// card.addEventListener("mouseout", runEvent);

// Mousemove (ANY movement within the event target)
card.addEventListener("mousemove", runEvent);

// Create a standard event handler (NORMAL FUNCTION can be declared after)
function runEvent(e) {
  console.log(`Event Type: ${e.type}`); // E.g. 'mousemove'
  console.log(`Event Target: ${e.target}`); // E.g. [object HTMLDivElement], localhost...

  // Let's have the Tasks heading (title) display the X,Y coords as we mousemove
  // console.log(tasksHeading.textContent); // "Tasks"
  tasksHeading.textContent = `(${e.offsetX}, ${e.offsetY})`;

  // Change the background color of document.body using rgb()
  document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
}
