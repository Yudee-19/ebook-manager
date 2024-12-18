const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { conn } = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const ebookRoutes = require('./routes/eBook.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/ebooks', ebookRoutes);

// Start server

conn.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});