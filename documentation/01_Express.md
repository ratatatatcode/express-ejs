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

**Using Express.js with EJS allows you to build full-stack applications**, but specifically in the classic monolithic full-stack style where both backend and frontend are handled in one app.

Before you start building your own todo web application or any other web app, **try running the code folder first**. Take some time to browse through it, understand how it works, and don't hesitate to ask LLMs for help if you need clarification.

## Setup
1. Download Visual Studio Code or any code editor that supports web development.
2. Install extensions that may help you in the development process.
3. Learn some useful VS Code shortcuts to speed up your coding.
4. Create a GitHub repository and name it whatever you like.
5. Clone it using your code editor. I suggest syncing your GitHub account with your editor so you can easily clone, push, pull, and more.
6. Set up your Node.js environment. Download Node.js and configure the environment variable if needed.

> Friendly reminder: Never push your .env file under any circumstances.**

7. Go ahead and open your terminal. This is where things get started.
8. Run this in your terminal,
```bash
npm init -y
```
