import express, { Request, Response } from "express";
import { IngredientTypeModel } from "../models/IngredientType";
import { IIngredientType } from "@myorg/shared";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const days = await IngredientTypeModel.find({}).lean();
        res.json(days);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/new", async (req: Request, res: Response) => {
	try {
		const ingredientData = req.body as IIngredientType;

		if (!ingredientData.name || !ingredientData.unit) {
			return res.status(400).json({ error: "Missing name or unit field" });
		}

		// Normalize before querying (so checks are case-insensitive)
		const normalizedName = ingredientData.name.trim().toLowerCase();

		const existing = await IngredientTypeModel.findOne({
			name: normalizedName,
		}).collation({ locale: "en", strength: 2 });

		if (existing) {
			return res.status(409).json({ error: "Ingredient name already exists" });
		}

		const newIngredient = new IngredientTypeModel({
			name: normalizedName,
			unit: ingredientData.unit.trim(),
		});
		await newIngredient.save();

		res.status(201).json(newIngredient);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		if (err.code === 11000) {
			return res.status(409).json({ error: "Ingredient name already exists" });
		}
		console.error("Error creating ingredient:", err);
		res.status(500).json({ error: err.message });
	}
});

export default router;