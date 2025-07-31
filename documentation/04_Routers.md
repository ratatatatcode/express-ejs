# Routers
In this project, we separated the routes in order to manage it easier. The todoRoutes manages the  routes of the todo functionalities, while the authRoutes manage the signup,login, and recovery routes.

# Let's start with authRoutes.js

```js
const express = require("express");
const router = express.Router();
const authController = require("@/controllers/authController");
const { redirectIfAuthenticated } = require("@/middleware/auth");

router.get("/", redirectIfAuthenticated, (req, res) =>
  res.render("auth/signin"),
);
router.get("/signup", redirectIfAuthenticated, (req, res) =>
  res.render("auth/signup"),
);
router.get("/forgot-password", redirectIfAuthenticated, (req, res) =>
  res.render("auth/forgotPassword"),
);
router.post("/api/auth/signin", authController.signin);
router.post("/api/auth/signup", authController.signup);
router.post("/api/auth/recovery", authController.resetPasswordForEmail);
router.post("/api/auth/logout", authController.logout);

module.exports = router;

```
## Now let me explain some of the lines of @/routes/authRoutes.js

First, we import or require the express module to use its features like handling routes. So, in order to create different routes, we first need to initialize the router. Basically, it works like the initialization of an Express app but for the initialization of the routing system. We also imported the authController in order to use the logic or the functions for handling auth-related actions. The function ```{ redirectIfauthenticated }``` is also imported to authenticate the logged-in user to access the /todos page.


(Tip: You can use @ for setting up aliases for different paths in the package.json file)

### Now let's proceed to the routes

1. The ``` router.get("/") ``` renders the signin page if the user is not authenticated in the session.

2. The ```router.get("/signup")``` renders the signup page for new users.

3. The ```router.get("/forgot-password")``` leads to the forgot password page.


### Now to access the API, you can use various API testing tools like Postman and Insomnia.

1.Handles login form submissions via authController.signin.

```POST /api/auth/signin```

2.Handles user registration via authController.signup.

```POST /api/auth/signup```

3.Triggers password recovery logic via authController.resetPasswordForEmail.

```POST /api/auth/recovery```

4.Logs the user out via authController.logout.

```POST /api/auth/logout```

### Lastly, export the router 
```module.exports = router;```


# Let's go on to todoRoutes.js now.

```js
const express = require("express");
const router = express.Router();
const todoController = require("@/controllers/todoController");
const { isAuthenticated } = require("@/middleware/auth");

router.get("/todos", isAuthenticated, todoController.getAllTodo);
router.post("/api/todos/add", isAuthenticated, todoController.addTodo);
router.put("/api/todos/update/:id", isAuthenticated, todoController.updateTodo);
router.delete(
  "/api/todos/delete/:id",
  isAuthenticated,
  todoController.deleteTodoById,
);
router.delete(
  "/api/todos/delete",
  isAuthenticated,
  todoController.deleteAllTodo,
);

module.exports = router;
```
The ```isAuthenticated``` is a middleware applied in all of the request to redirect the user to the signin page if they are not logged-in.

In the GET request, the ```todoController.getAllTodo``` is used to get and render all the todo data for the user.

In the POST request, the ```todoController.addTodo``` is used to create an object literal shorthand to add a new todo data for the user.

In the PUT request, the ```todoController.updateTodo``` is used to request the changes of the user in the body and update it.

In this DELETE request, the ```todoController.deleteTodoById``` deletes a single todo of the user by using the ID.
```
router.delete(
  "/api/todos/delete/:id",
  isAuthenticated,
  todoController.deleteTodoById,
);
```
In this Delete request, the ```todoController.deleteAllTodo``` deletes all the the todos of the user.
```
router.delete(
  "/api/todos/delete",
  isAuthenticated,
  todoController.deleteAllTodo,
);
```
