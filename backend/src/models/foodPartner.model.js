import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const FoodPartnerModel = new mongoose.model(
  "foodPartner-users",
  foodPartnerSchema
);
export default FoodPartnerModel;
