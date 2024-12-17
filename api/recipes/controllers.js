const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

exports.listAllRecipesController = async (req, res) => {
  const recipe = await Recipe.find();
  res.status(200).json(recipe);
};

exports.getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;
  const foundRecipe = await Recipe.findById(recipeId);
  if (foundRecipe) {
    res.status(201).json(foundRecipe);
  } else res.status(404).json();
};

exports.createRecipeController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    if (req.body.ingredients) {
      req.body.ingredients = req.body.ingredients.split(",");
    } else {
      req.body.ingredients = [];
    }
    console.log(req.body.ingredients);
    const newRecipe = await Recipe.create(req.body);
    await Category.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipe._id },
    });
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "kaput" });
  }
};

exports.editRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const newData = req.body;
  const foundRecipe = await Recipe.findById(recipeId);
  if (foundRecipe) {
    await foundRecipe.updateOne(newData);
    res.status(201).json(foundRecipe);
  } else res.status(404).json();
};

exports.addIngredientToRecipe = async (req, res) => {
  const { recipeId, ingredientId } = req.params;
  const recipe = await Recipe.findById(recipeId);
  const updatedRecipe = await recipe.updateOne({
    $push: { ingredients: ingredientId },
  });
  res.status(200).json(updatedRecipe);
};

exports.addCategoryToRecipe = async (req, res) => {
  const { recipeId, categoryId } = req.params;
  const recipe = await Recipe.findById(recipeId);
  const updatedRecipe = await recipe.updateOne({
    $push: { categories: categoryId },
  });
  res.status(200).json(updatedRecipe);
};

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const targetRecipe = await Recipe.findById(recipeId);
  if (targetRecipe) {
    await targetRecipe.deleteOne();
    res.status(204).json(targetRecipe);
  } else res.status(404).json();
};
