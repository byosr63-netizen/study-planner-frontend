import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    } catch (error) {
        console.error(error);
    }
};
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to Study Planner!</p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;