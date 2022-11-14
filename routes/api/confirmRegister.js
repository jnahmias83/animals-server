const express = require("express");
const router = express.Router();

const confirmRegisterValidation = require("../../validation/confirmRegister.validation");
const usersModel = require("../../models/Users.model");

//localhost:8000/api/confirmregister/:email/:secretKey
router.get("/:email/:secretKey", async (req, res) => {
  try {
    const validatedValue = await confirmRegisterValidation(req.params);
    /*
      check if params is in the right format
      req.params = {
        email: "1@2.com",
        secretKey:1w3d4f7j
      }
    */
    const user = await usersModel.findUserByEmail(validatedValue.email);

    if (!user) {
      /*
          if user is null this mean we did not find the user in our db
        */
      throw "something went wrong";
    }

    if (user.secretKey !== validatedValue.secretKey) {
      /*
          the email is correct but the secret key not match
        */
      throw "something went wrong";
    }

    await usersModel.updateIsMailValid(validatedValue.email);
    res.json({ status: "OK" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
