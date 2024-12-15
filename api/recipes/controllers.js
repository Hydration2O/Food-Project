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
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const newRecipe = await Recipe.create(req.body);
  res.status(201).json(newRecipe);
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

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const targetRecipe = await Recipe.findById(recipeId);
  if (targetRecipe) {
    await targetRecipe.deleteOne();
    res.status(204).json(targetRecipe);
  } else res.status(404).json();
};
