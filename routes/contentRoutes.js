const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Content = mongoose.model("learning_contents");

require("dotenv").config();

// Fetch content to display on the home page
router.get("/latest_content", async (req, res) => {
  try {
    const content = await Content.find().sort({ datePublished: -1 }).limit(5);
    const contentObj = {
      resources: content,
    };
    res.json(contentObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch article by contentId
// http://localhost:3000/articles?contentId=C0002
router.get("/articles", async (req, res) => {
  try {
    const { contentId } = req.query;
    const article = await Content.findOne({ contentId });

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bias Basics
router.get("/bias_basics_articles", async (req, res) => {
  try {
    const articles = await Content.find({
      category: "Bias Basics",
      type: "article",
    });
    const articleObj = {
      resources: articles,
    };
    res.json(articleObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Top 10 popular articles
router.get("/popular_articles", async (req, res) => {
  try {
    const popularArticles = await Content.find({ type: "Article" })
      .sort({ numViews: -1 })
      .limit(10);
    const popularArticlesObj = {
      resources: popularArticles,
    };
    res.json(popularArticlesObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommended articles

// Articles sorted latest to oldest by published date
router.get("/latest_articles", async (req, res) => {
  try {
    const articles = await Content.find({ type: "Article" }).sort({
      datePublished: -1,
    });
    const articleObj = {
      resources: articles,
    };
    res.json(articleObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search for a particular article based on title search
router.get("/search_article", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    // Use a regular expression to perform a case-insensitive search for articles containing the search term in the title
    const searched_articles = await Content.find({
      title: { $regex: searchTerm, $options: "i" }    
    });

    res.json(searched_articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Top 10 popular videos
router.get("/popular_videos", async (req, res) => {
  try {
    const popularVideos = await Content.find({ type: "Video" })
      .sort({ numViews: -1 })
      .limit(10);
    const popularVideosObj = {
      resources: popularVideos,
    };
    res.json(popularVideosObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommended videos

// Videos sorted latest to oldest by published date
router.get("/latest_videos", async (req, res) => {
  try {
    const articles = await Content.find({ type: "article" }).sort({
      datePublished: -1,
    });
    const articleObj = {
      resources: articles,
    };
    res.json(articleObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Top 10 popular case studies
router.get("/popular_videos", async (req, res) => {
  try {
    const articles = await Content.find({ type: "case_study" })
      .sort({ numViews: -1 })
      .limit(10);
    const articleObj = {
      resources: articles,
    };
    res.json(articleObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommended case studies

// Case studies sorted latest to oldest by published date
router.get("/latest_articles", async (req, res) => {
  try {
    const articles = await Content.find({ type: "case_study" }).sort({
      datePublished: -1,
    });
    const articleObj = {
      resources: articles,
    };
    res.json(articleObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
