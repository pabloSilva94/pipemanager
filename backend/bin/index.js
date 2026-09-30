import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "../server/app.js";

dotenv.config();

const PORT = process.env.PORT_DEV || 3333;
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("Novo cliente conectado", socket.id);

  socket.on("tasks", (groupData) => {
    io.emit("tasks", groupData);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Api na porta ${PORT} 🖥️`);
});