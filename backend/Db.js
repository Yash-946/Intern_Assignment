require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
mongoose.connect(process.env.DATABASE_URL)


const signupschema = new mongoose.Schema(
  {
    "username": {
      type: "string",
      unique: true,
      required: true
    },
    "email": {
      type: "string",
      unique: true,
      required: true
    },
    "password": {
      type: "string",
      required: true
    },
    "name": {
      type: "string"
    },
    "profilePicture": {
      type: "string"
    }
  }
)

// hashing the password
signupschema.pre("save",async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
  }
  next();
})

const signupsch = mongoose.model("signup",signupschema);
module.exports = {
  signupsch
}