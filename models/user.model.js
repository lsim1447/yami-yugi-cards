const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    accountBalance: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
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
    phoneNumber: {
        type: String,
        required: true
    },
    deck: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;