const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("here");

  try {
    const conn = await mongoose.connect("");
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
