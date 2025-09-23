// start the server
import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";

dotenv.config();

// MongoDB Connection
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log("Server is running on http://localhost:4000/");
});
