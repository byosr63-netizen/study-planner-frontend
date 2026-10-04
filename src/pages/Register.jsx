
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
    const [nom, setNom] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Supprimer les anciennes erreurs
        setErrors({});
        setSuccess("");

        const data = {
            nom,
            username,
            email,
            password
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            console.log(result);

            // Erreurs de validation Laravel
            if (response.status === 422) {
                setErrors(result.errors || {});
                return;
            }

            // Inscription réussie
            if (response.ok) {
                setSuccess("Registration successful!");

                // Vider le formulaire
                setNom("");
                setUsername("");
                setEmail("");
                setPassword("");

                return;
            }

            // Autre erreur venant du serveur
            setErrors({
                general: "Something went wrong. Please try again."
            });

        } catch (error) {
            console.error(error);

            setErrors({
                general: "Unable to connect to the server."
            });
        }
    };

    return (
        <div>
            <h1>Register</h1>

            {success && <p>{success}</p>}

            {errors.general && <p>{errors.general}</p>}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Nom</label>

                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    {errors.nom && <p>{errors.nom[0]}</p>}
                </div>

                <div>
                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {errors.username && <p>{errors.username[0]}</p>}
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {errors.email && <p>{errors.email[0]}</p>}
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.password && <p>{errors.password[0]}</p>}
                </div>

                <button type="submit">
                    Register
                </button>
                <p>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
                </p>

            </form>
        </div>
    );
}

export default Register;

