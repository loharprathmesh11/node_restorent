const mongoose = require('mongoose');

const menuCardSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    taste:{
        type: String,
        enum:['sweet', 'spicy', 'sour'],
        require: true,
    },
    price:{
        type: Number,
        default: 0
    },
    menuId:{
        type: Number,
        require: true,
        unique: true,
    }
})

const MenuCard = mongoose.model('menuCard', menuCardSchema);

module.exports = MenuCard;