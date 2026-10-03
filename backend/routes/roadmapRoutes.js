const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addRoadmapItem,
    getRoadmap
} = require("../controllers/roadmapController");

const router = express.Router();

router.post("/", protect, addRoadmapItem);

router.get("/", protect, getRoadmap);

module.exports = router;