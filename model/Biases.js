const mongoose = require("mongoose");

const biasSchema = new mongoose.Schema({
  biasId: {
    type: String,
    required: true,
  },
  biasName: {
    type: String,
    required: true
  }
});

mongoose.model("biases", biasSchema);

