import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);  // ✅ only declare this once


const allowedOrigins = [
  "https://sockitio-app.vercel.app",
  "https://sockitio-iq67k6kaa-anusrazas-projects.vercel.app"
];
const io = new Server(server, {
  cors: {
    cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS (Socket.IO)"));
      }
    },
    credentials: true
  },
}});

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

server.listen(process.env.PORT, () => {
   console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
});

export {app ,io,server}

