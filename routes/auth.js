// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/register - Register new user
router.post('/register', registerUser);

// POST /api/auth/login - Authenticate user & get token
router.post('/login', loginUser);

// GET /api/auth/me - Get logged in user profile (Protected)
router.get('/me', protect, getMe);

module.exports = router;