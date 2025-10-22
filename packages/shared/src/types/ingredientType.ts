import { Types } from "mongoose";

export interface IIngredientType {
	_id?: Types.ObjectId;
	name: string;
	unit: string;
}
