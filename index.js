
 let person = {
    name: 'Jhon|',
    age: 30
 };

 console.log(person);
// Dot Notation
 person.name = 'Jhon';

 //Bracket Notation
 let selection = 'name';
 person [selection] = 'Mary';

 console.log(person.name);

 let selectedColors = ['red', 'blue'];
 selectedColors[2] = 'green';
 console.log(selectedColors);

// Performing a task
 function greet(name, lastName){
   console.log('Hello' + name + '' + lastName);
 }

 greet('John', 'Smith');
 greet('Mary', 'Jhonson');

 //Calculating a value
 function square(number) {
   return number * number;
 }
 console.log(square(2));
