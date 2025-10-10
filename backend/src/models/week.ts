import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMeal {
  weekday: number;
  mealid: string;
}

export interface IWeek extends Document {
  dateRange: string;
  meals: IMeal[];
}

const MealSchema = new Schema<IMeal>({
  weekday: { type: Number, required: true },
  mealid: { type: String, required: true },
});

const WeekSchema = new Schema<IWeek>({
  dateRange: { type: String, required: true },
  meals: [MealSchema],
});

const Week: Model<IWeek> = mongoose.model<IWeek>("Week", WeekSchema);

export default Week;