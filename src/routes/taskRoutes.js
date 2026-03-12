const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  getTaskById
} = require("../controllers/taskController");

router.get("/", getTasks);
router.get("/:id", getTaskById)
router.post("/", createTask);

module.exports = router;