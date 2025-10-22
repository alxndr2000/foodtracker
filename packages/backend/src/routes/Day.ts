import express, { Request, Response } from "express";
import { DayModel } from "../models/Day";

const router = express.Router();

// Get all days
router.get("/", async (_req: Request, res: Response) => {
  try {
    const days = await DayModel.find({}).lean();
    res.json(days);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific day by ID
router.get("/id/:id", async (req: Request, res: Response) => {
  try {
    const day = await DayModel.findById(req.params.id).lean();
    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }
    res.json(day);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get a specific day by date
router.get("/date/:date", async (req: Request, res: Response) => {
  try {
    const { date: dateParam } = req.params;

    if (!dateParam) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const day = await DayModel.findOne({ date }).lean();
    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }

    res.json(day);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new day
router.post("/", async (req: Request, res: Response) => {
  try {
    const { date, meals } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const existingDay = await DayModel.findOne({ date });
    if (existingDay) {
      return res.status(409).json({ error: "Day already exists for this date" });
    }

    const newDay = new DayModel({ date, meals });
    const saved = await newDay.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update a day by ID
router.put("/id/:id", async (req: Request, res: Response) => {
  try {
    const updated = await DayModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ error: "Day not found" });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a day by ID
router.delete("/id/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await DayModel.findByIdAndDelete(req.params.id).lean();

    if (!deleted) {
      return res.status(404).json({ error: "Day not found" });
    }

    res.json({ message: "Day deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
