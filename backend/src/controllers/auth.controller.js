import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import FoodPartnerModel from "../models/foodPartner.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ message: "User Already Exist", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User registered successfully",
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfull",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Something went wrong", success: false, error });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successfully", success: true });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Something went wrong", success: true, error });
  }
};

// Food Partner Controllers
const foodPartnerRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const foodPartnerExist = await FoodPartnerModel.findOne({ email });

    if (foodPartnerExist) {
      return res.status(400).json({
        message: "Food Partner Account Already Exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartnerUser = new FoodPartnerModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await foodPartnerUser.save();

    const token = jwt.sign(
      { id: foodPartnerUser._id, email: foodPartnerUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "FoodPartnerUser register successfully",
      success: true,
      foodPartnerUser: {
        id: foodPartnerUser._id,
        email: foodPartnerUser.email,
        name: foodPartnerUser.name,
        address: foodPartnerUser.address,
        phone: foodPartnerUser.phone,
      },
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Something Went Wrong", success: false, error });
  }
};

const foodPartnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await FoodPartnerModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfull",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.email,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

const foodPartnerLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successfully", success: true });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Something went wrong", success: true, error });
  }
};

export default {
  registerUser,
  loginUser,
  logout,
  foodPartnerRegister,
  foodPartnerLogin,
  foodPartnerLogout,
};
