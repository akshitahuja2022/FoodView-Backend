import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

// authentication routes
authRouter.post("/user/register", authController.registerUser);
authRouter.post("/user/login", authController.loginUser);
authRouter.get("/user/logout", authController.logout);

// foodPartner routes
authRouter.post("/food-partner/register", authController.foodPartnerRegister);
authRouter.post("/food-partner/login", authController.foodPartnerLogin);
authRouter.get("/food-partner/logout", authController.foodPartnerLogout);

export default authRouter;
