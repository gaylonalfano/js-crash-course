// Selecting things from the DOM
// Single element
// const form = document.getElementById("my-form");
// console.log(form);
// console.log(document.querySelector('.container'));


// Multiple elements
// console.log(document.querySelectorAll('.item'));
// console.log(document.getElementsByClassName('item'));

// const items = document.querySelectorAll('.item');
// console.log(items);

// items.forEach(todo => console.log(todo));


// // Manipulating things from the DOM
// const ul = document.querySelector('.items');

// // ul.remove();
// // ul.lastElementChild.remove();
// ul.firstElementChild.textContent = 'Hello';
// console.log(ul.children[2].textContent);
// ul.children[1].innerText = 'Gaylon';
// ul.lastElementChild.innerHTML = '<h1>Hello with html!</h1>';

// // Change styling
// const btn = document.querySelector('.btn');
// // console.log(btn.getAttribute('value'));
// btn.style.background = 'red';


const btn = document.querySelector('.btn');

btn.addEventListener('mouseout', (e) => {
  e.preventDefault();
  document.querySelector('#my-form').style.background = '#ccc';
  document.querySelector('body').classList.add('bg-dark');
  document.querySelector('.items').lastElementChild.style.background = 'red';
  document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
});
