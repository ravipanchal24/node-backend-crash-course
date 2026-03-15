const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
});

const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  completed: z.boolean().optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
