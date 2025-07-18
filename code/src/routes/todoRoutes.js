const express = require("express");
const router = express.Router();

const todoController = require("@/controllers/todoController");

router.get("/todos", todoController.getAllTodo);
router.get("/todos/:id", todoController.getTodoById);
router.post("/api/todos/add", todoController.addTodo);
router.put("/api/todos/update/:id", todoController.updateTodo);
router.delete("/api/todos/delete/:id", todoController.deleteTodoById);
router.delete("/api/todos/delete", todoController.deleteAllTodo);

module.exports = router;