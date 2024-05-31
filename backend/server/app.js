const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(
  express.json({ limit: "50mb", type: ["application/json", "text/plain"] })
);

const userRoutes = require("./routes/user.routes");
const providerRoutes = require("./routes/provider.routes");
const groupRoutes = require("./routes/group.routes");
const taskRoutes = require("./routes/task.routes");
const customerRoutes = require("./routes/customers.routes");
app.use("/group/users", userRoutes);
app.use("/group/providers", providerRoutes);
app.use("/group", groupRoutes);
app.use("/group/task", taskRoutes);
app.use("/group/customers", customerRoutes);

module.exports = app;
