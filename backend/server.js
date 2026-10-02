const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("AI Career Copilot Backend is running! 🚀");
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "AI Career Copilot API is working!"
    });
});

db.query("SELECT 1")
    .then(() => {
        console.log("MySQL connected successfully! ✅");
    })
    .catch((err) => {
        console.error("MySQL connection failed:", err.message);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});