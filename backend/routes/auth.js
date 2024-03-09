require("dotenv").config();

const router = require("express").Router();
const { signupsch } = require("../Db");
const jwt = require("jsonwebtoken");
const jwttoken = process.env.JWT_KEY;


router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, name, profilePicture } = req.body;

    const user = new signupsch({ username, email, password,name,profilePicture });
    await user.save();
    
    const id = user.id;
    // console.log(id);
    const token = jwt.sign(jwttoken,id);
    console.log(token);
    res.status(200).json({
      token: token
    });

  }
  catch (error) {
    res.status(200).json({message : "error"});
  }
});

module.exports = router