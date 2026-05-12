const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');
const auth = require('../middleware/auth');
const { generateRoadmap } = require('../utils/aiGenerator');

// 1. GET: Fetch latest roadmap
router.get('/my-roadmap', auth, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ user: req.user }).sort({ startDate: -1 });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch roadmap" });
  }
});

// 2. POST: Generate with Suggestions
router.post('/generate', auth, async (req, res) => {
  try {
    const { niche } = req.body;
    if (!niche) return res.status(400).json({ error: "Niche is required" });

    const lastRoadmap = await Roadmap.findOne({ user: req.user }).sort({ startDate: -1 });
    
    let isEvolution = false;
    let previousTitles = [];
    let startDay = 1;

    if (lastRoadmap && lastRoadmap.days.every(d => d.completed)) {
      isEvolution = true;
      previousTitles = lastRoadmap.days.map(d => d.title);
      const maxDay = Math.max(...lastRoadmap.days.map(d => d.dayNumber));
      startDay = maxDay + 1;
    }

    const aiOutput = await generateRoadmap(niche, isEvolution, previousTitles);
    
    if (!aiOutput || !Array.isArray(aiOutput.days)) {
      throw new Error("AI output format is invalid.");
    }

    const processedDays = aiOutput.days.map((day, index) => ({
      ...day,
      dayNumber: startDay + index,
      completed: false 
    }));

    // Post route ke andar aiOutput handle karne wala part:
const newRoadmap = new Roadmap({
  user: req.user,
  niche,
  days: processedDays,
  suggestions: aiOutput.nextSuggestions || [] // Syncing with aiGenerator key
});
    await newRoadmap.save();
    res.status(201).json(newRoadmap);
  } catch (error) {
    console.error("ROUTE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 3. PATCH: Toggle Day
router.patch('/:id/check-day', auth, async (req, res) => {
  try {
    const { dayNumber } = req.body;
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user });
    if (!roadmap) return res.status(404).json({ error: "Not found" });

    const day = roadmap.days.find(d => d.dayNumber === dayNumber);
    if (day) day.completed = !day.completed;

    await roadmap.save();
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. PATCH: Update specific day script (Warning Fixed)
router.patch('/:id/update-script', auth, async (req, res) => {
  try {
    const { dayNumber, newScript } = req.body;
    const roadmapId = req.params.id;

    const updatedRoadmap = await Roadmap.findOneAndUpdate(
      { 
        _id: roadmapId, 
        user: req.user, 
        "days.dayNumber": dayNumber 
      },
      { 
        $set: { "days.$.script": newScript } 
      },
      { returnDocument: 'after' } // Fixes the Mongoose warning
    );

    if (!updatedRoadmap) {
      return res.status(404).json({ error: "Mission Data not found." });
    }

    res.json(updatedRoadmap);
  } catch (error) {
    console.error("BACKEND SYNC ERROR:", error);
    res.status(500).json({ error: "Internal Server Error during sync." });
  }
});

module.exports = router;