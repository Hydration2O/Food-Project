const express = require("express");
const passport = require("passport");
const {
  creatNewIngredient,
  listIngredients,
  updateIngredient,
  deleteIngredient,
  getIngredientById,
} = require("./controllers");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  creatNewIngredient
);

router.get("/", listIngredients);

router.get("/:ingredientId", getIngredientById);

router.put(
  "/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  updateIngredient
);

router.delete(
  "/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  deleteIngredient
);

module.exports = router;
//todo make controllers use the passport
