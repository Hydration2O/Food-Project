const Ingredient = require("../../models/Ingredient");

exports.listIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIngredientById = async (req, res) => {
  const { ingredientId } = req.params;
  try {
    const ingredient = await Ingredient.findById(ingredientId);
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ error: "Ingredient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.creatNewIngredient = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIngredient = async (req, res) => {
  const { ingredientId } = req.params;
  try {
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ error: "This ingredient does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIngredient = async (req, res) => {
  const { ingredientId } = req.params;
  try {
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "This Ingredient does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
