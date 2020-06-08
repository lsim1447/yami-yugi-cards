const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    cardId: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    stars: { type: Number, required: true },
    title: { type: String, required: true },
    username: { type: String, required: true },
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;