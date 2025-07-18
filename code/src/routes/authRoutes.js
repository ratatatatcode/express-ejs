const express = require("express");
const router = express.Router();
const authController = require("@/controllers/authController");;

router.get("/", (req, res) => res.render("auth/signin"));
router.get("/signup", (req, res) => res.render("auth/signup"));
router.get("/forgot-password", (req, res) => res.render("auth/forgotPassword"));
router.post("/api/auth/signin", authController.login);
router.post("/api/auth/signup", authController.signup);
router.post("/api/auth/recovery", authController.resetPasswordForEmail);
router.post("/api/auth/logout", authController.logout);

module.exports = router;