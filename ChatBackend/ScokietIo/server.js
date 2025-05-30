import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);  // ✅ only declare this once



const io = new Server(server, {
  cors: {
    origin: "https://sockitio-app.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }
});


const users={}
export const getReciverSocketId=( receivedId)=>{
  return users[ receivedId]
}
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id); // ✅ correct socket id

  const userId = socket.handshake.auth.userId;
  if (userId) {
    users[userId] = socket.id; // ✅ Save correct socket.id
    console.log("✅ Users map:", users);
  }
  
  console.log("👉 socket.handshake.query.userId", socket.handshake.auth.userId,userId);
  // Send all online users to the client
  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // Remove user from the users map
    if (userId) {
      delete users[userId];
    }

    io.emit("getOnlineUsers", Object.keys(users));
  });
});



export {app ,io,server}

