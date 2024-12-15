const express = require("express");
const router = express.Router();

const {
  listAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  deleteRecipe,
  editRecipe,
  getRecipeByIdController,
} = require("./controllers");

router.get("/", listAllRecipesController);

router.get("/:recipeId", getRecipeByIdController);

router.post("/", createRecipeController);

router.delete("/:recipeId", deleteRecipe);

router.put("/:recipeId", editRecipe);

module.exports = router;
