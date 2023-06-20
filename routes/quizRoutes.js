const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quiz = mongoose.model("toolkits");

require("dotenv").config();

// Top 5 popular toolkits
router.get("/popular_toolkits", async (req, res) => {
  try {
    const toolkits = await Quiz.find({ type: "toolkit" })
      .sort({ numViews: -1 })
      .limit(5);
    const toolkitObj = {
      resources: toolkits,
    };
    res.json(toolkitObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch a quiz object
//http://localhost:3000/quiz?quizId=Q0001
router.get('/quiz', async (req, res) => {
  try {
      const {quizId} = req.query;
      const quiz = await Quiz.findOne({quizId});
      
      if(!quiz) {
          return res.status(404).json({error: 'Quiz not found'})
      }

      res.json(quiz);
  } catch (error) {
      res.status(500).json({error: error.message})
  }
});

// Fetch a list of questions of a particular quiz
router.get('/quizquestions', async(req, res) => {
  try {
    const {quizId} = req.query;
    const quiz = await Quiz.findOne({quizId});
    const questions = quiz.questions.map(question => question.question);
    res.json(questions);
  }catch (error) {
    res.status(500).json({error: error.message})
}
})

//Fetch the options of a particular quiz
router.get('/quizoptions', async(req, res) => {
  try {
    const {quizId} = req.query;
    const quiz = await Quiz.findOne({quizId});
    const options = quiz.questions.map(options => options.options);
    res.json(options)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


module.exports = router;
