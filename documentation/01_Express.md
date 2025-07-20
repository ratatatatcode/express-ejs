# What are ExpressJS and EJS?
**ExpressJS** is a backend web application framework for Node.js. It helps you handle web server logic like routing, middleware, requests, and responses with less code.
```js
res.render("profile", { name: "James" });
```

**EJS (Embedded JavaScript)** is a templating engine for generating HTML on the server using JavaScript.
```ejs
<h1>Hello <%= name %></h1>
```

The user will see,
```
Hello James
```

## Will I be a full-stack developer after this?
Yes or maybe no—it depends on how you define a full-stack developer.

Whether you call yourself a full-stack developer is up to you.

> **Using Express.js with EJS allows you to build full-stack applications**, but specifically in the classic monolithic full-stack style where both backend and frontend are handled in one app.

> Before you start building your own todo web application or any other web app, **try running the code folder first**. Take some time to browse through it, understand how it works, and don't hesitate to ask LLMs for help if you need clarification.

## Setup
### Code Editor
1. Download Visual Studio Code or any code editor that supports web development.
2. Install extensions that may help you in the development process.
3. Learn some useful VS Code shortcuts to speed up your coding.

### GitHub (version control)
4. Create a GitHub repository and name it whatever you like.
5. Clone it using your code editor. I suggest syncing your GitHub account with your editor so you can easily clone, push, pull, and more.

### NodeJS
6. Set up your Node.js environment. Download Node.js and configure the environment variable if needed.

### Packages/Dependencies
7. Go ahead and open your terminal. This is where things get started.
8. Run this in your terminal:
```bash
npm init -y
```
9. Copy and run these in your terminal:
```bash
npm i dotenv ejs express express-session firebase module-alias
```
```
npm i --save-dev nodemon
```

### Folder and JavaScript Files
10. Create a folder and name it src. Inside it, add a file named server.js (or app/index.js — it’s up to you).
11. Update the package.json (outside the src folder) to set the entry point:
```
"main": "index.js" > "main": "src/server.js",
```
12. Add this under "type" in your package.json:
```
"type": "commonjs",
"_moduleAliases": {
```

### .env
13. Create a .env file (outside the src folder) and a .gitignore file. In .gitignore, add the following lines:
```
.env
node_modules/
```

> Friendly reminder: Never push your .env file under any circumstances.**

14. Insert the following inside your .env:
```
SESSION_SECRET=ANYSECRETKEY
PORT=3000
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

### server.js and Testing
15. Now, add the following code to your src/server.js to test if everything is working correctly.
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

> Don’t worry about the other parts of this JavaScript code — I’ll explain them later.

16. Open your browser and go to:
```
http://localhost:3000
```
You should see:
```
Hello World
```
<br>

> If it works, it feels truly fulfilling, especially if it's your first time.
> That “Hello, world!” is the first step — you, becoming a web developer.
<br>

## Now let me explain some of the lines from src/server.js.
Loads support for custom module paths (with @ aliases). This lets you use @/ instead of long relative paths like ../../services/....<br>
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