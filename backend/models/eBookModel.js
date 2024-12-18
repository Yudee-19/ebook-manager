const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    genre: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    gridfsFileId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to GridFS file
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // References the User who uploaded the eBook
    }
});

const eBookModel = mongoose.model('Ebook', ebookSchema);
module.exports = { eBookModel }
