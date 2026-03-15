const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(errorHandler);
app.use(logger);
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
