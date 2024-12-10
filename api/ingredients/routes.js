const express = require("express");
const {
  createIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
} = require("./controllers");

const router = express.Router();

router.post("/", createIngredient);

router.get("/", getAllIngredients);

router.put("/:ingredientId", updateIngredient);

router.delete("/:ingredientId", deleteIngredient);

module.exports = router;
