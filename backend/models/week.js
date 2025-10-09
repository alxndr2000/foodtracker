const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
	weekday: Number,
	mealid: Number,
});

const WeekSchema = new mongoose.Schema({
  dateRange: String,
	meals: [MealSchema],
});

module.exports = mongoose.model("Week", WeekSchema);
