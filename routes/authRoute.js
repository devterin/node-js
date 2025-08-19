const express = require("express");
const { callbackGoogle, getProfile, logout, loginGoogle } = require("../controllers/authController");

const router = express.Router();

// login Google
router.get("/auth/google", loginGoogle);

// callback
router.get("/auth/google/callback", callbackGoogle);

// profile
router.get("/home", getProfile);

// logout
router.get("/logout", logout);

module.exports = router;