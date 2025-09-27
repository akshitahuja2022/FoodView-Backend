import express, { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import foodController from "../controllers/food.controllers.js";
import multer from "multer";
import getFoodPartnerById from "../controllers/food-partner.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
});

const foodRouter = express.Router();

// Post /item/food
foodRouter.post(
  "/food",
  // authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFoodItem
);

// Get /item/getFood
foodRouter.get("/getFood", foodController.getFoodItem);

// Get /item/food-partner/:id
foodRouter.get("/food-partner/:id", getFoodPartnerById);
// Get /item/delete/:id
foodRouter.get("/delete/:id", foodController.deleteFoodItem);
export default foodRouter;
