const mongoose = require('mongoose');

const menuCardSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    taste:{
        type: String,
        enum:['sweet', 'spicy', 'sour'],
        required: true,
    },
    price:{
        type: Number,
        default: 0
    },
    menuId:{
        type: Number,
        required: true,
        unique: true,
    }
})

const MenuCard = mongoose.model('menuCard', menuCardSchema);

module.exports = MenuCard;