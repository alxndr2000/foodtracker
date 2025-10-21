import { Types } from "mongoose";
import { IMeal } from "./meal";

export interface IDay {
	_id?: Types.ObjectId;
	date: Date;
	Meals: Types.ObjectId[];
}
