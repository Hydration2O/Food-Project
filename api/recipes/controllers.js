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
const OwnershipCheck = (user, recipe) => {
  console.log("the user id is ");
  console.log(user.id);
  console.log("the recipe creator is ");
  console.log(recipe.creator);
  console.log(recipe.creator.equals(user.id));
  // const = user.id
  if (recipe.creator.equals(user.id)) {
    return true;
  } else {
    return false;
  }
};

exports.createRecipeController = async (req, res) => {
  try {
    const { user } = req;
    req.body.creator = user.id;
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
  if (req.body.ingredients) {
    req.body.ingredients = req.body.ingredients.split(",");
  } else {
    req.body.ingredients = [];
  }
  if (foundRecipe) {
    const isOwned = OwnershipCheck(req.user, foundRecipe);
    console.log(isOwned);
    if (isOwned) {
      await foundRecipe.updateOne(newData);
      res.status(201).json(foundRecipe);
    } else {
      res.status(403).json("this user doesn't own this recipe");
    }
  } else res.status(404).json("recipe not found");
};

exports.addIngredientToRecipe = async (req, res) => {
  const { recipeId, ingredientId } = req.params;
  const foundRecipe = await Recipe.findById(recipeId);
  //TODO check if ing is there
  if (foundRecipe) {
    const isOwned = OwnershipCheck(req.user, foundRecipe);
    if (isOwned) {
      const updatedRecipe = await foundRecipe.updateOne({
        $push: { ingredients: ingredientId },
      });
      res.status(200).json(updatedRecipe);
    } else {
      res.status(403).json("this user doesn't own this recipe");
    }
  } else {
    res.status(404).josn("recipe not found");
  }
};

exports.addCategoryToRecipe = async (req, res) => {
  const { recipeId, categoryId } = req.params;
  const foundRecipe = await Recipe.findById(recipeId);
  if (foundRecipe) {
    const isOwned = OwnershipCheck(req.user, foundRecipe);
    if (isOwned) {
      const updatedRecipe = await foundRecipe.updateOne({
        $push: { categories: categoryId },
      });
      res.status(200).json(updatedRecipe);
    } else {
      res.status(403).json("this user doesn't own this recipe");
    }
  } else {
    res.status(404).josn("recipe not found");
  }
};

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const targetRecipe = await Recipe.findById(recipeId);
  if (targetRecipe) {
    const isOwned = OwnershipCheck(req.user, foundRecipe);
    if (isOwned) {
      await targetRecipe.deleteOne();
      res.status(204).json(targetRecipe);
    } else {
      res.status(403).json("this user doesn't own this recipe");
    }
  } else res.status(404).json("recipe not found");
};
