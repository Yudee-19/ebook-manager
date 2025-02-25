const express = require('express');
const { addEbook, getEbooks, deleteEbook, readEbooks } = require('../controllers/ebookController');
const { authMiddleware, } = require('../middleware/authMiddleware');
const path = require('path');

const router = express.Router();
const { upload } = require('../config/db.js');

// Upload eBook
router.post('/', authMiddleware, upload.single('ebook'), addEbook);

// Get eBooks
router.get('/', authMiddleware, getEbooks);

// Delete eBook
router.delete('/:id', authMiddleware, deleteEbook);

// read/donwload a eBook
router.get('/read/:id', authMiddleware, readEbooks);



module.exports = router;
