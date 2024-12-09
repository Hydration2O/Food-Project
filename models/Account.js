const { model, Schema } = require("mongoose");

const AccountSchema = new Schema({
  username: String,
  password: String,
});

module.exports = model("Account", AccountSchema);
