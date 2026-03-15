const asyncHandler = require("../middleware/asyncHandler");

let tasks = [];

exports.getTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedTasks = tasks.slice(startIndex, endIndex);

  res.status(200).json({
    page,
    limit,
    total: tasks.length,
    data: paginatedTasks,
  });
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

exports.createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted",
  });
});