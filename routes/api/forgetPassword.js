const express = require("express");
const router = express.Router();

const forgetPasswordValidation = require("../../validation/forgetPassword.validation");
const usersModel = require("../../models/Users.model");
const generateRandomAlphaNum = require("../../util/generateRandomAlphaNum");
const jwt = require("../../config/jwt");
const sendEmail = require("../../config/mailer");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await forgetPasswordValidation(req.body);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    if (!user) {
      /*
        if user is null this mean we did not find the user in our db
      */
      return res.json({
        msg: "if your email exists you will receive an email",
      });
    }

    const secretKey = generateRandomAlphaNum(8);
    const token = await jwt.generateToken(
      {
        email: validatedValue.email,
        secretKey
      },
      process.env.JWT_RESET_PASSWORD_KEY,
      { expiresIn: "1h" }
    );
    const link = `http://localhost:3000/api/resetPassword/${token}`;
    console.log(link);

    // sendEmail(
    //   process.env.EMAIL_EMAIL,
    //   validatedValue.email,
    //   "reset password",
    //   `<a href="${link}">click here to reset your password</a>`
    // );

    res.json({ msg: "if your email exists you will receive an email" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
