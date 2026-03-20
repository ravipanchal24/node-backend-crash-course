const asyncHandler = require("../middleware/asyncHandler");
const Task = require("../models/Task");
const mongoose = require("mongoose");

exports.getTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const tasks = await Task.find().skip(skip).limit(limit);
  const total = await Task.countDocuments();

  res.status(200).json({
    page,
    limit,
    total,
    data: tasks,
  });
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

exports.createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const newTask = await Task.create({
    title,
  });

  res.status(201).json(newTask);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(updatedTask);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted" });
});
