const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bias = mongoose.model("biases")

require('dotenv').config();

// Fetch content to display on the home page
router.get('/biases', async (req, res) => {
    try {
        const biases = await Bias.find();
        const biasObj = {
        resources: biases
        }
        res.json(biasObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router