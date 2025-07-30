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
## Now let me explain some of the lines of src/routes/authRoutes.js

First, we import or require the express module in order to use its features like handling routes. So, in order to have create different routes we first need to initialize the router. Basically, it works like the initialization of express app but for the initialization of the routing system. We also imported the authController in order to use the logic or the functions for handling auth related actions. The function ```{ redirectIfauthenticated }``` is also imported to authenticate the logged in user to access the /todos page.

(Tip: You can use @ for setting up aliases for different paths in the package.json file). 

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

## Lastly, export the router 
```module.exports = router;```
