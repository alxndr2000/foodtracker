import { IIngredientType } from "@myorg/shared";
import mongoose, { Schema } from "mongoose";

export const IngredientTypeSchema = new Schema<IIngredientType>({
  name: { type: String, required: true },
});

export const IngredientTypeModel = mongoose.model<IIngredientType>("IngredientType", IngredientTypeSchema);