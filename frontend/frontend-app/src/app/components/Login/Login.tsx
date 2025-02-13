import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {  // ✅ Add 'async' here
        e.preventDefault();
        setMessage("Logging in...");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Login successful! Welcome, ${data.username || email}.`);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
                navigate('/main');
            } else {
                setMessage(`Login failed: ${data.message || "Invalid credentials"}`);
            }
        } catch (error) {
            setMessage("Error connecting to server.");
        }
    };

    return (
        <div className="login-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} >
                <div style={{alignItems:"center", width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" style={{width: '100%'}}>Login</button>
                </div>
            </form>
        </div>
    );
};