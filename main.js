// Grab stuff from the DOM
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// const user = {
//   'name': nameInput.value,
//   'email': emailInput.value,
// };
// Listen for submit event
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  // console.log(nameInput.value);
  if (nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    const user = `${nameInput.value} ${emailInput.value}`;
    const li = document.createElement('li');
    // li.classList.add('')
    li.appendChild(document.createTextNode(user))
    // li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
    userList.appendChild(li);
    // userList.insertAdjacentElement('afterend', li);  // adjacent, not nested
    // Clear the fields
    nameInput.value = '';
    emailInput.value = '';
  }
}