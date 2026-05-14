const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. UPDATED CORS: Deployment ke baad Vercel ka link yahan daal dena

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Local dev ke liye explicit address
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // "PATCH" aur "OPTIONS" yahan hone chahiye
  credentials: true,
  allowedHeaders: ["Content-Type", "x-auth-token"] // Headers bhi define kar do safety ke liye
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/roadmaps', require('./routes/roadmapRoutes')); 

// 2. HEALTH CHECK: Render iska use karke check karta hai ki server up hai ya nahi
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'Operational', 
    system: 'CreatorFlow API',
    v: '3.1' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`System Initialized on port ${PORT}`);
});