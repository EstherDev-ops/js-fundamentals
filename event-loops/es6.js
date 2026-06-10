/*  
Destructuring: Is a way of unpackinf elements or properties from an object or array to a variable.

const user = {
name: "Esther",
age: 23,
role: "Developer"
}
const {name, age, role} = user
console.log(name);
console.log(age)

Spread operator:  Used to create a new object or array, and copies the original properties or elements, into it

const numbers = [10, 20, 30, 40];

const newNumbers = [...numbers]

optional chaining: Is a safe way to access properties, or elements in array or object, without causing an error if property or element do not exist, it returns undefined.
 const user ={address: {city: "Nairobi"}}
 console.log(user.address ? .city)// Nairobi
 console.log(user.phone?.number)//undefined

 nullish coalencing:  Always return the value on the left side, unless it is null, where it returns the fallback value,

  const username = null
  console.log(username ?? "Guest") // Guest
*/
const user = { address: { city: "Nairobi" } };
console.log(user.address?.city);
console.log(user.phone?.number);
