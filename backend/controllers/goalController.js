const {
    createGoal,
    getGoalsByUserId
} = require("../models/goalModel");

const addGoal = async (req, res) => {
    try {
        const { title, description, targetDate } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Goal title is required"
            });
        }

        const result = await createGoal(
            req.user.userId,
            title,
            description,
            targetDate
        );

        res.status(201).json({
            success: true,
            message: "Goal created successfully",
            goalId: result.insertId
        });

    } catch (error) {
        console.error("Add goal error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getGoals = async (req, res) => {
    try {
        const goals = await getGoalsByUserId(req.user.userId);

        res.json({
            success: true,
            goals
        });

    } catch (error) {
        console.error("Get goals error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    addGoal,
    getGoals
};