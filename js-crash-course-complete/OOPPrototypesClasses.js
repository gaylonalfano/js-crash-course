// Constructor function using ES5
// function Person(firstName, lastName, dob) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.dob = new Date(dob);
// }

// // Add methods to the prototype object
// Person.prototype.getBirthYear = function () {
//   return this.dob.getFullYear();
// }

// Person.prototype.getFullName = function () {
//   return `${this.firstName} ${this.lastName}`;
// }

// Using ES6 Class Methods
class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
  }

  getBirthYear() {
    return this.dob.getFullYear();
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Instantiate object
const person1 = new Person('Gaylon', 'Alfano', '1981-5-29');
const person2 = new Person('Archie', 'Alfano', '2014-7-2');
const person3 = new Person('Aaron', 'Alfano', '2013-5-29');

console.log(person3.getBirthYear());
console.log(person1.getFullName());
console.log(person1);

