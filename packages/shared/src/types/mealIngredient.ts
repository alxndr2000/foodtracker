import { Types } from "mongoose";

export interface IMealIngredient {
    _id?: Types.ObjectId;
	ingredientTypeID?: Types.ObjectId; // not populated on frontend
	name?: string; // only populated for frontend use
	unit?: string; // only populated for frontend use
	quantity: number;
}
