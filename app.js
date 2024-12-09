const express = require("express");
// const accounts = require("./accounts");
const connectDb = require("./database");
// const accountRouter = require("./apis/accounts/router");

const app = express();
const port = 8000;

app.use(express.json());
connectDb();
// app.use("/api/accounts", accountRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
