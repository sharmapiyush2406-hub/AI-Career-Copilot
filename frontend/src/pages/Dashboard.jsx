import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [goals, setGoals] = useState([]);
    const [skills, setSkills] = useState([]);
    const [roadmap, setRoadmap] = useState([]);
    const [message, setMessage] = useState("Loading...");

    const [goalTitle, setGoalTitle] = useState("");
    const [goalDescription, setGoalDescription] = useState("");
    const [goalDate, setGoalDate] = useState("");

    const [skillName, setSkillName] = useState("");
    const [skillProgress, setSkillProgress] = useState(0);

    const [roadmapTitle, setRoadmapTitle] = useState("");
    const [roadmapDescription, setRoadmapDescription] = useState("");
    const [roadmapPhase, setRoadmapPhase] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchDashboardData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const [
                    profileResponse,
                    goalsResponse,
                    skillsResponse,
                    roadmapResponse
                ] = await Promise.all([
                    fetch("http://localhost:5000/api/profile", {
                        headers
                    }),
                    fetch("http://localhost:5000/api/goals", {
                        headers
                    }),
                    fetch("http://localhost:5000/api/skills", {
                        headers
                    }),
                    fetch("http://localhost:5000/api/roadmap", {
                        headers
                    })
                ]);

                const profileData = await profileResponse.json();
                const goalsData = await goalsResponse.json();
                const skillsData = await skillsResponse.json();
                const roadmapData = await roadmapResponse.json();

                if (!profileData.success) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                setUser(profileData.user);
                setGoals(goalsData.goals || []);
                setSkills(skillsData.skills || []);
                setRoadmap(roadmapData.roadmap || []);

                setMessage("");

            } catch (error) {
                console.error(error);
                setMessage("Failed to load dashboard");
            }
        };

        fetchDashboardData();

    }, [navigate]);

    const handleAddGoal = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/goals",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: goalTitle,
                        description: goalDescription,
                        targetDate: goalDate
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setGoals((previousGoals) => [
                    {
                        id: data.goalId,
                        title: goalTitle,
                        description: goalDescription,
                        target_date: goalDate,
                        status: "not_started"
                    },
                    ...previousGoals
                ]);

                setGoalTitle("");
                setGoalDescription("");
                setGoalDate("");

                alert("Goal added successfully! ✅");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Failed to add goal");
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/skills",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: skillName,
                        progress: Number(skillProgress)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                let status = "not_started";

                if (skillProgress === 100) {
                    status = "completed";
                } else if (skillProgress > 0) {
                    status = "in_progress";
                }

                setSkills((previousSkills) => [
                    {
                        id: data.skillId,
                        name: skillName,
                        progress: Number(skillProgress),
                        status: status
                    },
                    ...previousSkills
                ]);

                setSkillName("");
                setSkillProgress(0);

                alert("Skill added successfully! ✅");

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Failed to add skill");
        }
    };

    const handleAddRoadmap = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/roadmap",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: roadmapTitle,
                        description: roadmapDescription,
                        phase: Number(roadmapPhase)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                setRoadmap((previousRoadmap) => [
                    ...previousRoadmap,
                    {
                        id: data.roadmapId,
                        title: roadmapTitle,
                        description: roadmapDescription,
                        phase: Number(roadmapPhase),
                        status: "not_started"
                    }
                ]);

                setRoadmapTitle("");
                setRoadmapDescription("");
                setRoadmapPhase(1);

                alert("Roadmap item added successfully! ✅");

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Failed to add roadmap item");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Dashboard</h2>

            <button onClick={() => navigate("/profile")}>
                View Profile
            </button>

            <button onClick={handleLogout}>
                Logout
            </button>

            {message && <p>{message}</p>}

            {user && (
                <div>
                    <h3>Welcome, {user.name} 👋</h3>
                    <p>Email: {user.email}</p>
                </div>
            )}

            <hr />

            <h3>Add New Goal</h3>

            <form onSubmit={handleAddGoal}>

                <input
                    type="text"
                    placeholder="Goal Title"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    required
                />

                <br /><br />

                <textarea
                    placeholder="Goal Description"
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="date"
                    value={goalDate}
                    onChange={(e) => setGoalDate(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Add Goal
                </button>

            </form>

            <hr />

            <h3>My Goals</h3>

            {goals.length === 0 ? (
                <p>No goals found.</p>
            ) : (
                goals.map((goal) => (
                    <div key={goal.id}>
                        <p>
                            <strong>{goal.title}</strong>
                        </p>

                        <p>{goal.description}</p>

                        <p>
                            Status: {goal.status}
                        </p>
                    </div>
                ))
            )}

            <hr />

            <h3>Add New Skill</h3>

            <form onSubmit={handleAddSkill}>

                <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Progress"
                    min="0"
                    max="100"
                    value={skillProgress}
                    onChange={(e) => setSkillProgress(e.target.value)}
                    required
                />

                <span> %</span>

                <br /><br />

                <button type="submit">
                    Add Skill
                </button>

            </form>

            <hr />

            <h3>My Skills</h3>

            {skills.length === 0 ? (
                <p>No skills found.</p>
            ) : (
                skills.map((skill) => (
                    <div key={skill.id}>
                        <p>
                            <strong>{skill.name}</strong>
                        </p>

                        <p>
                            Progress: {skill.progress}%
                        </p>

                        <p>
                            Status: {skill.status}
                        </p>
                    </div>
                ))
            )}

            <hr />

            <h3>Add Roadmap Item</h3>

            <form onSubmit={handleAddRoadmap}>

                <input
                    type="text"
                    placeholder="Roadmap Title"
                    value={roadmapTitle}
                    onChange={(e) => setRoadmapTitle(e.target.value)}
                    required
                />

                <br /><br />

                <textarea
                    placeholder="Roadmap Description"
                    value={roadmapDescription}
                    onChange={(e) => setRoadmapDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Phase"
                    min="1"
                    value={roadmapPhase}
                    onChange={(e) => setRoadmapPhase(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Add Roadmap Item
                </button>

            </form>

            <hr />

            <h3>My Roadmap</h3>

            {roadmap.length === 0 ? (
                <p>No roadmap items found.</p>
            ) : (
                roadmap.map((item) => (
                    <div key={item.id}>
                        <p>
                            <strong>
                                Phase {item.phase}: {item.title}
                            </strong>
                        </p>

                        <p>{item.description}</p>

                        <p>
                            Status: {item.status}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;