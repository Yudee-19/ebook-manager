// controllers/ebookController.js
const { ebookSchema } = require('../utils/zodValidation');
const { getGfs } = require('../config/db');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const os = require('os');
// const { eBookModel } = require('../models/eBookModel.js');


// Add eBook Controller

const addEbook = async (req, res) => {
    const validation = ebookSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    // console.log("req.file:", req.file);  // File object
    // console.log("req.body:", typeof req.body);  // FormData fields
    // console.log("req.user:", req.user);  // User from authMiddleware

    if (!req.file) {
        return res.status(400).json({ error: 'File upload failed' });
    }

    try {
        res.status(201).json({ message: 'eBook uploaded successfully!', ebook: req.file });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Delete eBook Controller
const deleteEbook = async (req, res) => {
    try {
        const fileId = new mongoose.Types.ObjectId(req.params.id);
        const userId = new mongoose.Types.ObjectId(req.user.id);
        // console.log(fileId, userId);

        const gfs = getGfs();


        // Check if file exists and belongs to user
        const files = await gfs.find({
            _id: fileId,
            'metadata.uploadedBy': userId
        }).toArray();


        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Delete the file
        await gfs.delete(fileId);
        res.status(200).json({ message: 'eBook deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Deletion failed', details: err.message });
    }
};

const getEbooks = async (req, res) => {

    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const gfs = getGfs();
        const files = await gfs.find({ 'metadata.uploadedBy': userId }).toArray();
        res.status(200).json({ ebooks: files });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

const readEbooks = async (req, res) => {
    const tempDir = path.join(os.tmpdir(), 'ebook-temp');

    try {
        // Create temp directory if it doesn't exist
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const fileId = new mongoose.Types.ObjectId(req.params.id);
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads'
        });

        const files = await bucket.find({ _id: fileId }).toArray();
        if (!files.length) {
            return res.status(404).json({ error: 'File not found' });
        }

        const file = files[0];
        const tempFilePath = path.join(tempDir, `${fileId}.epub`);

        // Create write stream to temp file
        const writeStream = fs.createWriteStream(tempFilePath);
        const downloadStream = bucket.openDownloadStream(fileId);

        // Handle stream completion
        writeStream.on('finish', () => {
            res.status(200).json({
                filePath: tempFilePath,
                fileName: file.filename,
                message: 'File downloaded successfully'
            });

            // Set cleanup timeout (e.g., 1 hour)
            setTimeout(() => {
                if (fs.existsSync(tempFilePath)) {
                    fs.unlink(tempFilePath, (err) => {
                        if (err) console.error('Error deleting temp file:', err);
                        else console.log('Temp file deleted:', tempFilePath);
                    });
                }
            }, 3600000); // 1 hour
        });
        // Handle errors
        writeStream.on('error', (error) => {
            console.error('Error writing file:', error);
            res.status(500).json({ error: 'Error saving file' });
        });

        // Pipe the download stream to the write stream
        downloadStream.pipe(writeStream);

    } catch (err) {
        console.error('Error reading ebook:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}

module.exports = {
    addEbook,
    deleteEbook,
    getEbooks,
    readEbooks

};
