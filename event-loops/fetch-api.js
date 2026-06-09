/*  
PHASE 1: FETCH APIs BASICS
What is an API?
What is Fetch API?
What are HTTP requests?
Client ↔ Server mental model

APIs:  Are set or rules & protocaols that allows multiple software applications to communicate and exchange data

fetchAPI(): Is a built-in JavaScript function thats makes HTTP request to API
HTTP(Hypertext Transfer Protoocol): Is a communication language between the client and the server.

What do you think it is happening here
fetch("http://api.com/user"): Here fetch() send a request to a server/API to get or send data and return a promise because the server take time to respond.

Why doesn’t fetch() just give us the data immediately?
fetch() returns a Response object, not the actual data directly. The response body is a stream of raw data, so we use response.json() to read and parse JSON into a JavaScript object or array we can use.

response.json() returns a Promise because reading and parsing the response body is asynchronous. The response data may still be loading, so JavaScript waits until the JSON is fully read and converted into a usable JavaScript object or array.`


Promise.resolve("Hello")
  .then((data) => {
    console.log(data);
    return "World";
  })
  .then((data) => {
    console.log(data);
    throw new Error("Boom");
  })
  .catch((error) => {
    console.log(error.message);
  });

EXPLAINATION: Step 1

This Promise:

Promise.resolve("Hello")

is already:

resolved

So first .then() enters:

microtask queue
Step 2 — First .then() executes

This runs:

(data) => {
  console.log(data);
  return "World";
}

Question:

What is:

data

here?

Answer:

"Hello"

Because:

Promise.resolve("Hello")

passed "Hello" into the first .then().

So:

console.log(data);

prints:

Hello

Then:

return "World";

Important:

This value becomes the resolved value for:

next .then()
Step 3 — Second .then()

Now:

(data) => {
  console.log(data);
  throw new Error("Boom");
}

Question:

What is:

data

now?

Answer:

"World"

Because previous .then() returned it.

So:

console.log(data);

prints:

World

Then:

throw new Error("Boom");

This:

rejects the Promise chain
Step 4

JS skips any remaining .then()

and jumps to:

.catch((error) => {
  console.log(error.message);
});

Output:

Boom
Your mistake

You said:

“console.log(data) in second .then() doesn’t execute”

That part is wrong.

Why?

Because:

throw new Error("Boom")

happens after:

console.log(data)

Execution is:

console.log(data)
↓
throw error
↓
jump to catch

Not:

throw first
↓
skip everything
Final execution flow
Promise resolved ("Hello")
        ↓
First .then()
        ↓
prints Hello
        ↓
returns "World"
        ↓
Second .then()
        ↓
prints World
        ↓
throws Error("Boom")
        ↓
.catch()
        ↓
prints Boom

ASYNC/AWAIT: is a different way of handling promises
await: pauses the async function execution until promise completes resolving

Basic syntax:

async function getUsers(){
   const response = await fetch('https://jsonplaceholder.typicode.com/users');

   const data = await response.json();
   console.log(data)
}
getUesrs();


fetch("url")
.then((response) => response.json())
.then((data) => console.log(data))

ERROR HANDLING IN ASYNC/AWAIT WE USE try/catch

async function profileUsers(){
   try{
     const response = await fetch('https://jsonplaceholder.typicode.com/users');
     const data = await response.json();
     console.log(data)
   }catch(error) {
     console.log(error)
   }
}
   profileUsers();

READING REAL API DATA

Imagine backend returns this: 

const users = [
  {
    id: 1,
    name: "Essie",
    email: "essie@gmail.com",
    company: {
      name: "VORTA AI"
    }
  },
  {
    id: 2,
    name: "John",
    email: "john@gmail.com",
    company: {
      name: "TechCorp"
    }
  }
];

How would you access VORTA AI

whcih user, first one, index of [0]
users[0] this gives: {
  id: 1,
  name: "Essie",
  email: "essie@gmail.com",
  company: {
    name: "VORTA AI"
  }
}
where is VORTS AI, inside the conpany object thus, users[0].company, which it gives: 
 company: {
    name: "VORTA AI"
  }

then lastly the property of the object: users[0].company.name

Question 2: Print all names using .map()
users.map((user) => user.name) will output: ["Essie, John"]



What do you think happens when you fetch a URL that doesn't exist or returns a 404 error? Does the  catch  block run? 

No it doesn't, because fetch consider error 404 as a successful response from the server and promise resolves, thus catch block doesn't run.  To correct this,  we check response.ok

async function userProfile(){
   try{const response = await fetch('https://jsonplaceholder.typicode.com/users/999)

   if(!response.ok){
   throw new Error(`HTTP error: ${response.status})
   }
   const data = await response.json()
   console.log(date)
}catch(error) {
  console.log(error)
}
}
userProfile();

QUESTIONS:
1. Fetch users from an API and print only active users

async function userProfile(){
   try{
     const response = await fectch("api/users")
     const data = await response.json();

     const activeUsers = data.filter(user => user.filter
     );

     for(let user of activeUser){
        console.log(user.name);
     }
   }catch(error){console.log(error)}
}
userProfile();

2. A user fills a registration form.Send data to backend(use post)
Expected thinking: new user -> post

async function registerUser(){
 try{
 const response = await fetch("api/users",
 {
 method: POST,
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify({
    name: "Esther",
    email: "esther254@gmail.com"
 })
 }
);
  const data = await response.json();
  console.log(data);
 
 }catch(err){console.log(err)}

}


3.  Update only the user's email

async function updateEmail(){
  try{
  const response = await fetch("api/users/1",
  {
  method: PATCH,
  headers: {
  "Content-Type" : "application/json"
  },
  body: JSON.stringify({
     name: "Esther",
     email: nelly234@gmail.com
  })
  }
  );

  const data = await response.json();
   console.log(data)
  } catch(err){console.log(err)}
}

4. Build a function that fetches products and prints only producrs that are in stock.


async function getProducts() {
  try {
    const response = await fetch(
      "api/products"
    );

    const data =
      await response.json();

    const available =
      data.filter(
        product =>
          product.inStock
      );

    for (let product of available) {
      console.log(product.name);
    }

  } catch (error) {
    console.log(error);
  }
}
}

async function cancelAppointments() {
  try {
    const response = await fetch(
      "api/appointments/15",
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

async function updateTime(){
  try{
    const response = await  fetch("api/appointments/7",
    {
    method: "PATCH",

    headers:{
    "Content-Type": "application/json"
    }
    }

  body: JSON.stringify({
   time: "2:00 PM"
  })
    const data = await response.json();
    console.log(data)
    )
  }catch(err){console.log(err)}
}
updateTime();

async function getOrder(){
  try{
    const response = await fetch("api/orders",
    {
    method: "POST",
    headers:{
    "Content-Type": "application/json"
    }
    },
    body: JSON.stringify({
    customer: "Essie",
    items: ["Rice", "Flour"],
    total: 4500
    })
    );
     const data = await response.json();
    console.log(data);
  }catch(error){
   console.log(error) 
  }
}
getOrder();async function getOrder(){
  try{
    const response = await fetch("api/orders",
    {
    method: POST,
    header:{
    "Content-Type": "application/json"
    }
    },
    body: JSON.stringify({
    customer: "Essie",
    items: ["Rice", "Flour"],
    total: 4500
    })
    );
     const data = await response.json();
    console.log(data);
  }catch(error){
   console.log(error) 
  }
}
getOrder();



async function dsiplayProducts(){
  try{
   const response = await  fetch("api/products");

   const data = await response.json();

   const inStockProducts = data.filter(product => product.inStock === true
   );

   for(let product of inStockProducts){
   console.log(product.name);
   }
  }catch(error){
  console.log(error)
  }
}


async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "My first post",
        body: "This is the content",
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

createPost();
*/

const user = { name: "Esther", role: "developer" };

const jsonString = JSON.stringify(user);
console.log(jsonString);
console.log(typeof jsonString);

const backToObject = JSON.parse(jsonString);
console.log(backToObject);
console.log(typeof backToObject);



