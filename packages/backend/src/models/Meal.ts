import mongoose, { Schema } from "mongoose";
import { IMeal } from "@myorg/shared"
import { MealIngredientSchema } from "./MealIngredient";


export const MealSchema = new Schema<IMeal>({
  name: { type: String, required: true },
  ingredients: [{ type: MealIngredientSchema, required: true }],
});

export const MealModel = mongoose.model<IMeal>("Meal", MealSchema);