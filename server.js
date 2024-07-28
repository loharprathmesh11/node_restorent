// const greet = require('./greet.txt');

// const file = require('./file1.js');

// console.log(file.user);

const express = require("express");
const app = express();

const db = require("./models/db.js");
// env config to hide sensitive data
require('dotenv').config();


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const passport = require('./auth.js');

const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`);
  next();  // Move to next phase
}

app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', function (req, res) {
  res.send("Welcome to the server(waiter house)");
});



const personRoutes = require('./routes/personRoutes.js');
app.use('/person' , personRoutes);

const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu', menuRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT);