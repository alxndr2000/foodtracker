import { Types } from "mongoose";
import { IMealIngredient } from "./mealIngredient";

export interface IMeal {
	_id?: Types.ObjectId;
	name: string;
	ingredients: IMealIngredient[];
}