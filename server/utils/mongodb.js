const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Genie",
    });

    isConnected = true;
    console.log("MongoDB connected:");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
};

module.exports = { connectDb };
