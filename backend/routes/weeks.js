const express = require("express");
const router = express.Router();
const Week = require("../models/Week.js");

// Get all weeks
router.get("/", async (req, res) => {
	try {
		const weeks = await Week.find({}).lean();
		res.json(weeks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get a specific week
router.get("/:id", async (req, res) => {
	try {
		const week = await Week.findById(req.params.id).lean();
		if (!week) {
			return res.status(404).json({ error: "Week not found" });
		}
		res.json(week);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Create a new week
router.post("/", async (req, res) => {
	try {
		const newWeek = new Week(req.body);
		const savedWeek = await newWeek.save();
		res.status(201).json(savedWeek);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Update an existing week by ID
router.put("/:id", async (req, res) => {
	try {
		const updatedWeek = await Week.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updatedWeek) {
			return res.status(404).json({ error: "Week not found" });
		}
		res.json(updatedWeek);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete a week by ID
router.delete("/:id", async (req, res) => {
	try {
		const deletedWeek = await Week.findByIdAndDelete(req.params.id);
		if (!deletedWeek) {
			return res.status(404).json({ error: "Week not found" });
		}
		res.json({ message: "Week deleted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Add a new meal to a week by week ID
router.put("/:id/meals", async (req, res) => {
	try {
		const meal = req.body;
		const updatedWeek = await Week.findByIdAndUpdate(
			req.params.id,
			{ $push: { meals: meal } },
			{ new: true, runValidators: true }
		);
		if (!updatedWeek) {
			return res.status(404).json({ error: "Week not found" });
		}
		res.json(updatedWeek);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete a specific meal from a week by meal _id
router.delete("/:weekId/meals/:mealId", async (req, res) => {
	try {
		const { weekId, mealId } = req.params;
		const updatedWeek = await Week.findByIdAndUpdate(
			weekId,
			{ $pull: { meals: { _id: mealId } } },
			{ new: true }
		);
		if (!updatedWeek) {
			return res.status(404).json({ error: "Week not found" });
		}
		res.json(updatedWeek);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
