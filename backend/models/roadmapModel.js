const db = require("../config/db");

const createRoadmapItem = async (
    userId,
    title,
    description,
    phase
) => {
    const [result] = await db.execute(
        `INSERT INTO roadmap
        (user_id, title, description, phase)
        VALUES (?, ?, ?, ?)`,
        [userId, title, description, phase]
    );

    return result;
};

const getRoadmapByUserId = async (userId) => {
    const [rows] = await db.execute(
        `SELECT * FROM roadmap
        WHERE user_id = ?
        ORDER BY phase ASC, created_at ASC`,
        [userId]
    );

    return rows;
};

module.exports = {
    createRoadmapItem,
    getRoadmapByUserId
};