const Roadmap = require('../models/Roadmap');
const { conductResearch } = require('../utils/researcher'); 
const { generateRoadmap, generateVisualHooks } = require('../utils/aiGenerator');

// 1. GET MY ROADMAP
exports.getMyRoadmap = async (req, res) => {
  try {
    // FIX: req.user.id use karo auth middleware se
    const roadmap = await Roadmap.findOne({ user: req.user.id }).sort({ startDate: -1 });
    res.json(roadmap);
  } catch (err) {
    console.error("GET_ROADMAP_ERROR:", err);
    res.status(500).json({ error: "Failed to fetch roadmap" });
  }
};

// 2. CREATE ROADMAP
exports.createRoadmap = async (req, res) => {
  try {
    const { niche } = req.body;
    const researchData = await conductResearch(niche);
    
    // Last roadmap dhundo evolution logic ke liye
    const lastRoadmap = await Roadmap.findOne({ user: req.user.id }).sort({ startDate: -1 });
    
    let isEvolution = false, previousTitles = [], startDay = 1;
    
    // Agar picli mission poori ho gayi hai toh evolution trigger karo
    if (lastRoadmap && lastRoadmap.days.every(d => d.completed)) {
      isEvolution = true;
      previousTitles = lastRoadmap.days.map(d => d.title);
      startDay = Math.max(...lastRoadmap.days.map(d => d.dayNumber)) + 1;
    }

    const aiOutput = await generateRoadmap(niche, isEvolution, previousTitles, researchData);
    
    const processedDays = aiOutput.days.map((day, index) => ({
      ...day, 
      dayNumber: startDay + index, 
      completed: false 
    }));

    const newRoadmap = new Roadmap({
      user: req.user.id, 
      niche, 
      days: processedDays, 
      suggestions: aiOutput.nextSuggestions || []
    });

    await newRoadmap.save();
    res.status(201).json(newRoadmap);
  } catch (error) {
    console.error("CREATE_ROADMAP_ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// 3. VIRAL ARCHITECT CONTROLLER
exports.getHookArchitect = async (req, res) => {
  try {
    const { dayData } = req.body; 

    if (!dayData) {
      return res.status(400).json({ error: "No mission data provided." });
    }

    const visualIntelligence = await generateVisualHooks(dayData);
    
    if (!visualIntelligence) {
      return res.status(500).json({ error: "AI failed to generate visual intelligence." });
    }

    res.json(visualIntelligence);
  } catch (error) {
    console.error("ARCHITECT CONTROLLER ERROR:", error);
    res.status(500).json({ error: "Internal system failure." });
  }
};

// 4. TOGGLE DAY STATUS (THE TICK FIX ✅)
exports.toggleDay = async (req, res) => {
  try {
    // 1. Roadmap fetch karo correct user id ke saath
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!roadmap) {
      return res.status(404).json({ error: "Mission not found or unauthorized." });
    }

    // 2. Correct dayNumber se day target karo
    const day = roadmap.days.find(d => d.dayNumber === req.body.dayNumber);
    
    if (!day) {
      return res.status(400).json({ error: "Invalid Day Number." });
    }

    // 3. Status Flip
    day.completed = !day.completed;

    // 4. CRITICAL FIX: Mongoose ko batana padta hai array change hua hai
    roadmap.markModified('days'); 
    
    await roadmap.save();
    
    // 5. Updated Roadmap return karo taaki frontend sync ho jaye
    res.json(roadmap);
  } catch (error) { 
    console.error("TOGGLE_DAY_ERROR:", error);
    res.status(500).json({ error: error.message }); 
  }
};

// 5. UPDATE SCRIPT
exports.updateScript = async (req, res) => {
  try {
    // Update and return the NEW document
    const updated = await Roadmap.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, "days.dayNumber": req.body.dayNumber },
      { $set: { "days.$.script": req.body.newScript } },
      { new: true } // returnDocument: 'after' is same as new: true
    );

    if (!updated) {
      return res.status(404).json({ error: "Could not find day to update." });
    }

    res.json(updated);
  } catch (error) { 
    console.error("UPDATE_SCRIPT_ERROR:", error);
    res.status(500).json({ error: "Update failed." }); 
  }
};