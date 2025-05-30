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


app.use(
  cors({
    origin:  "https://sockitio-app.vercel.app",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],

  credentials: true
   
  })
);
app.use(cookieParser())



// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "https://sockitio-app.vercel.app");
//   res.header("Access-Control-Allow-Methods", "GET,POST")
//   res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.status(200).send();
// });

// Socket.IO setup


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


