const express = require("express");
const protect = require("../middleware/authMiddleware");
const { findUserById } = require("../models/userModel");

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try {
        const user = await findUserById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Profile error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;