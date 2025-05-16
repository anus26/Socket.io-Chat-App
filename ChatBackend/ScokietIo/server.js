import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);  // ✅ only declare this once

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

export const getReciverSocketId=( receivedId)=>{
  return users[receivedId]
}
const users={}
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  
const userId=socket.handshake.query.userId
if (userId) {
  users[userId]=socket.id
  console.log("✅ User connected with userId:", users);
  
}
//used to send connection to user
io.emit("getOnlineUsers",Object.keys(users))
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    //delete online user
    delete users[userId]
    io.emit("getOnlineUsers",Object.keys(users))
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

export {app ,io,server}
