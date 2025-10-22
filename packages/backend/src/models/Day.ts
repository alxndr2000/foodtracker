import { IDay } from "@myorg/shared";
import mongoose, { Schema } from "mongoose";
import { MealSchema } from "./Meal";

export const DaySchema = new Schema<IDay>({
  date: { type: Date, required: true },
  meals: [{ type: MealSchema, default: [] }],
});

export const DayModel = mongoose.model<IDay>("Day", DaySchema);

