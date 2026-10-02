
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
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

    return (
        <div>
            <h2>Profile</h2>

            {message && <p>{message}</p>}

            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>User ID: {user.id}</p>
                    <p>Joined: {user.created_at}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;

