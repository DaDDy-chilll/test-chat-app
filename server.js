const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.join("room1");
  socket.on("message", (msg) => {
    console.log("message", msg);
    // socket.broadcast.emit("message", msg); //? this is send to everyone but not include sender
    io.to("room1").emit("message", msg); //? this is send to everyone include sender
    // socket.emit("message", msg); //? this is send only sender
  });

  socket.on("disconnect", () => {
    console.log("a user disconnect", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running...");
});
