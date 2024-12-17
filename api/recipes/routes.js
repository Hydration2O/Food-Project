const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

const {
  listAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  deleteRecipe,
  editRecipe,
  addIngredientToRecipe,
  addCategoryToRecipe,
} = require("./controllers");

router.get("/", listAllRecipesController);

router.get("/:recipeId", getRecipeByIdController);

router.post("/", upload.single("image"), createRecipeController);

router.delete("/:recipeId", deleteRecipe);

router.put("/:recipeId", editRecipe);

router.put("/:recipeId/add/:ingredientId", addIngredientToRecipe);

router.put("/:recipeId/add/:categoryId", addCategoryToRecipe);

module.exports = router;
