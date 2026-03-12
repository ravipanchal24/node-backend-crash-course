let tasks = [];

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

exports.createTask = (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};
