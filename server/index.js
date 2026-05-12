const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Import Routes
const authRoutes = require('./routes/authRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');

// 2. Use Routes 
// We are leaving roadmaps OPEN (no 'auth' middleware) for now 
// so you can keep building the frontend features.
app.use('/api/auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes); 

const PORT = process.env.PORT || 5000;

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 Connected to MongoDB'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('CreatorFlow API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is purring on port ${PORT}`);
});