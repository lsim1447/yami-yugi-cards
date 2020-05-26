const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    archetype: { type: String, required: false },
    atk: { type: Number, required: false },
    attribute: { type: String, required: false },
    card_images: { type: Array, required: true },
    card_prices: { type: Array, required: true },
    card_sets: { type: Array, required: false },
    def: { type: Number, required: false },
    desc: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    level: { type: Number, required: false },
    name: { type: String, required: true },
    race: { type: String, required: false },
    type: { type: String, required: false },
}, {
    timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;