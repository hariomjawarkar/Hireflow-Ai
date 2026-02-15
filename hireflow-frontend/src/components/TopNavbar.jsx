import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { toast } from "react-toastify";

export default function TopNavbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role") || "USER";
    const userName = localStorage.getItem("userName") || "Candidate";
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    let roleLabel = "Job Seeker";
    if (role === "ADMIN") roleLabel = "Platform Administrator";
    else if (role === "RECRUITER") roleLabel = "HireFlow Recruiter";

    const notifications = [
        { id: 1, text: "AI Match Score: 95% for Senior Dev role!", time: "2m ago", type: "success" },
        { id: 2, text: "New job matches your skill stack.", time: "1h ago", type: "info" }
    ];

    return (
        <div className="top-navbar">
            <div className="d-flex align-items-center gap-2">
                <i className="bi bi-list d-lg-none fs-4 cursor-pointer"></i>
                <h6 className="mb-0 fw-bold">HireFlow AI <span className="text-muted fw-normal">|</span> <span className="text-primary small" style={{ fontSize: '0.85rem' }}>{roleLabel}</span></h6>
            </div>

            <div className="d-flex align-items-center gap-3">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="btn-icon">
                    <i className={`bi bi-${theme === 'light' ? 'moon-stars' : 'sun'}`}></i>
                </button>

                {/* Notifications */}
                <div className="position-relative">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="btn-icon">
                        <i className="bi bi-bell"></i>
                        <span className="notification-badge"></span>
                    </button>
                    {showNotifications && (
                        <div className="notification-dropdown glass fade-in">
                            <div className="dropdown-header d-flex justify-content-between align-items-center">
                                <span>Notifications</span>
                                <button className="btn btn-link btn-sm p-0 text-decoration-none extra-small" onClick={() => toast.info("Notifications Refreshed")}>Mark all read</button>
                            </div>
                            {notifications.map(n => (
                                <div key={n.id} className="dropdown-item">
                                    <p className="mb-0 small fw-bold">{n.text}</p>
                                    <span className="extra-small text-muted">{n.time}</span>
                                </div>
                            ))}
                            <div
                                className="dropdown-footer cursor-pointer text-primary fw-bold"
                                onClick={() => {
                                    setShowNotifications(false);
                                    if (role === 'ADMIN') navigate('/admin/reports');
                                    else navigate('/dashboard');
                                    toast.info("Navigating to all activities...");
                                }}
                            >
                                View All Activity
                            </div>
                        </div>
                    )}
                </div>

                <div className="user-profile d-flex align-items-center gap-3">
                    <div className="text-end d-none d-sm-block">
                        <p className="mb-0 fw-800 small text-dark-theme-fix">{userName}</p>
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>Session Active</span>
                    </div>
                    <div className="avatar position-relative" style={{ overflow: 'visible' }}>
                        <img
                            src={role === 'ADMIN' ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                            alt="Profile"
                            className="w-100 h-100 rounded-circle shadow-sm border border-2 border-white"
                            style={{ objectFit: 'cover' }}
                        />
                        <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle shadow-sm" style={{ width: '12px', height: '12px' }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
