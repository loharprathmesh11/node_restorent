const mongoose = require('mongoose');

// define schema

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    work:{
        type: String,
        required: true,
        enum: ['emplyee', 'waiter'],
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;