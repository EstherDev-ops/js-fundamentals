/* 
EVENT LOOP: 

Callstack: Is where JS keeps track of what function is currently running and what is returned when it finishes, it uses a rule  called LIFO: Last in, First out.

function greet(name) {
  return `Hello ${name}`;
}

function main() {
  const message = greet("Esther");
  console.log(message);
}

main();

EXPLAINATION: 1. main() is called — pushed onto stack
   [main]

2. Inside main, greet("Esther") is called — pushed on top
   [greet, main]

3. greet returns "Hello Esther" — popped off
   [main]

4. console.log is called — pushed on top
   [console.log, main]

5. console.log finishes — popped off
   [main]

6. main finishes — popped off
   [] empty

 BLOCKING CODE: This is where a long-running operation monopolizes call stack and frezees it, thus other main thread cannot be executed until it completes being executeds
function slowOperation() {
   imagine this takes 5 seconds
  const start = Date.now();
  while (Date.now() - start < 5000) {}
  return "done";
}

console.log("start");
slowOperation(); // blocks everything for 5 seconds
console.log("end"); // waits 5 seconds before printing

EXPLAINATION:  Date.now()- returns the current time in milliseconds
We have while loop, where it will loop as long as the result of Date.now()
- start is less the than 5000,
console.log("start"); execute first
Then when slowOperation() is called it is pushed to the call stack, then JS stops, due to while(Date.now() - start < 5000), until five seconds finishes that's when console.log("end"); will be executed.

NOTE: Async/await do not make the code magically faster.
EXPLAINATION: JS is a single-thread, so blocking code monopolizes call satck and freezes execustion. Async pattern, makes the long-running operation to be excuted, without blocking the main thread, thus event loop will continue processing other tasks.

THE WEB APIs: These are browser's  features not JS.
console.log("1");

setTimeout(() => {
  console.log("2");
}, 1000);

console.log("3");//1,3,2

WHAT ACTUALLY HAPPENS HERE: 1. console.log("1") — runs on call stack — prints "1"

2. setTimeout is called — the callback and timer are handed 
   off to the browser's Web API
   JavaScript does NOT wait. It moves on immediately.

3. console.log("3") — runs on call stack — prints "3"

4. 1 second passes — browser timer finishes
   The callback is moved to the Callback Queue

5. Call stack is empty — Event Loop picks up the callback
   and pushes it onto the call stack

6. console.log("2") runs — prints "2"

THE CALLBACK QUEUE: MACROTASK
This is where web api, send the callback, it is like a waiting room;
queue: 
   The Callback Queue — Macrotask Queue
When a Web API finishes its work, it doesn't push the callback directly onto the call stack. It puts it in the Callback Queue — also called the macrotask queue.
Things that go into the macrotask queue:

setTimeout callbacks
setInterval callbacks
DOM event callbacks — clicks, keypresses

The callback sits in the queue and waits.

The Event Loop
The Event Loop has one job. One simple rule:
If the call stack is empty, take the first item from the queue and push it onto the call stack.
That is it. That is the entire Event Loop. It constantly checks — is the stack empty? Is there something in the queue? If yes to both — move it over.
Call Stack        Web APIs          Callback Queue
-----------       --------          --------------
[empty]           timer done   →    [callback]
                                         ↓
                              Event Loop moves it
                                         ↓
[callback]        
runs here

The Microtask Queue
This is where it gets important for interviews.
Promises do not go into the callback queue. They go into a separate queue called the microtask queue. And the microtask queue has higher priority than the callback queue.
The rule is:
After every task, the Event Loop drains the entire microtask queue before picking the next macrotask.
javascriptconsole.log("1");

setTimeout(() => console.log("2"), 0); // macrotask queue

Promise.resolve().then(() => console.log("3")); // microtask queue

console.log("4");
Trace through this:
1. console.log("1") — call stack — prints "1"

2. setTimeout — handed to Web API — callback goes to macrotask queue
   even though delay is 0

3. Promise.resolve().then — callback goes to microtask queue

4. console.log("4") — call stack — prints "4"

5. Call stack is empty
   Event Loop checks microtask queue FIRST
   Promise callback runs — prints "3"

6. Microtask queue empty
   Event Loop checks macrotask queue
   setTimeout callback runs — prints "2"
Output: 1, 4, 3, 2
The setTimeout had a delay of 0 — zero milliseconds. But the promise still ran first. Because microtasks always beat macrotasks.

The Complete Picture
        Your Code
            ↓
       Call Stack
            ↓
    Web APIs (browser)
     timers, fetch, events
            ↓
    ┌───────────────────┐
    │  Microtask Queue  │  ← Promises (higher priority)
    │  Macrotask Queue  │  ← setTimeout, events (lower priority)
    └───────────────────┘
            ↓
        Event Loop
    (moves to call stack
     when stack is empty)

Why This Matters In Real Code
javascriptconsole.log("Fetching data...");

fetch("https://api.vorta.ai/clients")
  .then((response) => response.json())
  .then((data) => console.log(data)); // microtask queue

console.log("This runs before the data arrives");
fetch is a Web API. JavaScript hands it off and keeps going. Your UI stays responsive. When the data comes back the promise callback goes into the microtask queue and runs when the stack is clear.
This is why your entire application doesn't freeze every time you make an API call.

Diference between Macrotask and Microtask:  They are both queues, where async callbacks wait before  execution. The difference is priority. microtask has the highest  priority than macrotask, thus it is executed first before macrotask.


CALLBACK: Is a argument passed to another function,  to be called.
You have been using them since day one:
javascriptconst numbers = [1, 2, 3];
numbers.forEach((n) => console.log(n));
That arrow function is a callback. You passed it to forEach and forEach calls it for each element.
That is a synchronous callback — it runs immediately, in order, on the call stack.
But callbacks were also the original way to handle asynchronous operations — and that is where the problems started.

Asynchronous Callbacks
Before promises existed, everything async used callbacks:
javascriptsetTimeout(() => {
  console.log("This runs later");
}, 1000);
That arrow function is an async callback. You hand it to the browser's Web API. It runs later when the timer finishes.
Same pattern was used for reading files, making HTTP requests, database queries — anything that took time.

A Real Async Callback Example
Imagine you are building VORTA AI's backend. You need to:

Get a client from the database
Get their bookings
Send them a confirmation email

With callbacks:
javascriptgetClient(clientId, function(client) {
  getBookings(client.id, function(bookings) {
    sendEmail(client.email, bookings, function(response) {
      console.log("Email sent", response);
    });
  });
});
Each operation needs the result of the previous one. So each one is nested inside the previous callback.
This works. But now add error handling:
javascriptgetClient(clientId, function(error, client) {
  if (error) {
    console.log("Error getting client", error);
    return;
  }
  getBookings(client.id, function(error, bookings) {
    if (error) {
      console.log("Error getting bookings", error);
      return;
    }
    sendEmail(client.email, bookings, function(error, response) {
      if (error) {
        console.log("Error sending email", error);
        return;
      }
      console.log("Email sent", response);
    });
  });
});
This is callback hell. Also called the pyramid of doom because of the shape it makes. Look at the indentation — it keeps going right. In a real application this goes 8, 10, 12 levels deep.

The Problems With Callbacks
1. Readability — code reads top to bottom but execution jumps around. Hard to follow.
2. Error handling — you have to handle errors manually at every single level. Miss one and the error swallows silently.
3. Inversion of control — you are handing your callback to someone else's function and trusting them to call it correctly. What if they call it twice? What if they never call it? You have no control.
javascript// You pass YOUR function to THEIR code
thirdPartyLibrary.doSomething(yourCallback);
// Did they call it? Did they call it twice? 
// Did they pass the right arguments? You don't know.
4. No way to return values — you cannot return from an async callback back to the caller. The value only exists inside the callback.
javascriptfunction getClientName(id) {
  let name;
  getClient(id, function(client) {
    name = client.name; // this runs async — too late
  });
  return name; // always undefined
}
This is a classic mistake developers make when they first encounter async code. By the time the callback runs, return name has already executed with undefined.

The Node.js Callback Convention
In Node.js a standard emerged — error first callbacks. Every callback takes two parameters — error first, data second:
javascriptfs.readFile("data.txt", function(error, data) {
  if (error) {
    console.log("Something went wrong", error);
    return;
  }
  console.log(data);
});
If there is no error, error is null. If there is an error, data is null. You check error first, always. This became the standard across all Node.js APIs.

Why Callbacks Led To Promises
The core problem with callbacks is that they make sequential async operations ugly and unmanageable. Developers needed a better way to say:
"Do this, then when it finishes do this, then when that finishes do this — and if anything goes wrong at any step, handle it in one place."
That is exactly what Promises provide. But you need to understand callbacks first because:

You will still see them in old codebases
Promises are built on top of the same concept
Interviewers test whether you understand why promises were invented — not just how to use them

PROMISES: Are object that represents eventual results of asynchronous operaions

promise has three states: pending- initial state, operation still running
                        : fulfilled- operation has succesfully completed, so value available.
                        : Rejected: operaation faile, error is available

When a promise move from pending to fulfilled or rejected it DOESN'T CHANGE ITS STATE,  this is called settled(is where a promise doesn't change its state when it has moved from either pending to fulfilled or pending to rejection)

const myPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Data fetched successfully");
    } else {
      reject("Something went wrong");
    }
  }, 1000);
});

myPromise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });

  function checkNumber(number){
  return new Promise((resolve, reject) => {
    if(number > 10){
      resolve("Big number")
    }
    else{
      reject("Small number")
    }
  })
}
checkNumber(15)
.then((result) => console.log("success:", result))
.catch((error) => console.log("Error:", error))

checkNumber(5)
  .then((result) => console.log("success:", result))
  .catch((error) => console.log("Error:", error));


  PROMISE CHAINING: this is when multiple asynchronous operations are performed sequentially, where the output of one operation, is the input of the next one, this is achieved by returning a promise from the .then() method.


  function userLogin(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "Esther") {
        resolve(username)
      } else {
        reject("User not found")
      }
    }, 1000)
  })
}

function fetchOrders(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username) {
        resolve(["order1", "order2", "order3"])
      } else {
        reject("Could not fetch orders")
      }
    }, 1000)
  })
}

function getOrderDetails(orders) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orders.length > 0) {
        resolve(`You have ${orders.length} orders`)
      } else {
        reject("No orders found")
      }
    }, 1000)
  })
}

userLogin("Esther")
  .then((username) => fetchOrders(username))
  .then((orders) => getOrderDetails(orders))
  .then((details) => console.log(details))
  .catch((error) => console.log(error));

  promise.all()- it is a method that takes an a array of promise runs them simulatenously and returns a new promise that resolves when all the promises in the array have resolved,  or rejeccts if any of the promise in the array rejects. 

  function getProfile() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Profile loaded"), 1000)
  })
}

function getOrders() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Orders loaded"), 2000)
  })
}

function getNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Notifications loaded"), 1500)
  })
}

Promise.all([getProfile(), getOrders(), getNotifications()])
  .then((results) => console.log(results))
  .catch((error) => console.log(error))
*/

