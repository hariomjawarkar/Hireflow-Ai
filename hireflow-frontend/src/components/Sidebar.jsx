import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <div className="sidebar">
            <div className="sidebar-logo logo-gradient">
                HireFlow<span style={{ color: "var(--secondary-color)" }}>.</span>
            </div>

            <div className="sidebar-nav">
                <NavLink to="/dashboard" end>
                    <i className="bi bi-grid-1x2"></i> <span>Dashboard</span>
                </NavLink>

                <NavLink to="/dashboard/jobs">
                    <i className="bi bi-briefcase"></i> <span>Explore Jobs</span>
                </NavLink>

                {role === "RECRUITER" && (
                    <>
                        <NavLink to="/dashboard/post-job">
                            <i className="bi bi-plus-circle"></i> <span>Post a Job</span>
                        </NavLink>
                        <NavLink to="/dashboard/applications">
                            <i className="bi bi-file-earmark-person"></i> <span>Applications</span>
                        </NavLink>
                    </>
                )}

                {role === "JOB_SEEKER" && (
                    <>
                        <NavLink to="/dashboard/my-applications">
                            <i className="bi bi-send-check"></i> <span>My Applied</span>
                        </NavLink>
                        <NavLink to="/dashboard/resume-match">
                            <i className="bi bi-stars"></i> <span>AI Resume Match</span>
                        </NavLink>
                        <NavLink to="/dashboard/recommended">
                            <i className="bi bi-lightbulb"></i> <span>AI Job Picks</span>
                        </NavLink>
                    </>
                )}

                {role === "ADMIN" && (
                    <>
                        <NavLink to="/admin/dashboard">
                            <i className="bi bi-shield-lock"></i> <span>Admin View</span>
                        </NavLink>
                        <NavLink to="/admin/users">
                            <i className="bi bi-people"></i> <span>Users</span>
                        </NavLink>
                        <NavLink to="/admin/jobs">
                            <i className="bi bi-collection"></i> <span>All Listings</span>
                        </NavLink>
                        <NavLink to="/admin/reports">
                            <i className="bi bi-bar-chart-fill"></i> <span>AI Reports</span>
                        </NavLink>
                    </>
                )}

                <div className="mt-4 pt-4 border-top">
                    <NavLink to="/dashboard/interviews">
                        <i className="bi bi-calendar2-event"></i> <span>Interviews</span>
                    </NavLink>
                    <NavLink to="/dashboard/profile">
                        <i className="bi bi-person-badge"></i> <span>My Profile</span>
                    </NavLink>
                </div>
            </div>

            <div className="sidebar-footer">
                <div className="p-3 bg-white-10 rounded-4 border-0 mb-3 backdrop-blur shadow-sm">
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="bi bi-patch-check-fill text-primary"></i>
                        <span className="fw-800 extra-small text-dark-theme-fix">PRO LICENSE</span>
                    </div>
                    <p className="extra-small text-muted mb-0">Active Enterprise Protocol</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm w-100 rounded-pill mb-3"
                >
                    <i className="bi bi-box-arrow-left me-2"></i> Logout
                </button>
            </div>
        </div>
    );
}

