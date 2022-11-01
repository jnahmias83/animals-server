const express = require("express");
const router = express.Router();
const registerValidation = require("../../validation/register.validation");
const usersModel = require("../../models/Users.model");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await registerValidation(req.body);
    console.log("validatedValue",validatedValue);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    if(user) {
        throw "email already exists";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({err})
  }
});

module.exports = router;
