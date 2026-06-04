function getUser(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Essie")
    }, 1000)
  })
}

function getPosts(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve( ["post1", "post2"])
    }, 1500)
  })
}

function getFollowers(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(150)
    }, 2000)
  })
}

Promise.all([getUser(),  getPosts(), getFollowers()])
.then(([user, posts, followers]) => {
  console.log("User: ", user);
  console.log("Posts: ", posts.join(","));
  console.log("Followers: ", followers);
})
.catch((err) => console.log(err))

function fetchSettings() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Failed to load settings");
    }, 1000);
  });
}

function fetchProfile(){
  return new Promise((resolve) => {
     setTimeout(() => {
      resolve("Profile loaded successfully")
     }, 2000)
  })
}

function fetchPayments(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      resolve("Payment loaded succesfully")
    }, 1500)
  })
}
Promise.all([fetchSettings(), fetchProfile(), fetchPayments()])
.then((details) => console.log(details))
.catch((error) => console.log(error));


function fetchUser(){
  return new Promise((resolve) => {
    resolve("Essie")
  })
}

function fetchNotifications(){
  return new Promise((resolve) => {
    resolve(["message1", "message2"])
  })
}

function fetchTasks(){
  return new Promise((resolve) => {
    resolve(["task1", "task2", "task3"])
  })
}
Promise.all([fetchUser(), fetchNotifications(), fetchTasks()])
.then(([user, notifications, tasks]) =>{
  console.log("Welcome", user);
  console.log("you have ", notifications.length, "notifications");
  console.log("you have ", tasks.length, "tasks");
})
.catch((err) => console.log(err))