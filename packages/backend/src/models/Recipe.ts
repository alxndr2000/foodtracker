import { IRecipe } from "@myorg/shared";
import mongoose, { Schema } from "mongoose";
import { MealIngredientSchema } from "./MealIngredient";

const RecipeSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  ingredients: [{ type: MealIngredientSchema, required: true }],
});

export const RecipeModel = mongoose.model<IRecipe>("Recipe", RecipeSchema);