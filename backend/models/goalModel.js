const db = require("../config/db");

const createGoal = async (
    userId,
    title,
    description,
    targetDate
) => {
    const [result] = await db.execute(
        `INSERT INTO goals
        (user_id, title, description, target_date)
        VALUES (?, ?, ?, ?)`,
        [userId, title, description, targetDate]
    );

    return result;
};

const getGoalsByUserId = async (userId) => {
    const [rows] = await db.execute(
        "SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );

    return rows;
};

module.exports = {
    createGoal,
    getGoalsByUserId
};