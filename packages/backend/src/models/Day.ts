import { IDay } from "@myorg/shared";
import mongoose, { Schema } from "mongoose";

export const DaySchema = new Schema<IDay>({
  date: { type: Date, required: true },
  Meals: [{ type: Schema.Types.ObjectId, ref: "Meal", required: true }],
});

export const DayModel = mongoose.model<IDay>("Day", DaySchema);

