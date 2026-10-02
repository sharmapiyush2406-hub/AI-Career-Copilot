
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("Loading...");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                    setMessage("");
                } else {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.error(error);
                setMessage("Failed to load profile");
            });
    }, [navigate]);

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
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>User ID: {user.id}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;

