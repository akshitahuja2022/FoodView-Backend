import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connection Successfully"))
    .catch((err) => console.error("MongoDB Connection Error", err));
};

export default connectDB;
