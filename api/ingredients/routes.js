const express = require("express");
const {
  creatNewIngredient,
  listIngredients,
  updateIngredient,
  deleteIngredient,
  getIngredientByName,
} = require("./controllers");

const router = express.Router();

router.post("/", creatNewIngredient);

router.get("/", listIngredients);

router.get("/:ingredientName", getIngredientByName);

router.put("/:ingredientId", updateIngredient);

router.delete("/:ingredientId", deleteIngredient);

module.exports = router;
