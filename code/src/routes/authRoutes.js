const express = require("express");
const router = express.Router();
const authController = require("@/controllers/authController");

// router.get("/signin", (req, res) => res.render("auth/signup.ejs"));
// router.get("/signup", (req, res) => res.render("auth/signup.ejs"));
// router.get("/recovery", (req, res) => res.render("auth/forgotPassword.ejs"));

router.post("/api/auth/signin", authController.login);
router.post("/api/auth/signup", authController.signup);
router.post("/api/auth/recovery", authController.resetPasswordForEmail);
router.post("/api/auth/logout", authController.logout);

module.exports = router;