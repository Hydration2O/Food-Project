const { model, Schema, default: mongoose } = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: String,
  ingredientes: String,
  image: String,
  instructions: String,
  category: String,
  prep_time: Number,
});

module.exports = model("Recipe", RecipeSchema);
