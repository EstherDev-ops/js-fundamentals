/* ASYNC & AWAIT IN JS.

Async: is a function that return promise automatically, written before a function
 Await: is a keyword that is used to pause the execution of async function until the promise resolves or rejects, and it must be used inside an async function

 async function run() {
  try {
    const user = await userLogin("Essie");

    const orders =
      await fetchOrders(user);

    const details =
      await getOrderDetails(orders);

    console.log(details);

  } catch (err) {
    console.log(err);
  }
}

run();

function checkNumber(number) {
  return new Promise((resolve, reject) => {
    if (number > 10) {
      resolve("Big number");
    } else {
      reject("Small number");
    }
  });
}

 async  function  execute(){
  try{
    const result =  await checkNumber(15);
    console.log("Success:", result)
  }catch(error) {
    console.log("Error:", error)
  }
 }
 execute();


 Question to be share on claude:  function userLogin(username) {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
       if (username === "Esther") {
         resolve(username);
       } else {
         reject("User not found");
       }
     }, 1000);
   });
 }

function fetchOrders(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username) {
        resolve(["order1", "order2", "order3"]);
      } else {
        reject("Could not fetch orders");
      }
    }, 1000);
  });
}

function getOrderDetails(orders) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orders.length > 0) {
        resolve(`You have ${orders.length} orders`);
      } else {
        reject("No orders found");
      }
    }, 1000);
  });
}

async function run(){
  try{
    const user = await userLogin("Essie");
    const order = await fetchOrders(user);
    const details = await getOrderDetails(order);

    console.log(details)
  } catch (error) {
    console.log(error);
  }
}

run();



Difference between  try/catch and .catch():
try/catch:  it handles synchronous errors, syntax error within its block, and can also handle asynchronous errors if used with async/await

.catch() - it is used to promies rejection

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("User Data");
    }, 2000);
  });
}

function fetchOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Orders Data");
    }, 1000);
  });
}

function fetchNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Notifications Data");
    }, 3000);
  });
}

Promise.all([fetchUser(), fetchOrders(), fetchNotifications()])
  .then(([user, order, notifications] ) => {
    console.log(`${user}`);
    console.log(`${order}`);
    console.log(`${notifications}`)
  })
.catch((err) => console.log(err));

async function fetchData(){
  try{
    const[user, order, notification] = await Promise.all([fetchUser(), fetchOrders(), fetchNotifications()])
    console.log(`${user}`);
    console.log(`${order}`);
    console.log(`${notification}`);
  } catch (error) {
    console.log(error);
  }
}
fetchData();

NOTE: Promise.all(): is useful when multiple asynchronous operations are independent and can run concurrently. Instead of waiting for one request to finish before starting the next, all promises execute simultaneously, reducing total execution time and improving perfomance

What happens if one promises fails in Promise.all()

If one promise inside 'Promise.all()'  rejects, the entire 'Promise.all()all() immediately rejects and throws an error, this is called "fail-fast behaviour" and the error can be handled using .catch ortry/catch with async/await.

On fail-fast — when one Promise rejects, the other Promises don't stop running. They're already in flight. Promise.all() just stops waiting for them and throws the error immediately. The operations continue in the background, you just never get their results.
When NOT to use Promise.all() — if your operations depend on each other, Promise.all() is wrong. Use sequential Async/Await instead. Promise.all() is only for operations that are truly independent.
*/
