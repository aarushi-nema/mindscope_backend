const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Journal = mongoose.model("journals");

require("dotenv").config();

// Get journals of a specific user
// http://localhost:3000/journals?userId=U0002
router.get("/userjournals", async (req, res) => {
  try {
    const { userId } = req.query;
    const userJournals = await Journal.find({ userId });

    if (!userJournals) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userJournals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get journal by id
router.get("/journal", async (req, res) => {
    try {
        const {journalId} = req.query;
        const journal = await Journal.findOne({journalId});

        if(!journal){
            return res.status(404).json({error: "Journal not found"});
        }

        res.json(journal);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router;
