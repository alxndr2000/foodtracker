import { Types } from "mongoose";

export interface IMealIngredient {
    _id?: Types.ObjectId;
	IngredientTypeID: Types.ObjectId;
	quantity: number;
}
