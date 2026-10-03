const {
    createSkill,
    getSkillsByUserId
} = require("../models/skillModel");

const addSkill = async (req, res) => {
    try {
        const { name, progress = 0 } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Skill name is required"
            });
        }

        if (progress < 0 || progress > 100) {
            return res.status(400).json({
                success: false,
                message: "Progress must be between 0 and 100"
            });
        }

        const result = await createSkill(
            req.user.userId,
            name,
            progress
        );

        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            skillId: result.insertId
        });

    } catch (error) {
        console.error("Add skill error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getSkills = async (req, res) => {
    try {
        const skills = await getSkillsByUserId(req.user.userId);

        res.json({
            success: true,
            skills
        });

    } catch (error) {
        console.error("Get skills error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    addSkill,
    getSkills
};