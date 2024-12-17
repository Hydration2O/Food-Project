const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  image: String,
  instructions: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  prep_time: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
