const todoService = require("@/services/todoService");

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await todoService.getAllTodosByUser(req.session.userId);
    return res.render("todo/todos", { data: todos });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todo = await todoService.createTodo({
      title,
      description,
      status,
      userId: req.session.userId,
    });
    return res.status(201).json({ success: true, data: todo });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const updated = await todoService.updateTodo(req.params.id, req.body);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });

    return res
      .status(200)
      .json({ success: true, message: "Todo updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    await todoService.deleteTodoById(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteAllTodo = async (req, res) => {
  try {
    await todoService.deleteAllTodos();
    return res
      .status(200)
      .json({ success: true, message: "All todos deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
