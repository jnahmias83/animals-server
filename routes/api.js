const express = require("express");
const router = express.Router();

const registerRouter = require("./api/register");
const confirmRegisterRouter = require("./api/confirmRegister");
//const sendEmail = require("../config/mailer");
const loginRouter = require("./api/login");
const forgetPasswordRouter = require("./api/forgetPassword");
const resetPasswordRouter = require("./api/resetPassword");
const uploadRouter = require("./api/upload");

router.use("/register", registerRouter);
router.use("/confirmRegister", confirmRegisterRouter);
router.use("/login", loginRouter);
router.use("/forgetPassword", forgetPasswordRouter);
router.use("/resetPassword", resetPasswordRouter);
router.use("/upload", uploadRouter);

router.get("/sendemail", async (req, res) => {
  await sendEmail(
    process.env.EMAIL_EMAIL,
    process.env.EMAIL_EMAIL,
    "🦄🦄🦄",
    "<h1>we did it!</h1>"
  );
});

module.exports = router;
