import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import weeksRouter from "./routes/Day";

const app = express();
const PORT: string|number = process.env.PORT || 3000;

const MONGO_URL = "mongodb://192.168.0.69:27017"; // hardcoded local mongo for now
const DB_NAME = "foodtracker_6"; // just add one every time you want to reset the db XD

mongoose.connect(MONGO_URL + "/" + DB_NAME, {
});

// Middleware
app.use(express.json());
app.use(cors());


app.use("/v1/day", weeksRouter);

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
