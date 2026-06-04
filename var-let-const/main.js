/* 
VARIABLE & SCOPE
Variable: is a reference to a value store in the memory

Var- used to defined variable before ES6, it has function scope and can be re-declared and updated. It doesn't respect block rules
if(true){
  var name = "John";
  }
  console.log(name);// John, var leaks out of tthe block scope.

  Let-  used to define a variable with block scope. it can be updated but not re-declared within the same scope. 

let name = "John";
name = "Doe"; //valid.

Block scope: is the region where code is enclosed within the curly braces{}. it has const and let. 

In const you can reassign an object or array but you can't reassign the variable itself.

const user = {name: "John", };
user.name = "Doe";
console.log(user.name);

HOISTING: JS allocates the memory before execution, 

using var the variable is hoisted and initialized with undefined, so you can access it before declaration but it will return undefined. 
console.log(name);
var name = "John";

JS TREATS THIS AS:  var name; which this one is undefined. 
console.log(name);
name = "John";

Using let and const, the variable is hoisted but not initialized, you can't access it before declaration, it will throw a reference error.

FUNCTIONS & CLOSURE
Functions: Are block of code that is invoked multiple times, with no repetition of codes.

THREE WAYS TO DEFINE A FUNCTION:
1. Function declaration: it is fully hoisted, hence can be called before declaration. 
ex: function greet(name){
    return `Hello ${name};
}
    greet("Esther");

2. Function Expression: They can't be called before declaration, it will throw w type error
EX: const greet = function(name){
    return ``Hello ${name}; 
}
greet("Esther");

3. Arrow Function: They are simple, concise way to declare a function, but they behave different with 'this' keyword in comparision to normal function.

- PARAMETERS:  They are variables used as part of function defination. 3 Types of parameters
1. Default parameters: They fallback when an argument is not passed to a function, during function invication

2. Rest Parameter: They collect multiple arguments into an array.
 function log(level, ...messages){
    console.log(level, messages)
 }
log("Error", "file not found", "line 42");//["Error", "file not found", "line 2"]

3. Spread: it expands an array to individual argument.
 const numbers=[3, 4, 5];
 console.log(Math.max(...numbers));// 5 

 PURE FUNCTIONS AND IMPURE FUNCTIONS
PUREF FUNCTIONS: Are functions that return the same output as the same input given and they don't have side effect. 
EX function add(a,b){
  return a + b;
}
IMPURE FUNCTION: They touches external state and also have side effect:
Ex:  let total = 0;
function addTotal(n){
 total +=n;(side effect)
}
addTotal(3); // 3

CLOSURE: Is a state where inner functions remebers variable in its outer function scope, even after the outer function scope have completed executing.
function outer(){
  let name = "Esther";
  function inner(){
      console.log(name);
  }
      return inner;
}
const fn = outer();
fn(); // Esther, the inner function creates a closure ove outer function scope, where it still has access to it's variable name, where it was defined even if the outer function scope has finished completing.

NOTE: Closures are  often used in codebases, you will find them.

EXAMPLE: if you create a private variable we access it indirectly by returned methos, this is known as Data encasulaption with closure;
EXAMPLE:

function outer(){
   let count = 0;
   return{
      increment(){count ++},
      decrement() {count --},
      getCount(){return count}
   }
};
const counter = outer();
counter.increment(); 1
counter.increment(); 2
counter.decrement();1
console.log(counter.getCount());1

The Classic Closure Bug — You Need To Know This
javascriptfor (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
3, 3, 3
You already solved this earlier. Now you know the exact term for why let fixes it — each iteration creates a new block scope, and the setTimeout callback closes over a different i each time. That's closures in action.


function userAccount(){
  let balance = 0;
  
  return{
    deposit(cash){
      balance += cash;
      console.log(`Deposited amount: ${cash}`);
    },
    withdraw(cash){
      if(cash > balance){
        console.log("Insufficient balnce, kindly recharge your balance");
        return;
      }
      balance -= cash;
      console.log(`withdraw: ${cash}`)
    },

    getBalance(){
      return balance;
    }
  };
}
const amount = userAccount();

amount.deposit(1000);
amount.withdraw(400);
console.log(amount.getBalance());

*/
/* 
ARRAY & ARRAY METHODS

Array: is an ordered list of value store in a hep memory.
 the varibale referencing the array is stored in stack while array stored in heap.

ACCESSING ELEMENT IN ARRAY:
Accessing element/ values in array we use indexes. 
EXAMPLE:
const names = ["Esther", "Dev", "John", "Soft"];
console.log(names[0]); // Esther
console.log(name[4]); //undefined- since JS tries to read or access value of index 4, which is not defined in the abpve array.

NOTE: if I want ot access the last element without knowing the length this is what we follow: console.log(names[names.length - 1]);// Soft


BASIC ARRAY  PROPERTIES & METHODS

const fruits = ["Oranges", "Banana", "Apples"];

 1. finding the length of an array
  console.log(fruits.length); // 3

  2. Adding an element at the end of an array, we use (.push)
     fuits.push("Mangos");
     console.log(fruits); ["Oranges", "Banana", "Apples", "Mangos"]

     3. Removing an element at the end of an array am going to use .pop()
     fruits.pop();
     console.log(fruits);["Oranges", "Banana", "Apples"]

     4. Adding an element at the beginning of an array, use .unshift()
     fruits.unshift("Pears");
     console,log(fruits);["Pears", "Oranges","Banana", "Apples"];

     5. Remove an element at the beginning of an array we use .shift()

    fruits.shift();
    console.log(fruits);["Oranges", "Banana", "Apples"]
    
    6. To check if an element exist in array we use(.include())
      console.log(fruits.include("Orange"));//true
      console.log(fruits.include("Grapes")); //false

    7.  Find the index of an element we use(.indexOf())
      console.log(fruits.indexOf("Banana")); 1


LOOPING THROUGH ARRAYS

1. for: use when I want to find the  index of a specific element
const names = ["Esther", "Jane", "Omo", "Arial"];
for(let i = 0; i < names.length; i++){
     console.log(names[i])
}
  
2. for..of: loops over values in an array
for(const name of names){
   console.log(name);
}

ARRAY METHODS

1. forEach: it take callback function and runs on every elementconst services = [
  { name: "Booking Automation", price: 15000 },
  { name: "Follow-up Sequences", price: 8000 },
  { name: "WhatsApp Assistant", price: 25000 },
];

services.forEach((service)=>{
  console.log(`Booking Automation: ${service.price}`);
});
NOTE: forEach always return undefined, so you cannot chain it. You can store its return value and get an array.
ALways use forEach if you want to do something to each element. logging, sending email, updating the DOM, triggering side effects.

Question: You have this array. Write a forEach that logs each service in this format: "Booking Automation- KES 15,000"

const services = [
  { name: "Booking Automation", price: 15000 },
  { name: "Follow-up Sequences", price: 8000 },
  { name: "WhatsApp Assistant", price: 25000 }
];
services.forEach((service) =>{
  console.log(`${service.name} - KES ${service.price.toLocaleString()}`);
  });

  .toLocaleString() formats KES 15000 to 15,000 with a comma

.map(): trnasform each element in array  and return a new array with the same length. 

const users = ["Esther" "Dev", "John"];
const newNames = names.map((name) => user.toUpperCase());

STRING METHODS
1. split: breaks a string into an array
const name = "urban glam"
const words = name.split(" ");
console.log(words); ["urban", "glam"]

2. Join: merge a string into an araay
const words = ["urban", "glam"];
const name = words.join(" ");
console.log(name); "urban glam"

3. slice: it cuts out part of a string
const city = "Nairobi";
console.log(city.slice(0,3))- we access the index of 0 to 2, we don't include  index of three. thus: "Nai"

toUpperCase & toLowerCase
 const name = "Esther";
 console.log(name.toUpperCase())// "ESTHER"
 console.log(name.toLowerCase())// "esther"

 But if you want only to capitalize or lower the letters we access the letters with indexes.

const city = "eldoret";
console.log(city[0],toUpperCase()); // "E"
NOTE: if you want to get the full string with toUpperCese applied you slice() to give the rest.
const city = "nairobi";
const newCity = city[0].toUpperCase() + city.slice(1)
console.log(newCity);// Nairobi

const str = "  Hello Nairobi  ";

 trim — removes whitespace from both ends
str.trim() // "Hello Nairobi"

 includes — checks if a string contains something
"Nairobi".includes("rob") // true

replace — replaces part of a string
"Hello World".replace("World", "Nairobi") // "Hello Nairobi"

toLowerCase practical use — comparing strings safely
"NAIROBI".toLowerCase() === "nairobi" // true

const appointments = [
  { id: 1, clientName:"urban glam", date: "2024-01-15", confirmed: false },
  { id: 2, clientName: "serene clinic", date: "2024-01-16", confirmed: false },
  { id: 3, clientName: "azizi realtors", date: "2024-01-17", confirmed: false },
];

const newAppointments = appointments.map((appointment) =>({
  id: appointment.id,
  clientName: appointment.clientName
     .split(" ")
       .map((word) => word[0].toUpperCase() + word.slice(1))
       .join(" "),
       date: appointment.date,
       confirmed: true
}));
console.log(newAppointments);

CHAINING: Calling another method on the result of the previous

const orders = [
  { product: "Serum", quantity: 3, unitPrice: 1500 },
  { product: "Toner", quantity: 2, unitPrice: 600 },
  { product: "Moisturizer", quantity: 5, unitPrice: 800 },
];

const result = orders.map((order) => ({
  product: order.product,
  total: order.quantity * order.unitPrice,
}))

.map((order)=> ({
  product: order.product
  total: `KES ${order.total}`
}));

console.log(result);

filter(): it returns new array where it contain values/elements where the callback returns true.

const numbers = [1, 2, 3, 4, 5, 6, 8, 10];

const evenNumbers = numbers.filter((n) => n % 2 === 0);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
console.log(numbers);     // [1, 2, 3, 4, 5, 6, 8, 10] — untouched

NOTE: If you are chaining between .filter and .map, we first start to filter and then we map()
EXAMPLE: 
const products = [
  { name: "Serum", price: 1500, inStock: true },
  { name: "Toner", price: 600, inStock: false },
  { name: "Moisturizer", price: 800, inStock: true },
  { name: "Sunscreen", price: 1200, inStock: false }
];

const availableNames = products
  .filter((product) => product.inStock === true)
  .map((product) => product.name);

console.log(availableNames); // ["Serum", "Moisturizer"]
const clients = [
  { name: "Urban Glam", country: "Kenya", active: true },
  { name: "Paige UK", country: "UK", active: false },
  { name: "Serene Clinic", country: "Kenya", active: true },
  { name: "Azizi Realtors", country: "Dubai", active: true },
  { name: "Elen Rivas", country: "UK", active: false },
];

const activeClients=clients
.filter((client) => client.active === true)
.map((client) => client.name
  
)
console.log(activeClients);

4. find: returns the first element that passes the test.
const clients = [
  { id: 1, name: "Urban Glam", country: "Kenya" },
  { id: 2, name: "Serene Clinic", country: "Kenya" },
  { id: 3, name: "Azizi Realtors", country: "Dubai" }
];

const result = clients.find((client) => client.id === 2);

console.log(result); 
 { id: 2, name: "Serene Clinic", country: "Kenya" }
NOTE: if no element passes the test it returns undefined:
 Nothing matches — returns undefined
const result = clients.find((client) => client.country === "UK");
console.log(result); // undefined

5. some: Retrun true if at least one element passes  the test, if none passes then it returns false.
const prices = [200, 500, 1500, 3000];

console.log(prices.some((p) => p > 2000)); true 
console.log(prices.some((p) => p > 5000)); false

Reduce: it takes array and reduce it down to a single value.
it takes to arguments: A callback function & initial value
the callback function takes two parameters(accumulator, current)

const numbers = [200, 300, 400];

const total = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(total); 

const orders = [
  { product: "Serum", quantity: 3, unitPrice: 1500 },
  { product: "Toner", quantity: 2, unitPrice: 600 },
  { product: "Moisturizer", quantity: 5, unitPrice: 800 },
];

const totalRevenue = orders
.reduce((acc, order) => {
  return acc + (order.quantity * order.unitPrice);
},0)
 const totalItems = orders.reduce((acc, order) => {
  return acc + order.quantity;
 }, 0)
console.log(totalRevenue);
console.log(totalItems);
*/
/* 
OBJECTS:  DESTRUCTURING, SPREAD& REST

Destructuring: Is a way of unpacking values from objects or arrays into variables.

const user = {
    name: "John",
    age: 34,
    department: "Engineering"
}
cont{name, age, department} = user;
console.log(name); John
console.log(age); 34
console.log(department); Engineering

Renaming while destructuring
 const user = {
    name: "John",
    country: "Germany"
 }
 const{name:userName, country: location} = user
 console.log(userName);John
 console.log(location); Germany
'name: userName' means that the property name, is put in a variable called userName.

Default values in Destructuring
If a property doesn't exist, I can provide a fallback, during destructuring

const user = {
    name: "Doe"
    age: 34
}
const{name, age, department="Designs"} = user;
console.log(department); // Design- this is a fallback value, since department property is not provided in the user object.

Nested Destructruing:
objects inside objects

const user ={
   name: "Doe",
   location:{
     city: "Nairobi"
     country: 'Kenya'
   }
}
const{name, location:{city, country}} = user;
console.log(city); Nairobi
console.log(country); Kenya

NOTE: location itself is not create as a variable here, only city and country are.

DESTRUCTURING IN FUNCTION PARAMETER:

const user = {
   name: "John",
   country: "Kenya"
   active: true
}
 WITHOUT DESTRUCTRURING
 function greet(user){
   console.log(`Hello ${user.name} from ${user.country}`)
 }

 WITH DESTRUCTURING
  function greet({name, country}){
    console.log(`Hello ${name} from ${country}`);
  }
    greet(user); Hello John from Kenya

ARRAY DESTRUCTURING

const cars = ["BMW", "Suzuki", "Mercedes"];
const[first, second, thrid] = cars;
console.log(first); BMW

SPREAD OPERATOR: Creates a new object or array and copies the elements/properties of the original object/array into the new one.

const user = {
   name: "John",
   country: "Kenya"
}
  const updateUser = {...user, active:true}=user
  console.log(updateUser); John, Kenya, true

You can overide a property:
const user = {
   name: "John",
   country:"Kenya"
}
const newUser = {...user, country: "Dubai"}
console.log(newUser); John, Dubai, so the country Kenya has been override.

REST WITH OBJECTS: Rest- scoops everything that was not explicitly detructured.

const user = {
     
}
*/
/*const defaults = {
  theme: "light",
  language: "en",
  notifications: true,
};

const userPreferences = {
  theme: "dark",
  fontSize: 16,
};

const newPreferences = {...defaults, ...userPreferences}
console.log(newPreferences); 

const bookings = [
  { id: 1, client: "Urban Glam", amount: 15000, status: "confirmed" },
  { id: 2, client: "Serene Clinic", amount: 8000, status: "pending" },
  { id: 3, client: "Azizi Realtors", amount: 25000, status: "confirmed" },
];
function createInvoice({ client, amount, status }) {
  return `Invoice for ${client} - KES ${amount} - Status: ${status}`;
}
console.log(createInvoice(bookings[0]));

const colors = ["red", "green", "blue"];
const settings = { fontSize: 14, fontFamily: "Inter", bold: false };

const  [first, , third] = colors;
console.log(first);
console.log(third);

const settings = {fontSize: 14, fontFamily: "Inter", bold: false}
const{fontSize: size, fontFamily} = settings;
console.log(size);
console.log(fontFamily);

*/
/*const order = {
  id: 101,
  client: {
    name: "urban glam",
    contact: {
      email: "info@urbanglam.co.ke",
      phone: "0712345678",
    },
  },
  amount: 15000,
  status: "confirmed",
};

const{id, status, client:{name:clientName, contact:{email}}, discount= 0}= order;
console.log(id);
console.log(clientName);
console.log(email);
console.log(discount);
function newOrder({
    id,
    client:{name},
    amount,
    status
 }){
  console.log(`Order ${id} for ${name}- Kes ${amount} - ${status}`)
 }
newOrder(order);

const baseEmployee = {
  company: "VORTA AI",
  role: "developer",
  active: true,
  permissions: ["read", "write"],
};

const newEmployee = {
  name: "Esther",
  role: "founder",

  permissions: ["read", "write", "admin"],
};

const decisionMaker = {...baseEmployee, ...newEmployee}
const{name, role, ...details} = decisionMaker;
console.log(name);
console.log(role);
console.log(details); 

OPTIONAL CHAINING (?.) & NULLISH COALENCING(??)

Optional chaining(?.): It is a JS operaotor used to safely acces properties or methods without causing errors, if something is null or undefined

Example: If an object don't have a property, instead of throwing an error, we use optional chaining to return undefined.

const user = {
  name: "Esther",
}
console.log(user.address.city);// TypeError, since address properties doen't exist,

we use optional chaining: console.log(user?.address?.city); //returns undefined

NULLISH COALESCING: It is a JS operator that provides a default value, only when the left side is null or undefined.

console.log(0 ?? 10);         // 0 — 0 is valid
console.log("" ?? "default"); // "" — empty string is valid
console.log(false ?? true);   // false — false is valid
console.log(null ?? "default");     // "default" — null triggers fallback
console.log(undefined ?? "default"); // "default" — undefined triggers fallback

cpmbining optional chaining and nullish coalencing

const user = {
     name: "Esther"
};

const city = user ?. adress ?. city ?? "City not provided";
console.log(city); // City not provided

EXPLAINATION: ?. safely navigates and return undefined, isnce the adress doesn't exist. ?? catches that undefined and provides a fallback. 

REAL WORLD: API RESPONSE HANDLING

const response = {
  data: null
};

const username = response?.data?.user?.name ?? "Guest";
console.log(username); // "Guest"


const bookings = [
  { id: 1, client: "Urban Glam", amount: 15000, status: "confirmed" },
  { id: 2, client: "Serene Clinic", amount: 8000, status: "pending" },
  { id: 3, client: "Azizi Realtors", amount: 25000, status: "confirmed" },
  { id: 4, client: "Paige UK", amount: 12000, status: "cancelled" },
  { id: 5, client: "Elen Rivas", amount: 18000, status: "confirmed" },
];

const totalAmount = bookings
.filter(({status}) => status === "confirmed")
  .reduce((total, amount) => total + amount, 0)
  


console.log(totalAmount);

const employees = [
  { name: "Esther", role: "founder", company: "VORTA AI", active: true },
  { name: "John", role: "developer", company: "VORTA AI", active: false },
  { name: "Maina", role: "designer", company: "VORTA AI", active: true },
  { name: "Aisha", role: "marketer", company: "VORTA AI", active: false },
  { name: "Wanjiru", role: "developer", company: "VORTA AI", active: true },
];

const newEmployees = employees
.filter(({active}) => active === true)
.map(({name, role, company}) =>{
  return `${company} - ${name} (${role})`
})
console.log(newEmployees) 

const products = [
  { name: "Serum", price: 1500, stock: 10 },
  { name: "Toner", price: 600, stock: 0 },
  { name: "Moisturizer", price: 800, stock: 5 },
  { name: "Sunscreen", price: 450, stock: 3 },
];

console.log(products.some((product) => product.stock === 0));
console.log(products.every((product) => product.price > 500)); 

const clients = [
  { name: "Urban Glam", country: "Kenya" },
  { name: "Serene Clinic", country: "Kenya" },
  { name: "Paige UK", country: "UK" },
  { name: "Elen Rivas", country: "UK" },
  { name: "Azizi Realtors", country: "Dubai" },
];

const newClients = clients.reduce((acc,person) => {
  const country = person.country;
  if(!acc[country]){
    acc[country] = [];
  }
  acc[country].push(person.name);
  return acc;
}, {});

console.log(newClients)

const invoices = [
  { client: "Urban Glam", amount: 15000 },
  { client: "Serene Clinic", amount: 8000 },
  { client: "Azizi Realtors", amount: 25000 },
  { client: "Paige UK", amount: 12000 },
];

const highestInvoices = invoices.reduce((acc, current) => {
  return current > acc ? current : acc
},0);
console.log(highestInvoices); */
