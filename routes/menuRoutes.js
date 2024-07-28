const express = require('express');

const router = express.Router();
const menuCard = require('../models/menu.js');


router.post('/', async(req, res)=>{
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

router.get('/', async(req, res) =>{
    try {
        const data = await menuCard.find();
        console.log('data shown successfully');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'server Error'});
    }
});


router.get("/idli", (req, res) => {
    var customized_idli = {
      name: "rava idli",
      size: "10cm diameter",
      is_sambhar: true,
      price: 30,
    };
    res.send(customized_idli);
  });

module.exports = router;