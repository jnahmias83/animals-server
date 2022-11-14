const express = require("express");
const router = express.Router();
const loginValidation = require("../../validation/login.validation");
const usersModel = require("../../models/Users.model");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await loginValidation(req.body);
    // console.log("validatedValue", validatedValue);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    //check if user exists in our system
    if (!user) {
      throw "invalid email and/or password";
    }
    //check if user active email
    if (!user.isMailValid) {
      throw "please validate the email first";
    }
    //compare password that we got from user and compare it to our hash
    const hashResult = await bcrypt.cmpHash(
      validatedValue.password,
      user.password
    );
    //if hashResult this mean that the password incorrect
    if (!hashResult) {
      throw "invalid email and/or password";
    }

    //create token with user id
    const token = await jwt.generateToken(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );

    //send the token to the client
    res.json({ token });
    
  } catch (err) {
    // console.log(err);
    res.status(400).json({ err }); //.json(...) like send but convert the data to json
    // res.status(400).json({ err:err });
  }
});

module.exports = router;
