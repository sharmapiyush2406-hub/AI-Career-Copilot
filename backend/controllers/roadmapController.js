const {
    createRoadmapItem,
    getRoadmapByUserId
} = require("../models/roadmapModel");

const addRoadmapItem = async (req, res) => {
    try {
        const {
            title,
            description,
            phase = 1
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Roadmap title is required"
            });
        }

        if (phase < 1) {
            return res.status(400).json({
                success: false,
                message: "Phase must be at least 1"
            });
        }

        const result = await createRoadmapItem(
            req.user.userId,
            title,
            description,
            phase
        );

        res.status(201).json({
            success: true,
            message: "Roadmap item created successfully",
            roadmapId: result.insertId
        });

    } catch (error) {
        console.error(
            "Add roadmap item error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getRoadmap = async (req, res) => {
    try {
        const roadmap = await getRoadmapByUserId(
            req.user.userId
        );

        res.json({
            success: true,
            roadmap
        });

    } catch (error) {
        console.error(
            "Get roadmap error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    addRoadmapItem,
    getRoadmap
};