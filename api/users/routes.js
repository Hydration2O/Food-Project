const express = require("express");
const passport = require("passport");
const router = express.Router();

const { registerUser, logoutUser, loginUser } = require("./controllers");
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);

module.exports = router;
