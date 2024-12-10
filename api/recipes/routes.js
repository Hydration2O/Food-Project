const express = require("express");
const routes = express.Router();

const {
  listAllRecipesController,
  createRecipeController,
  deleteRecipe,
  editRecipe,
} = require("./controllers");

router.get("/", listAllRecipesController);

router.post("/", createRecipeController);

router.delete("/:recipeId", deleteRecipe);

router.put("/:recipeId", editRecipe);

module.exports = routes;
