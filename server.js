// const greet = require('./greet.txt');

// const file = require('./file1.js');

// console.log(file.user);

const express = require("express");
const app = express();

const db = require("./routes/db.js");
const menuCard = require('./routes/menu.js');

// env config to hide sensitive data
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());


const Person = require("./routes/Person.js");

app.get("/", function (req, res) {
  res.send("Welcome to the server(waiter house)");
});

app.get("/idli", (req, res) => {
  var customized_idli = {
    name: "rava idli",
    size: "10cm diameter",
    is_sambhar: true,
    price: 30,
  };
  res.send(customized_idli);
});

app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(200).json({error: 'Internal Server Error'});
  }
});

app.get('/people', async (req, res)=>{
    try {
        const data = await Person.find();
        console.log('data shown successfully!');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Server Error'});
    }
})


app.post('/menuInsert', async(req, res)=>{
    try {
        const data = req.body;
        const newMenu = new menuCard(data);
        const response = await newMenu.save();
        console.log('new menu added');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({error:'Server Error'});
    }
});
// app.post('/holi', (req, res)=>{
//     console.log("data is saved successfully!")
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT);
