import mongoose, { Schema } from "mongoose";
import { IMealIngredient } from "@myorg/shared"

export const MealIngredientSchema = new Schema<IMealIngredient>({
  IngredientTypeID: { type: Schema.Types.ObjectId, ref: "IngredientType", required: true },
  quantity: { type: Number, required: true },
});

export const MealIngredientModel = mongoose.model<IMealIngredient>("MealIngredient", MealIngredientSchema);