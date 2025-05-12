import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import http from 'http'; // Add this import statement
import cors from 'cors';
import cookieParser from "cookie-parser";

import connectDB from './ChatBackend/src/config/db.js';
import router from "./ChatBackend/src/routes/user.routes.js";
import messagerouter from "./ChatBackend/src/routes/Message.routes.js";


// Connect to MongoDB
connectDB();

const app = express();

// Create an HTTP server
const server = http.createServer(app);  // Create the server

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // or wherever your frontend runs
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());

// Socket.IO setup


// Routes
app.get('/', (req, res) => {
  res.send('Chat backend is running!');
});

// Socket.IO logic



app.use("/user",router)
app.use("/message",messagerouter)

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
