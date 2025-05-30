import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";

import connectDB from './ChatBackend/src/config/db.js';
import router from "./ChatBackend/src/routes/user.routes.js";
import messagerouter from "./ChatBackend/src/routes/Message.routes.js";
import { app, server } from "./ChatBackend/ScokietIo/server.js";



// Connect to MongoDB
connectDB();



// Create an HTTP server
// Create the server

// Middleware
app.use(express.json());

// Middleware
const allowedOrigins = [
  "https://sockitio-app.vercel.app",
  "https://sockitio-iq67k6kaa-anusrazas-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(cookieParser())

// Socket.IO setup


// Routes
app.get('/', (req, res) => {
  res.send('Chat backend is running!');
});




app.use("/user",router)
app.use("/message",messagerouter)

// Start the server
const PORT = process.env.PORT || 5000;
server.PORT, () => {
   console.log(`⚙️  Server is running at port : ${PORT}`);
};
