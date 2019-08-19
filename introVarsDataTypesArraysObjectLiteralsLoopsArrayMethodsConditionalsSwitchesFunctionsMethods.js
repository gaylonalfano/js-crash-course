// // data types
// const name = 'John';
// const age = 30;
// const isCool = true;
// const rating = 4.5;
// const x = null;
// const y = undefined;
// let z; // just initialize only

// console.log(typeof name);
// console.log(typeof isCool);
// console.log(typeof x); // object - this is a mistake!
// console.log(typeof z);

// // Concatentation
// console.log("My name is name and I am age")
// const hello = `My name is ${name} and I am ${age}`
// console.log(hello)

// // String properties and methods
// const s = 'Technology, computers, it, code';

// console.log(s.length);
// console.log(s.toUpperCase());
// console.log(s.toLowerCase());
// console.log(s.substring(0, 5));
// console.log(s.split(', '))

// // Arrays - variables that hold multiple values
// const numbers = new Array(1, 2, 3, 4, 5);
// const fruits = ['apples', 'oranges', 'pears', 10, true];
// // fruits = [];  Can't do this because of const

// fruits[3] = "grapes"

// fruits.push("mangos")
// fruits.unshift("strawberries")
// fruits.pop();
// console.log(Array.isArray('hello'))  // false
// console.log(fruits.indexOf('oranges'))  // 2
// console.log(fruits);

// // Concatenate arrays
// // array1.concat(array2)

// // // Sorting arrays with .sort();

// // // Use the "compare function"
// // val = numbers.sort(function (x, y) {
// //   return x - y;
// // });

// // // Reverse sort
// // val = numbers.sort(function (x, y) {
// //   return y - x;
// // });

// // Object literals
// const person = {
//   firstName: 'John',
//   lastName: 'Doe',
//   age: 30,
//   hobbies: ['music', 'movies', 'sports'],
//   address: {
//     street: '50 main st',
//     city: 'Boston',
//     state: 'MA'
//   }
// }

// console.log(person.hobbies[1])
// const { firstName, lastName, address: { city } } = person;
// console.log(firstName) // John

// // Array of objects
// const todos = [
//   {
//     id: 1,
//     text: 'Take out trash',
//     isCompleted: true
//   },
//   {
//     id: 2,
//     text: 'Pay rent',
//     isCompleted: false
//   },
//   {
//     id: 3,
//     text: 'Buy milk',
//     isCompleted: true
//   },
// ];

// console.log(todos)
// console.log(todos[1].text)
// const todoJSON = JSON.stringify(todos)
// console.log(todoJSON)

// // For loops
// for (let i = 0; i < 10; i++) {
//   console.log(`For loop number: ${i}`)
// }

// // While
// let i = 0;
// while (i < 10) {
//   console.log(`While loop number: ${i}`);
//   i++;
// }

// // Looping arrays w/ for loop - Most basic
// for (let i = 0; i < todos.length; i++) {
//   console.log(`Array looping over ${todos.length}. Now at number ${i}`)
// }

// for (let i = 0; i < todos.length; i++) {
//   console.log(`Looping text ${todos[i].text}`)
// }

// // For Of loops
// for (let todo of todos) {
//   console.log(todo.text);
// }


// // High Order Array Methods forEach, map, filter
// // forEach
// todos.forEach(function (todo) {
//   console.log(todo.text);
// });

// // map
// const todoText = todos.map(function (todo) {
//   return todo.text;
// });

// console.log(todoText)
// console.log(typeof todoText)  // object

// // filter
// const completedTodos = todos.filter(function (todo) {
//   return todo.isCompleted === true;
// });

// console.log(completedTodos);  // Array of objects

// // Chain operations
// const todoCompleted = todos.filter(function (todo) {
//   return todo.isCompleted === true;
// }).map(function (todo) {
//   return todo.text;
// });

// console.log(todoCompleted);


// // Conditionals
// const x = 6;
// const y = 11;

// if (x > 5 && y > 10) {
//   console.log('x is more than 5 or y is more than 10');
// }

// // Ternary operator - shorthand if statement
// const x = 10;

// const color = x > 10 ? 'red' : 'blue';

// console.log(color);


// // Switches
// const x = 10;

// const color = 'green';

// switch (color) {
//   case 'red':
//     console.log('color is red')
//     break;
//   case 'blue':
//     console.log('color is blue');
//     break;
//   default:
//     console.log('color is not red or blue')
//     break;
// }


// // Functions
// function addNums(num1 = 1, num2 = 1) {
//   return num1 + num2;
// }

// console.log(addNums(5, 4));

// Arrow functions
const addNums = num1 => num1 + 5;

console.log(addNums(7));

// todos.forEach((todo) => console.log(todo));

// Methods

const todo = {
  add: function () {
    console.log('Add todo..');
  },
  edit: function (id) {
    console.log(`Edit todo ${id}`);
  }
}

todo.delete = function (id) {
  console.log(`Delete todo ${id}`)
}

todo.add();
todo.edit(5);
todo.delete(9);
