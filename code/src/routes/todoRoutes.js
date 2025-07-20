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
