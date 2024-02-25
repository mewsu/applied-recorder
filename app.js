const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const jobRoutes = require("./api/job");
// Connect to MongoDB
// Replace the URI string with your MongoDB connection string.
const mongoURI = "mongodb://127.0.0.1:27017/applied-db";

mongoose
  .connect(mongoURI, { useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const port = 3000;

// Use Morgan with the 'dev' predefined format for logging
app.use(morgan("dev"));

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", jobRoutes);

// And finally, error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
