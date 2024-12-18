// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // console.log('Headers:', req.headers);
    console.log('in authmiddleware: Body:', req.body);
    console.log('in authmiddleware: Files:', req.files);
    // console.log(req.header("token"))
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // console.log(req);
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// Create a memory storage to temporarily hold the file data
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: 'title' },
    { name: 'author' },
    { name: 'description' },
    { name: 'genre' },
    { name: 'ebook', maxCount: 1 }, // File field
]);

const parseFields = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error parsing form fields:', err);
            return res.status(400).send(`Error parsing form fields: ${err.message}`);
        }
        next();
    });
};


module.exports = { authMiddleware, parseFields };
