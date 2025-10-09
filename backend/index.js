const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URL = "mongodb://192.168.0.69:27017"; // hardcoded local mongo for now
const DB_NAME = "foodtracker";

mongoose.connect(MONGO_URL + "/" + DB_NAME, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors());

const weeksRouter = require("./routes/weeks.js");
app.use("/v0/weeks", weeksRouter);

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
