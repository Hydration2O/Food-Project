const express = require("express");
const connectDb = require("./database");
const passport = require("passport");

const { localStrategy, jwtStrategy } = require("./passport");
const ingredientRouter = require("./api/ingredients/routes");
const categoryRouter = require("./api/categories/routes");
const recipeRouter = require("./api/recipes/routes");
const path = require("path");
const userRouter = require("./api/users/routes");

const app = express();
const port = 8080;

app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/ingredients", ingredientRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/Recipes", recipeRouter);
app.use("/api/recipes", recipeRouter);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/users", userRouter);

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
