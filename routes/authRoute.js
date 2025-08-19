const express = require("express");
const { callbackGoogle, getProfile, logout, loginGoogle } = require("../controllers/authController");

const router = express.Router();

router.get("/auth/google", loginGoogle);
router.get("/auth/google/callback", callbackGoogle);
router.get("/home", getProfile);
router.get("/logout", logout);

module.exports = router;