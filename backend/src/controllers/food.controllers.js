import FoodModel from "../models/food.model.js";
import uploadfile from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

const createFoodItem = async (req, res) => {
  const fileUploadResult = await uploadfile(req.file.buffer, uuidv4());

  const foodItem = await FoodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food Item Added Successfully",
    success: true,
    food: foodItem,
  });
};

const getFoodItem = async (req, res) => {
  const foodItems = await FoodModel.find();
  res.status(200).json({
    message: "Food items fetched successfully",
    success: true,
    foodItems,
  });
};

const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFoodItem = await FoodModel.findByIdAndDelete(id);

    if (!deleteFoodItem) {
      return res
        .status(404)
        .json({ message: "Food item not found", success: false });
    }

    res.status(200).json({
      message: "Food item deleted successfully",
      success: true,
      deleteFoodItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting food", error, success: false });
  }
};

export default {
  createFoodItem,
  getFoodItem,
  deleteFoodItem,
};
