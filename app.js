const express = require("express");
const connectDb = require("./database");

const ingredientRouter = require("./api/ingredients/routes");
const categoryRouter = require("./api/categories/routes");
const recipeRouter = require("./api/recipes/routes");

const app = express();
const port = 8080;

app.use(express.json());
connectDb();

app.use("/api/ingredients", ingredientRouter);
app.use("/api/Categories", categoryRouter);
app.use("/api/Recipes", recipeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
