import { IMeal } from "./meal";

export interface IWeek extends Document {
  dateRange: string;
  meals: IMeal[];
}