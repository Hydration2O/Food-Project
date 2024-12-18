const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

const OwnershipCheck = (user, recipe) => {
  return recipe.creator.equals(user.id);
};

exports.listAllRecipesController = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipeByIdController = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const foundRecipe = await Recipe.findById(recipeId);
    if (foundRecipe) {
      res.status(200).json(foundRecipe);
    } else {
      res.status(404).json("Recipe not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    const newRecipe = await Recipe.create(req.body);

    await Category.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipe._id },
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const newData = req.body;

  try {
    const foundRecipe = await Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404).json("Recipe not found");
    }

    const isOwned = foundRecipe.creator.equals(req.creator);
    const isAdmin = req.user.role === "admin";

    if (isOwned || isAdmin) {
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, newData, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({
        message: "Recipe updated successfully",
        recipe: updatedRecipe,
      });
    }

    return res.status(403).json("You are not authorized to edit this recipe");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addIngredientToRecipe = async (req, res) => {
  const { recipeId, ingredientId } = req.params;

  try {
    const foundRecipe = await Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404).json("Recipe not found");
    }

    const isOwned = OwnershipCheck(req.user, foundRecipe);
    if (isOwned) {
      foundRecipe.ingredients.push(ingredientId);
      await foundRecipe.save();
      res
        .status(200)
        .json({ message: "Ingredient added", recipe: foundRecipe });
    } else {
      res.status(403).json("You are not authorized to modify this recipe");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCategoryToRecipe = async (req, res) => {
  const { recipeId, categoryId } = req.params;

  try {
    const foundRecipe = await Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404).json("Recipe not found");
    }

    const isOwned = OwnershipCheck(req.user, foundRecipe);
    if (isOwned) {
      foundRecipe.category.push(categoryId);
      await foundRecipe.save();
      res.status(200).json({ message: "Category added", recipe: foundRecipe });
    } else {
      res.status(403).json("You are not authorized to modify this recipe");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const targetRecipe = await Recipe.findById(recipeId);

    if (!targetRecipe) {
      return res.status(404).json("Recipe not found");
    }

    const isAdmin = req.user.role === "admin";

    if (isAdmin) {
      await targetRecipe.deleteOne();
      return res.status(204).end();
    }

    return res.status(403).json("Only admins can delete recipes");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
