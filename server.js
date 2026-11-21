// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

// Initialize Express App & Connect Database
const app = express();
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

// Serve Static Frontend Files from the parent "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

// Fallback Route to serve index.html for non-API requests (SPA support)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Apex University CMS Server running on http://localhost:${PORT}`);
});