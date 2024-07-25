const mongoose = require('mongoose');

// const mongoUrl = 'mongodb://127.0.0.1:27017/resto'
const mongoUrl = 'mongodb://localhost:27017/resto'


mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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