import FoodPartnerModel from "../models/foodPartner.model.js";
import FoodModel from "../models/food.model.js";

const getFoodPartnerById = async (req, res) => {
  const foodPartnerId = req.params.id;

  const foodPartner = await FoodPartnerModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await FoodModel.find({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ message: "Food Partner not found" });
  }

  res.status(200).json({
    message: "Food partner retrieved successfully",
    success: true,
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
};

export default getFoodPartnerById;
