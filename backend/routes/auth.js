// routes/auth.js
const express = require('express');
const { signup, signin } = require('../controllers/authController');
const router = express.Router();

// Sign Up Route
router.post('/signup', signup);

// Sign In Route
router.post('/signin', signin);

module.exports = router;
