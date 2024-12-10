const express = require("express");
const connectDb = require("./database");
const ingredientRouter = require("./api/ingredients/routes");

const app = express();
const port = 8080;

app.use(express.json());
connectDb();
app.use("/api/ingredients", ingredientRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
