# EJS (pages) in ExpressJS and EJS
EJS, which stands for Embedded JavaScript, is a popular templating engine used with Express.js to generate dynamic HTML content. It allows developers to embed JavaScript code directly within HTML markup, enabling the integration of data and logic into the presentation layer of a web application. 
```js
// src/controllers/todoController.js
exports.getAllTodo = async (req, res) => {
  try {
    const todos = await todoService.getAllTodosByUser(req.session.userId);
    return res.render("todo/todos", { data: todos });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
```
```html
<!-- views/todo/todos.ejs -->
<tbody id="todoTableBody">
  <% data.forEach(todo => { %>
    <tr data-id="<%= todo.id %>">
      <td onclick="makeEditable(this, 'title')"><span><%= todo.title %></span></td>
      <td onclick="makeEditable(this, 'description')"><span><%= todo.description %></span></td>
      <td>
        <select onchange="markAsDirty(this)">
          <option value="Pending" <%= todo.status === "Pending" ? "selected" : "" %>>Pending</option>
          <option value="In Progress" <%= todo.status === "In Progress" ? "selected" : "" %>>In Progress</option>
          <option value="Done" <%= todo.status === "Done" ? "selected" : "" %>>Done</option>
        </select>
      </td>
      <td>
        <button onclick="updateRow(this)">Update</button>
        <button onclick="deleteTodo('<%= todo.id %>')">Delete</button>
      </td>
    </tr>
  <% }) %>
</tbody>
```

## Partials/Layout Templates in ExpressJS (EJS)
EJS partials and layouts are similar to React components and layouts because they can be reused and combined, but they run only on the server and focus on HTML. They do not update automatically like React, and are best for creating simple, fast, data-filled pages with little setup.

When I say EJS does not update automatically, I mean that once the server sends the rendered HTML to the browser, that page will stay exactly the same until you refresh or load a new page from the server.
```html
<!-- views/partials/head.ejs -->
<title>Todo App</title>
<link rel="stylesheet" href="static/globals.css">
<link rel="shortcut icon" href="static/logo/favicon.ico" type="image/x-icon">
```
```html
<%- include("../partials/head") %>
```
