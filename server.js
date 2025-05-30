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


// origin:"   http://localhost:5173",
app.use(
  cors({
    origin:  "https://sockitio-app.vercel.app",
  // methods: ["GET", "POST"],
  // allowedHeaders: ["Content-Type", "Authorization"],

  credentials: true
   
  })
);
app.use(cookieParser())






// Routes
app.get('/', (req, res) => {
  res.send('Chat backend is running!');
});




app.use("/user",router)
app.use("/message",messagerouter)

// Start the server

server.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});


