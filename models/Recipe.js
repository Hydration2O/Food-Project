const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: String,
  ingredientes: String,
  image: String,
  instructions: String,
  category: String,
  prep_time: String,
});

module.exports = model("Recipe", RecipeSchema);
