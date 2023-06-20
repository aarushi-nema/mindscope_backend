const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserBiasProfile = mongoose.model("user_bias_profiles");

require("dotenv").config();

// fetch bias profile of a user
// http://localhost:3000/userbiasprofile?userId=U0001
router.get('/userbiasprofile', async (req, res) => {
    try {
        const {userId} = req.query;
        const userBiasProfile = await UserBiasProfile.find({userId});
        
        if(!userBiasProfile) {
            return res.status(404).json({error: 'User not found'})
        }

        res.json(userBiasProfile);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Fetch strengths of the user (biasName wth top 2 scores)
router.get('/userStrengths', async (req, res) => {
    try {
        const {userId} = req.query;
        const userStrengths = await UserBiasProfile.find({userId}).sort({ score: 1 }).limit(2);
        const userStrengthsObj = {
        resources: userStrengths
        }
        res.json(userStrengthsObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Fetch strengths of the user (biasName wth top 2 scores)
router.get('/userWeakness', async (req, res) => {
    try {
        const {userId} = req.query;
        const userWeakness = await UserBiasProfile.find({userId}).sort({ score: -1 }).limit(2);
        const userWeaknessObj = {
        resources: userWeakness
        }
        res.json(userWeaknessObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Fetch 

module.exports = router;