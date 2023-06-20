const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  journalId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  journalText: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});

mongoose.model("journals", journalSchema);

