import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import http from 'http'; // Add this import statement
import cors from 'cors';
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';  // Correct import statement
import connectDB from './ChatBackend/src/config/db.js';
import router from "./ChatBackend/src/routes/user.routes.js";



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
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Routes
app.get('/', (req, res) => {
  res.send('Chat backend is running!');
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('📡 A user connected:', socket.id);

  socket.on('send-message', (data) => {
    console.log('📨 Message received:', data);
    io.emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('🔌 A user disconnected:', socket.id);
  });
});


app.use("/user",router)

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
