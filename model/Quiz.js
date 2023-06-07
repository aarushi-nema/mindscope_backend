const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true,
  },
  quizName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  numViews: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true
  }
});

mongoose.model("quizes", quizSchema);

