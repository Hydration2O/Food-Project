const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipeController
);

router.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);

router.put(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  editRecipe
);

router.put(
  "/:recipeId/add/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  addIngredientToRecipe
);

router.put(
  "/:recipeId/add/:categoryId",
  passport.authenticate("jwt", { session: false }),
  addCategoryToRecipe
);

module.exports = router;
