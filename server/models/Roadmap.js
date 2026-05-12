const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  niche: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  suggestions: [{ type: String }], 
  days: [{
    dayNumber: Number,
    title: String,
    hook: String,
    script: String,
    cameraAngle: String,
    completed: { type: Boolean, default: false },
    // NAYA SECTION: Har din ke liye 4 shots ka storyboard
    visuals: [{
      shotType: { type: String },      // e.g., "Close Up", "Drone Shot"
      description: { type: String },   // e.g., "Sweat dripping from the forehead"
      imagePrompt: { type: String }    // AI image generation ke liye details
    }]
  }]
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);