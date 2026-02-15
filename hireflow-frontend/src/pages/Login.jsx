import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();

    // Role is ONLY for UI display (backend decides real role)
    const [role, setRole] = useState("JOB_SEEKER");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ✅ Send ONLY email & password
            const res = await axiosInstance.post("/auth/login", {
                email,
                password,
            });

            const { token, role: backendRole, name, userId } = res.data;

            // ✅ Save auth details
            localStorage.setItem("token", token);
            localStorage.setItem("role", backendRole);
            localStorage.setItem("userName", name || "User");
            localStorage.setItem("userId", userId);
            localStorage.setItem("userEmail", email);

            // ✅ Redirect based on BACKEND role
            if (backendRole === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login Error details:", error.response?.data);
            const message =
                error?.response?.data?.message ||
                "Invalid email or password";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070")' }}>
            <div className="auth-bg-overlay"></div>
            <div className="auth-bg-mesh"></div>
            <div className="auth-card fade-in">
                <h4 className="text-center auth-title">HireFlow AI</h4>
                <p className="text-center auth-subtitle">
                    Login as {role.replace("_", " ")}
                </p>

                {/* ROLE SELECTOR (UI ONLY – DOES NOT AFFECT LOGIN) */}
                <div className="role-switch mb-4">
                    <button
                        type="button"
                        className={role === "JOB_SEEKER" ? "active" : ""}
                        onClick={() => setRole("JOB_SEEKER")}
                    >
                        👤 Job Seeker
                    </button>

                    <button
                        type="button"
                        className={role === "RECRUITER" ? "active" : ""}
                        onClick={() => setRole("RECRUITER")}
                    >
                        🏢 Recruiter
                    </button>

                    <button
                        type="button"
                        className={role === "ADMIN" ? "active" : ""}
                        onClick={() => setRole("ADMIN")}
                    >
                        🛡️ Admin
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="auth-footer-text">
                    Don’t have an account?{" "}
                    <Link to="/register">Register Now</Link>

                </div>
            </div>
        </div>
    );
}
