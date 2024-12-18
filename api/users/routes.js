const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerUser,
  logoutUser,
  loginUser,
  getPermission,
} = require("./controllers");
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);

router.get(
  "/permission",
  passport.authenticate("jwt", { session: false }),
  getPermission
);
module.exports = router;
