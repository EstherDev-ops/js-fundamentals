/*
1. What iss the output of this code and why? 
console.log(x);
var x = 5;
console.log(x);

Answer: the output is: undefined and five, Because the vaariable x is hoisted to the top of its scope and initialized with undefined so when JS access x before declaration it return undefined, and after declaration it return 5.

2. What is the output here and why?
console.log(y);
let y = 5;

Answer: ReferrenceError: Because let is hoisted  but not initialized, when JS access y before declaration it trhrows a referrence error.

3. What's wrong with this code? Fix it? 
const config = { env: "production" };
config = { env: "development" };

Answer: The code is trying to reassing the variable config itself which is not allowed using const, to fix it we change the value of the property instead of reassigning the variable itself:

const config={env: "production"};
config.env = "development";
console.log(config.env);

4. what does it print and why?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

Answer: 3,3,3. var is a fucntion scope not a block scope, that means there is only one i in the memory, shared across all iterations of the loop. The loop runs completion synchrously and i becomes 3 and stops. 'setTimeout' are async they don't run until the call stack is clear, which after the loop has finished the same i in the memory gets executed resulting in 3 being printed three times. 

5. What is temporal dead zone and hoe does it relate to let and const? TDZ is the period btween the start of block and the line where variable is declared, during this window the variable exist but hoisted, JS deliberately doesn't aassign the variable even to undefined, if I try to read or access the variable before declaration, JS will throw a reference error.

How do you actually clone an object so that chenges to the clone don'taffect the original object? Give one method and write a code;

ANswer: we can use spread operator or object assign to clone. 
SPread operator: 
let user= {name: "Esther"};
let clone={...user}; spread operator used in shallow clone
clone.name = "Dev";

console.log(user.name);// Esther
console.log(clone.name);// Dev

Question 1: E-commerce Orders

You work for an online store.

Given this array:

const products = [
  { name: "Laptop", price: 80000, quantity: 2 },
  { name: "Phone", price: 30000, quantity: 1 },
  { name: "Keyboard", price: 5000, quantity: 3 },
];
Task

Using chained .map() only:

Create a totalCost property:
price * quantity
Then transform the result again so:
name becomes uppercase
totalCost becomes a string:
"KES 160000"
Expected output
[
  { name: "LAPTOP", totalCost: "KES 160000" },
  { name: "PHONE", totalCost: "KES 30000" },
  { name: "KEYBOARD", totalCost: "KES 15000" }
]

ANSWER:const products = [
  { name: "Laptop", price: 80000, quantity: 2 },
  { name: "Phone", price: 30000, quantity: 1 },
  { name: "Keyboard", price: 5000, quantity: 3 },
];

const newProducts = products.map((product) =>({
  name: product.name,
  totalCost: product.price * product.quantity
}))

.map((product) =>({
  name: product.name.toUpperCase(),
  totalCost: `KES ${product.totalCost.toLocaleString()}`
}))
console.log(newProducts);


const employees = [
  { name: "Esther", salary: 70000, bonus: 10000 },
  { name: "John", salary: 50000, bonus: 5000 },
  { name: "Mary", salary: 90000, bonus: 15000 },
];

const newEmployees = employees
   .map((employee) =>({
    name: employee.name,
    totalPay: employee.salary + employee.bonus
   }))

   .map((employee) => ({
    name: employee.name.toLowerCase(),
    totalPay:`KES ${employee.totalPay.toLocaleString()}`
   }))
   console.log(newEmployees);


REAL INTERVIEW ARRAY QUESTIONS

1. FLATTEN A NESTED ARRAY: NOTE - this comes up constantly
 Given a nested array below, flatten it

 const nested = [1, [2, 3], [4, [5, 6]], 7];
 expected output: [1, 2, 3, 4, 5, 6, 7]

 SOLUTION 1: Using JS built in flat() method.
 flat() by default only goes one level deep, For it to go another level deep we pass a number, we use Inifinity to flatten everything regardless of the depth.
 const nested = [1, [2, 3], [4, [5, 6]], 7];
 console.log(nested.flat()) By default: [1, 2, 3, 4, [5, 6], 7];
 console.log(nested.flat(2)); [1,2,3,4,5,6,7];
 console.log(nested.flat(Infinity));[1,2,3,4,5,6,7];

 SOLUTION TWO: We use reduce method: You can be told now solve it another way without using flat(), here we use reduce()
 
const nested = [1, [2, 3], [4, [5, 6]], 7]; // expcted output: [1,2,3,4,5,6,7]

const flatten = (arr) => {
  return arr.reduce((acc, current) =>{
    if(Array.isArray(current)){
    return acc.concat(flatten(current));// recussion where flatten function calls itself
    }
    return acc.concat(current);
  }, [])
}
console.log(flatten(nested));

acc starts as empty array []

iteration 1: current value is 1, we check if it is an array: Array.isArray(1) false, thus acc.concat(1) runs and return [1]
iteration 2: current value is [2,3], we chaeck if it is an array, Array.isArray([2,3])// true thus recurssion occurs where flatten([2,3]) calls itself, thus arr = [2,3], the we reduce the array, arr.reduce((acc, current)): here acc = [], current = 2, we check is 2 is an array, false thus we perform acc.concat(2), which returns [2], then we check 3, is false [2].concat(3) runs, flatten return([2,3]), then we run [1].concat([2,3]), where we output as [1,2,3
iteration 3: [4,[5,6]] checks 4, returns false. concat, [1,2,3,4] then [5,6] call flatten(), concat, which result to [1,2,3,4,5,6]
 we hit 7, check false not array, concat and result [1,2,3,4,5,6,7]


Given a nested array containing numbers and subarrays, write a function that returns the sum of all values regardless of nesting depth.

const numbers = [1, [2, 3], [4, [5]], 6];

const numbers = [1, [2,3], [4, [5]], 6];

const sum = (number) =>{
  return number.reduce((acc, number) => {
      if(Array.isArray(number)){
        return acc + (sum(number))
      }
      return acc + number;
  }, 0);
}
console.log(sum(numbers));

Questions 2: Given the array remove the duplicates in this araay. 

const numbers = [1,2,2,3,4,4,4,,5];

SOLUTION 1: using set: which is a data structure that stores only unique values, thus duplicates are automatically removed.

const newNumbers = [...new Set(numbers)];
console.log(numbers);[1,2,3,4,5]

NOTE: new Set(numbers)- creates a unique set of numbers while ...(spread operator)-  converts back to new array

SOLUTION 2: Filter:  returns array containing only values where callback returns true.
const numbers = [1,2,2,3,4,4,4,,5];

const newNumbers = numbers.filter((number, index) =>{
  return numbers.indexOf(number) === index
  })
  console.log(newNumbers);
EXPLANATION:
indexOf, always return the first value/index match

Iteration 1: number = 1, index = 0, numbers.indexOf(1) = 0, thus 0 === 0; true thus [1]

Iteration 2: number = 2, index = 1, we chack numbers.indexOf(2) = 1
1 === 1; true thus it outputs [1,2]

Iteration 3: number = 2, index = 2, we check numbers.indexOf(2) = 1, thus 1 === 2; false, thus it is dropped

mplement a utility function that returns unique elements from an array or Deduplicate an array


Given this array, write a code to get the average price:(we use reduce)
const products = [
  { name: "Serum", price: 1500 },
  { name: "Toner", price: 600 },
  { name: "Moisturizer", price: 800 },
  { name: "Sunscreen", price: 1200 },
];

const total = products.reduce((acc, product) => acc + prodcut.price, 0 );
  const average = total /products.length;

console.log(average);

Remove the duplicates from this array: 
const clients = [
  "Urban Glam",
  "Serene Clinic",
  "Urban Glam",
  "Azizi",
  "Serene Clinic",
];

const uniqueClients = clients.filter((client,index) => {
  return clients.indexOf(client) === index;
});
console.log(uniqueClients);

const inventory = [
  { name: "Serum", price: 1500, inStock: true },
  { name: "Toner", price: 600, inStock: true },
  { name: "Moisturizer", price: 800, inStock: false },
  { name: "Sunscreen", price: 1200, inStock: true },
  { name: "Cleanser", price: 400, inStock: true }
];

const newInventory = inventory
.filter((item) => item.inStock === true)

const inventory = [
  { name: "Serum", price: 1500, inStock: true },
  { name: "Toner", price: 600, inStock: true },
  { name: "Moisturizer", price: 800, inStock: false },
  { name: "Sunscreen", price: 1200, inStock: true },
  { name: "Cleanser", price: 400, inStock: true },
];

const newInventory = inventory
.filter((item) => item.inStock === true && item.price > 700)
.map((item) =>item.name)
console.log(newInventory);
*/

