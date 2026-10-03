const db = require("../config/db");

const createSkill = async (userId, name, progress = 0) => {
    const status =
        progress === 100
            ? "completed"
            : progress > 0
            ? "in_progress"
            : "not_started";

    const [result] = await db.execute(
        `INSERT INTO skills
        (user_id, name, progress, status)
        VALUES (?, ?, ?, ?)`,
        [userId, name, progress, status]
    );

    return result;
};

const getSkillsByUserId = async (userId) => {
    const [rows] = await db.execute(
        "SELECT * FROM skills WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );

    return rows;
};

module.exports = {
    createSkill,
    getSkillsByUserId
};