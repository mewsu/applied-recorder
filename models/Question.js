// Model for question
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  answer: String,
  type: {
    type: String,
    required: true,
    enum: {
      values: ["input", "select", "radio", "checkbox"],
      message: "{VALUE} is not a valid question type",
    },
  },
});

module.exports = questionSchema;
