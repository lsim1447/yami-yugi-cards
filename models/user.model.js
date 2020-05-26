const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    accountBalance: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    deck: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;