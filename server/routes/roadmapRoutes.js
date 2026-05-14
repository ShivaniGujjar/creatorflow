const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roadmapController = require('../controllers/roadmapController');

// Standard Routes
router.get('/my-roadmap', auth, roadmapController.getMyRoadmap);
router.post('/generate', auth, roadmapController.createRoadmap);
router.patch('/:id/check-day', auth, roadmapController.toggleDay);
router.patch('/:id/update-script', auth, roadmapController.updateScript);

// --- FEATURE 1: VIRAL ARCHITECT ENDPOINT (MISSING PIECE) ✅ ---
router.post('/architect-hooks', auth, roadmapController.getHookArchitect);

module.exports = router;