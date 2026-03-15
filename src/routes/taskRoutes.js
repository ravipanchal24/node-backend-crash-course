const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { validate } = require("../middleware/validate");
const { createTaskSchema, updateTaskSchema } = require("../validations/taskValidation");

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
