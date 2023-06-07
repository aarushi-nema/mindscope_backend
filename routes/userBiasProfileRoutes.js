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

module.exports = router;