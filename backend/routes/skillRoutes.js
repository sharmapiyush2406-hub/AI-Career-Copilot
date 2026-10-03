const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addSkill,
    getSkills
} = require("../controllers/skillController");

const router = express.Router();

router.post("/", protect, addSkill);

router.get("/", protect, getSkills);

module.exports = router;