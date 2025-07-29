# Server.js
```js
require("module-alias/register");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
```

## Now let me explain some of the lines from src/server.js.
Loads support for custom module paths (with @ aliases). This lets you use @/ instead of long relative paths like ../../services/...<br>
```js
require("module-alias/register");
```
```js
const todoService = require("@/services/todoService");
```
<br>

Loads environment variables from a .env file into process.env. Useful for storing things like secret keys or port numbers outside the code.<br>
```js
require("dotenv").config();
```
<br>

Imports Express (web framework), session middleware, and Node’s built-in path module. These help set up the server, manage sessions, and handle file paths.<br>
```js
const express = require("express");
const session = require("express-session");
const path = require("path");
```
<br>

Creates an instance of an Express app. This app will handle requests and responses.<br>
```js
const app = express();
```
<br>

Tells Express to trust the first proxy (useful if your app is behind something like Nginx or Heroku).<br>
```js
app.set("trust proxy", 1);
```
<br>

Sets up session handling using a secret key.<br>
resave: false: avoids saving sessions that weren’t changed.<br>
saveUninitialized: true: saves new sessions even if they haven't changed.<br>
secure: false: allows cookies to be sent over HTTP (not HTTPS) – useful for development.<br>
```js
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
```
If login is successful, the user ID is saved to the session (req.session.userId). This allows you to access it in future requests, e.g., to verify if the user is authenticated.
```js
// controllers/authController.js
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await authService.signinUser(email, password);
    
    // Save user ID in session
    req.session.userId = userCredential.user.uid;
    ...
  }
}
```
```js
// middleware/auth.js
function redirectIfAuthenticated(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/todos");
  }
  next();
}
```
<br>

Parses incoming JSON and form data (from POST requests). So the app can read submitted data from users.<br>
```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
<br>

Serves files (like images, CSS, JS) from the public folder at /static URL. Example: public/logo.png → accessible at /static/logo.png.<br>
```js
app.use("/static", express.static(path.join(__dirname, "public")));
```
<br>

Sets up the folder for your HTML-like templates. Uses EJS as the view engine to render dynamic HTML. So you can write pages with variables, loops, etc.<br>
```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```
```js
<ul>
  <% data.forEach(todo => { %>
    <li>
      <%= todo.title %> - <%= todo.description %>
    </li>
  <% }) %>
</ul>
```
<br>

Responds with "Hello World" when someone visits the homepage (/).<br>
```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```
<br>

Starts the server on the given port (from .env or default 3000). Logs a message once the server is running so you know it's ready.<br>
```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
```
