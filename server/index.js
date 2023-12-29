const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  // socket.on("send_message", (socket) => {
  //   socket.broadcast.emit("recieve_message", socket);
  // });

  // io.to("7i_UQCrbFMT2ihplAAAD").emit("receive_message");

  socket.on("send_message", (data) => {
    // socket.emit("receive_message", data);
    io.to(data.to).emit("receive_message", data);
    console.log(data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
