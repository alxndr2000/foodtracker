import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import weeksRouter from "./routes/weeks";

const app = express();
const PORT: string|number = process.env.PORT || 3000;

const MONGO_URL = "mongodb://192.168.0.69:27017"; // hardcoded local mongo for now
const DB_NAME = "foodtracker";

mongoose.connect(MONGO_URL + "/" + DB_NAME, {
});

// Middleware
app.use(express.json());
app.use(cors());


app.use("/v0/weeks", weeksRouter);

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
