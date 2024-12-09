const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("here");

  try {
    const conn = await mongoose.connect(
      "mongodb+srv://foodproject1900:ILikeFood0091@cluster0.7mlg2.mongodb.net/"
    );
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
