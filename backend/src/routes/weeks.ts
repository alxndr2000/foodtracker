import express, { Request, Response } from "express";
import Week, { IWeek, IMeal } from "../models/week";

const router = express.Router();

// Get all weeks
router.get("/", async (_req: Request, res: Response) => {
  try {
    const weeks = await Week.find({}).lean();
    res.json(weeks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific week
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const week = await Week.findById(req.params.id).lean();
    if (!week) {
      return res.status(404).json({ error: "Week not found" });
    }
    res.json(week);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new week
router.post("/", async (req: Request, res: Response) => {
  try {
    const newWeek = new Week(req.body as IWeek);
    const savedWeek = await newWeek.save();
    res.status(201).json(savedWeek);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update an existing week by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedWeek = await Week.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWeek) {
      return res.status(404).json({ error: "Week not found" });
    }
    res.json(updatedWeek);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a week by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedWeek = await Week.findByIdAndDelete(req.params.id);
    if (!deletedWeek) {
      return res.status(404).json({ error: "Week not found" });
    }
    res.json({ message: "Week deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new meal to a week by week ID
router.put("/:id/meals", async (req: Request, res: Response) => {
  try {
    const meal = req.body as IMeal;
    const updatedWeek = await Week.findByIdAndUpdate(
      req.params.id,
      { $push: { meals: meal } },
      { new: true, runValidators: true }
    );
    if (!updatedWeek) {
      return res.status(404).json({ error: "Week not found" });
    }
    res.json(updatedWeek);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a specific meal from a week by meal _id
router.delete("/:weekId/meals/:mealId", async (req: Request, res: Response) => {
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
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;