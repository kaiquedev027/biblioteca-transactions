const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb://localhost:27017/biblioteca"
  );

  console.log("MongoDB conectado");
}

module.exports = connectDB;