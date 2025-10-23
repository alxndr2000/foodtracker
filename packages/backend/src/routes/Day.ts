import express, { Request, Response } from "express";
import { DayModel } from "../models/Day";
import { IMeal } from "@myorg/shared";
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
		console.log("got ", dateUTC, dateParam);
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

router.delete("/date/:date/:id", async (req, res) => {
	try {
		const { date: dateParam, id: mealId } = req.params;

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
		console.log("removed", dateUTC, dateParam);
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
