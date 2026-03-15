const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use(errorHandler);
module.exports = app;
