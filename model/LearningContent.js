const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const learningContentSchema = new mongoose.Schema({
  contentId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  datePublished: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  numViews: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  }
});

mongoose.model("learning_contents", learningContentSchema);

