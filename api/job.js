const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
// Place this before any route or middleware that needs to access `req.body`
router.use(express.json());

// Endpoint for receiving a POST request with a JSON body
router.post("/job", (req, res, next) => {
  try {
    console.log(req.body);

    // Create questions and answers
    const question1 = {
      question: "What is your greatest strength?",
      answer: "I am a quick learner and a great team player.",
      type: "input",
    };

    // Create another question and answer
    const question2 = {
      question: "Do you have experience with JavaScript?",
      answer: "Yes",
      type: "radio",
    };

    // Create a new job document
    const newJob = new Job({
      title: "Software Engineer 2",
      companyName: "Google",
      location: "Mountain View, CA",
      jobLink: "https://www.google.com",
      currentStatus: "Applied",
      notes: "Hoping to hear back soon!",
      isRemote: false,
      isHybrid: true,
      questions: [question1, question2],
    });

    // Save the document to the database

    newJob.save();
    console.log("Job document saved");
    res.send("Saved job document to database");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint for receiving a GET request to retrieve all job documents
router.get("/job", async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint for receiving a GET request to retrieve a single job document by ID
router.get("/job/:id", async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint for getting jobs by date applied
router.get("/job/date/:date", async (req, res, next) => {
  try {
    console.log("date", req.params.date);
    const date = new Date(req.params.date); // Assume format is YYYY-MM-DD
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const jobs = await Job.find({ dateApplied: { $gte: date, $lt: nextDay } });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
