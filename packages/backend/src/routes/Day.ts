import express, { Request, Response } from "express";
import { DayModel } from "../models/Day";
import { IMeal, IMealIngredient } from "@myorg/shared";
import {
	normalizeDate,
	normalizeToUTC,
} from "@myorg/shared/src/util/DateUtils";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const days = await DayModel.find({}).lean();
		res.json(days);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
});

// Get a specific day by date
router.get("/date/:date", async (req: Request, res: Response) => {
	try {
		const { date: dateParam } = req.params;
		if (!dateParam) {
			return res
				.status(400)
				.json({ error: "Date parameter is required" });
		}

		const dateUTC = normalizeToUTC(new Date(dateParam));

		if (isNaN(dateUTC.getTime())) {
			return res.status(400).json({ error: "Invalid date format" });
		}

		const day = await DayModel.findOne({ date: dateUTC }).lean();
		console.log("got ", dateParam);
		if (!day) {
			return res.json({ empty: true });
		}
		res.json(day);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

// add a meal to a day, create the day if it doesn't exist
router.post("/date/:date/newmeal", async (req, res) => {
	try {
		const { date: dateParam } = req.params;
		if (!dateParam)
			return res
				.status(400)
				.json({ error: "Date parameter is required" });

		const date = normalizeDate(new Date(dateParam));
		if (isNaN(date.getTime()))
			return res.status(400).json({ error: "Invalid date format" });

		const newMeal: IMeal = { name: "New Meal", ingredients: [] };
		const dateUTC = normalizeToUTC(new Date(dateParam));
		console.log("added", dateUTC, dateParam);
		const updatedDay = await DayModel.findOneAndUpdate(
			{ date: dateUTC },
			{ $push: { meals: newMeal } },
			{ new: true, upsert: true }
		).lean();

		res.json(updatedDay);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

// add ingredient to meal by date and mealid

router.post("/date/:date/:meal/", async (req, res) => {
	try {
		const { date: dateParam, meal: mealId } = req.params;
		const ingredientData = req.body as IMealIngredient;

		if (!dateParam)
			return res
				.status(400)
				.json({ error: "Date parameter is required" });

		if (!mealId)
			return res
				.status(400)
				.json({ error: "Meal ID parameter is required" });

		const date = normalizeDate(new Date(dateParam));
		if (isNaN(date.getTime()))
			return res.status(400).json({ error: "Invalid date format" });

		const dateUTC = normalizeToUTC(new Date(dateParam));

		// Log input for debugging
		console.log(
			"Adding ingredient",
			ingredientData,
			"to",
			mealId,
			"on",
			dateParam
		);

		// Update: find the Day by date, and push the new ingredient into the correct meal
		const updatedDay = await DayModel.findOneAndUpdate(
			{
				date: dateUTC,
				"meals._id": mealId, // find the correct meal within that day
			},
			{
				$push: { "meals.$.ingredients": ingredientData },
			},
			{
				new: true, // return updated doc
				upsert: true, // create if not exists
			}
		).lean();

		if (!updatedDay)
			return res.status(404).json({ error: "Day or meal not found" });

		res.json(updatedDay);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

// remove meal by id from date
router.delete("/date/:date/:meal", async (req, res) => {
	try {
		const { date: dateParam, meal: mealId } = req.params;

		if (!dateParam) {
			return res
				.status(400)
				.json({ error: "Date parameter is required" });
		}

		if (!mealId) {
			return res.status(400).json({ error: "ID parameter is required" });
		}

		const date = normalizeDate(new Date(dateParam));
		if (isNaN(date.getTime()))
			return res.status(400).json({ error: "Invalid date format" });

		const dateUTC = normalizeToUTC(new Date(dateParam));
		console.log("removed meal", mealId, "on", dateParam);
		const updatedDay = await DayModel.updateOne(
			{ date: dateUTC },
			{ $pull: { meals: { _id: mealId } } }
		).lean();

		res.json(updatedDay);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

export default router;
