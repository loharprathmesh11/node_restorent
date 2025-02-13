const mongoose = require('mongoose');


// env config to hide sensitive data
require('dotenv').config();


const mongoUrl = process.env.DB_URL_Local; // for local host defined in env hidden

// const mongoUrl = process.env.DB_URL;    //for mongo atlas paid version

mongoose.connect(mongoUrl, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})



const db = mongoose.connection;


// following are the event listens
db.on('connected', () =>{
    console.log('connection established');
})
db.on('error', (err) =>{
    console.log('error occured', err);
})
db.on('disconnected', () =>{
    console.log('disconnected from the server');
})

module.exports = db;