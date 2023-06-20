const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [{
    text: String,
    score: Number,
    strategyText: String,
    feedbackText: String
  }]
});

const quizSchema = new mongoose.Schema({    
  _id: String,
  quizId: String,
  quizName: String,
  description: String,
  category: String,
  type: String,
  numViews: Number,
  img: String,
  questions: [questionSchema]
});

mongoose.model("toolkits", quizSchema);

