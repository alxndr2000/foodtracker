import { IProductPurchase } from "@myorg/shared";
import mongoose, { Schema } from "mongoose";


export const ProductPurchaseSchema = new Schema<IProductPurchase>({
  ingredientTypeID: { type: Schema.Types.ObjectId, ref: "IngredientType", required: true },
  purchaseDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  productName: { type: String },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  countBought: { type: Number, required: true },
});

export const ProductPurchaseModel = mongoose.model<IProductPurchase>("ProductPurchase", ProductPurchaseSchema);