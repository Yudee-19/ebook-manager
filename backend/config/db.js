const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const { ObjectId } = require('mongoose').Types;
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

let gfs;

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.once('open', () => {
    gfs = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: async (req, file) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("req.body in storage:", req.body);
                resolve({
                    filename: req.body.title,
                    bucketName: 'uploads',
                    metadata: {
                        author: req.body.author,
                        description: req.body.description,
                        genre: req.body.genre,
                        uploadedBy: new ObjectId(req.user.id),
                    },
                });
            } catch (err) {
                reject(err);
            }
        });
    }
});

const upload = multer({ storage });


const getGfs = () => {
    if (!gfs) {
        throw new Error('GridFS not initialized');
    }
    return gfs;
};

module.exports = { upload, conn, getGfs };