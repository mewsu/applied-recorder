// Define Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = require("./question");
const jobSchema = new Schema({
  title: String, // SchemaTypes are implicitly inferred
  dateApplied: { type: Date, default: Date.now },
  companyName: String,
  location: String,
  jobLink: String,
  currentStatus: String,
  notes: String,
  isRemote: Boolean,
  isHybrid: Boolean,
  questions: [questionSchema],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
