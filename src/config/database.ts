import "dotenv/config";
import mongoose from "mongoose";

export const connection = async () => {
  const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };

  try {
    // console.log("DB_USER from env:", process.env.DB_USER);
    // console.log("DB_HOST from env:", process.env.DB_HOST);
    await mongoose.connect(process.env.DB_HOST, options);
    console.log("✅ Connected to database");

    mongoose.connection.on("disconnected", () => {
      console.log("❌ Mongoose disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });
  } catch (err) {
    console.error("❌ Cannot connect to database:", err);
    throw err;
  }
};
