
const mongoose = require("mongoose");

const userBiasProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  biasId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
  }
});

mongoose.model("user_bias_profiles", userBiasProfileSchema);

