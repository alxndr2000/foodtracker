import { Types } from "mongoose";
import { IMealIngredient } from "./mealIngredient";

export interface IRecipe {
	_id?: Types.ObjectId;
	name: string;
	ingredients: IMealIngredient[];
}
