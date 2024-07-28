const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define schema

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    work:{
        type: String,
        required: true,
        enum: ['employee', 'waiter'],
    },
    username:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        requiredd: true,
    }
});


personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next(); 
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;