import { Types } from "mongoose";

export interface IProductPurchase {
    _id?: Types.ObjectId;
	ingredientTypeID: Types.ObjectId;
	purchaseDate: Date;
	expiryDate: Date;
	productName?: string;
	quantity: number;
    // TODO unit of measurement types
    unitPrice: number;
    countBought: number;
}
