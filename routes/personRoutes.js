const express = require("express");
const router = express.Router();

const Person = require("../models/Person.js");

const {jwtAuthMiddleware, generateToken} = require('../jwt.js');
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");

    const payLoad = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payLoad));
    const token = generateToken(payLoad);
    console.log("Token is: ", token);

    res.status(200).json({response: response, token: token});

  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.post('/login', async(req, res)=>{
  try {
    const {username, password} = req.body;

    const user = await Person.findOne({username: username});

    if((!user) || (!(await user.comparePassword(password)))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    // generate token
    const payLoad = {
      id : user.id,
      username : user.username
    }
    const token = generateToken(payLoad);

    res.json({token});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data shown successfully!");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get('/profile', jwtAuthMiddleware, async(req, res) =>{
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error '});
  }
})

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "waiter" || workType == "employee") {
      const response = await Person.find({ work: workType });
      console.log("response fetched! ");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    // facing error in the following code
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "Person Deleted Successfully! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
