const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Content = mongoose.model("learning_contents")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

require('dotenv').config();

// Fetch content to display on the home page
router.get('/latest_content', async (req, res) => {
    try {
        const articles = await Content.find().sort({ datePublished: -1 }).limit(5);
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch article by contentId
// http://localhost:3000/articles?contentId=C0002
router.get('/articles', async (req, res) => {
    try {
      const { contentId } = req.query;
      const article = await Content.findOne({ contentId });
  
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Bias Basics
router.get('/bias_basics_articles', async (req, res) => {
    try {
        const articles = await Content.find({category:"Bias Basics", type: "article"});
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Top 10 popular articles
router.get('/popular_articles', async (req, res) => {
    try {
        const articles = await Content.find({type:"article"}).sort({ numViews: -1 }).limit(10);
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Recommended articles

// Articles sorted latest to oldest by published date
router.get('/latest_articles', async (req, res) => {
    try {
        const articles = await Content.find({type:"article"}).sort({ datePublished: -1 });
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Top 10 popular videos
router.get('/popular_videos', async (req, res) => {
    try {
        const articles = await Content.find({type:"video"}).sort({ numViews: -1 }).limit(10);
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Recommended videos

// Videos sorted latest to oldest by published date
router.get('/latest_videos', async (req, res) => {
    try {
        const articles = await Content.find({type:"article"}).sort({ datePublished: -1 });
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Top 10 popular case studies
router.get('/popular_videos', async (req, res) => {
    try {
        const articles = await Content.find({type:"case_study"}).sort({ numViews: -1 }).limit(10);
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Recommended case studies

// Case studies sorted latest to oldest by published date
router.get('/latest_articles', async (req, res) => {
    try {
        const articles = await Content.find({type:"case_study"}).sort({ datePublished: -1 });
        const articleObj = {
        resources: articles
        }
        res.json(articleObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router