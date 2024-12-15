const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: String,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
