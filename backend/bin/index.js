require("dotenv").config();
const http = require("http");
const app = require("../server/app");
const { Server } = require("socket.io");

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
