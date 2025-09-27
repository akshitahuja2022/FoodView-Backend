import FoodPartnerModel from "../models/foodPartner.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
dotenv.config();

const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.partnerToken;
  console.log("Cookies received:", req.cookies);
  console.log(req.cookies.partnerToken);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please register and login first", success: false });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await FoodPartnerModel.findById(decodeToken.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
      success: false,
    });
  }
};

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please register and login first", success: false });
  }

  try {
    const DecodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(DecodeToken.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
      success: false,
    });
  }
};
export default {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
