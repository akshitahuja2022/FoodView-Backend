// create the  server
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import foodRouter from "./routes/foodItem.routes.js";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://food-view-6moc.onrender.com", // deployed frontend
    ],
    credentials: true,
  })
);

// router
app.use("/auth", authRouter);
app.use("/item", foodRouter);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

export default app;
