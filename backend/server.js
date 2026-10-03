const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const goalRoutes = require("./routes/goalRoutes");
const skillRoutes = require("./routes/skillRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/roadmap", roadmapRoutes);
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