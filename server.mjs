import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { classifyMessage } from "./classifier/model.mjs";
import { trainModel } from "./classifier/classify.mjs";
import { getSentiment } from "./sentiment-analyser/analyser.mjs";
import { postRequest } from "./api.mjs";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const users = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("register", (username) => {
    users[socket.id] = username;
    socket.join(username);
    console.log(`${username} joined room: ${username}`);
  });

  socket.on("send-customer-message", async (msg) => {
    const messageData = {
      body: msg.body,
      from: msg.from,
      to: "admin",
      created_at: msg.created_at,
      category: null,
      sentiment: null,
      isClosed: false,
      table: msg.tableNum,
      sender: msg.sender,
    };

    try {
      messageData.category = await classifyMessage(msg.body);
      messageData.sentiment = await getSentiment(msg.body);
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }

    socket.emit("receive-message", messageData);
    io.to("admin").emit("receive-message", messageData);

    delete messageData.sender;
    await postRequest("messages", messageData);
  });

  socket.on("send-admin-message", async (msg) => {
    const messageData = {
      body: msg.body,
      from: "admin",
      to: msg.replyingTo,
      created_at: msg.created_at,
      category: null,
      sentiment: null,
      is_closed: false,
      table: msg.tableNum,
      sender: false,
    };

    io.emit("receive-message", messageData);

    delete messageData.sender;

    await postRequest("messages", messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 6969;

server.listen(PORT, "0.0.0.0", async () => {
  console.log(`Listening on port: ${PORT}`);

  await trainModel();
});

console.log(classifyMessage("the service was bad"));
