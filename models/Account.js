const { model, Schema, default: mongoose } = require("mongoose");

const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = model("Account", AccountSchema);
