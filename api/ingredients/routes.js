const express = require("express");
const {
  creatNewIngredient,
  listIngredients,
  updateIngredient,
  deleteIngredient,
  getIngredientById,
} = require("./controllers");

const router = express.Router();

router.post("/", creatNewIngredient);

router.get("/", listIngredients);

router.get("/:ingredientId", getIngredientById);

router.put("/:ingredientId", updateIngredient);

router.delete("/:ingredientId", deleteIngredient);

module.exports = router;
