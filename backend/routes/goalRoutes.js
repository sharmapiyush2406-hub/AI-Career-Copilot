const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addGoal,
    getGoals
} = require("../controllers/goalController");

const router = express.Router();

router.post("/", protect, addGoal);

router.get("/", protect, getGoals);

module.exports = router;