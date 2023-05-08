const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.post("/signup", authControllers.postSignUp);

router.post("/login", authControllers.postLogin);

router.get("/logout", authControllers.postLogout);

router.post("/forgotPassword", authControllers.postForgotPassword);

router.post("/resetPassword", authControllers.postResetPassword);

router.get("/refresh", authControllers.getRefreshToken);

router.get("/verifyAccount", authControllers.getVerifyAccount);

module.exports = router;
