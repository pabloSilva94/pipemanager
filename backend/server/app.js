import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import groupRoutes from "./routes/group.routes.js";
import taskRoutes from "./routes/task.routes.js";
import customerRoutes from "./routes/customers.routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(
  express.json({ limit: "50mb", type: ["application/json", "text/plain"] })
);

app.use("/group/users", userRoutes);
app.use("/group/providers", providerRoutes);
app.use("/group", groupRoutes);
app.use("/group/task", taskRoutes);
app.use("/group/customers", customerRoutes);

export default app;