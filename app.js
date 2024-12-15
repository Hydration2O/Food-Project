const express = require("express");
const connectDb = require("./database");

const ingredientRouter = require("./api/ingredients/routes");
const categoryRouter = require("./api/categories/routes");
const recipeRouter = require("./api/recipes/routes");
const recipeRouter = require("./api/recipes/routes");
const path = require("path");

const app = express();
const port = 8080;

app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/ingredients", ingredientRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/Recipes", recipeRouter);
app.use("/api/recipes", recipeRouter);
app.use("/media", express.static(path.join(__dirname, "media")));

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
