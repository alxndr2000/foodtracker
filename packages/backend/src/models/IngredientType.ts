import mongoose, { Schema } from "mongoose";
import { IIngredientType } from "@myorg/shared";

export const IngredientTypeSchema = new Schema<IIngredientType>({
	name: {
		type: String,
		required: true,
	},
	unit: { type: String, required: true },
});

// Normalize the ingredient name before saving
IngredientTypeSchema.pre("save", function (next) {
	if (this.name) {
		this.name = this.name.trim().toLowerCase();
	}
	if (this.unit) {
		this.unit = this.unit.trim();
	}
	next();
});

// Ensure the unique index is case-insensitive
IngredientTypeSchema.index(
	{ name: 1 },
	{ unique: true, collation: { locale: "en", strength: 2 } }
);

export const IngredientTypeModel = mongoose.model<IIngredientType>(
	"IngredientType",
	IngredientTypeSchema
);
