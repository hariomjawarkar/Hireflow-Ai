import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        skills: "",
        bio: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get("/auth/user");
                if (res.data) {
                    setUser({
                        name: res.data.name || "",
                        email: res.data.email || "",
                        role: res.data.role || "JOB_SEEKER",
                        skills: res.data.skills || "",
                        bio: res.data.bio || ""
                    });
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
                toast.error("Could not load profile data.");
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosInstance.put("/auth/profile", user);
            toast.success("Profile updated successfully!");
            // Update local state in case backend returned transformed data
            if (res.data) {
                setUser(prev => ({
                    ...prev,
                    name: res.data.name || prev.name,
                    skills: res.data.skills || prev.skills,
                    bio: res.data.bio || prev.bio
                }));
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleAiBioEnhance = async () => {
        if (!user.name || !user.skills) {
            toast.warn("Please ensure your name and skills are filled first.");
            return;
        }

        const toastId = toast.loading("AI is crafting your professional bio...");
        try {
            const res = await axiosInstance.post("/ai/generate-bio", {
                name: user.name,
                bio: user.bio,
                skills: user.skills
            });
            setUser({ ...user, bio: res.data.bio });
            toast.update(toastId, { render: "Professional bio generated! ✨", type: "success", isLoading: false, autoClose: 3000 });
        } catch (error) {
            console.error("Bio Enhancement failed", error);
            toast.update(toastId, { render: "AI service is busy. Try again!", type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    if (fetching) {
        return (
            <DashboardLayout>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            </DashboardLayout>
        );
    }

    // Calculate skills progress safely
    const skillsCount = (user.skills?.split(',').filter(s => s.trim().length > 0) || []).length;
    const progressPercent = Math.min(skillsCount * 20, 100);

    return (
        <DashboardLayout>
            <div className="page-header slide-in">
                <div>
                    <h4>Personal Profile</h4>
                    <p className="text-muted small">Manage your professional identity and skill stack</p>
                </div>
            </div>

            <div className="row mt-4 fade-in">
                <div className="col-lg-8">
                    <div className="dashboard-card p-5">
                        <form onSubmit={handleUpdate}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label small text-uppercase fw-800">Full Name</label>
                                    <input
                                        className="form-control"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small text-uppercase fw-800">Email Address (Read-only)</label>
                                    <input
                                        className="form-control bg-light"
                                        value={user.email}
                                        readOnly
                                    />
                                </div>
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="form-label small text-uppercase fw-800 mb-0">Professional Bio</label>
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-outline-primary border-0 fw-bold"
                                            onClick={handleAiBioEnhance}
                                            disabled={!user.name || !user.skills}
                                        >
                                            <i className="bi bi-magic me-1"></i> AI Magic Bio
                                        </button>
                                    </div>
                                    <textarea
                                        className="form-control p-3"
                                        name="bio"
                                        rows="5"
                                        placeholder="Tell recruiters about your professional journey..."
                                        value={user.bio}
                                        onChange={handleChange}
                                        style={{ borderRadius: '14px' }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small text-uppercase fw-800">Technical Skill Set (Comma separated)</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white"><i className="bi bi-cpu"></i></span>
                                        <input
                                            className="form-control"
                                            name="skills"
                                            placeholder="Java, React, SQL, AWS, Docker"
                                            value={user.skills}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p className="text-muted extra-small mt-2">Our AI uses these skills to recommend the best roles for you.</p>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary mt-5 px-5 py-3 shadow-lg" disabled={loading}>
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>
                                ) : (
                                    "Update Profile"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="dashboard-card text-center bg-blue-soft border-0">
                        <div className="avatar bg-primary text-white mx-auto mb-4" style={{ width: '100px', height: '100px', fontSize: '2.5rem', borderRadius: '30px' }}>
                            {user.name?.charAt(0) || '?'}
                        </div>
                        <h5 className="fw-800 mb-1">{user.name || "User"}</h5>
                        <span className="badge-pill bg-white text-primary border mb-4 d-inline-block">{user.role}</span>

                        <div className="text-start mt-4">
                            <h6 className="fw-800 extra-small text-uppercase text-muted opacity-75 mb-3">AI Readiness</h6>
                            <div className="progress mb-2" style={{ height: '10px' }}>
                                <div
                                    className="progress-bar bg-primary"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                            <p className="extra-small text-muted">{progressPercent}% profile visibility. {progressPercent < 100 ? "Add more skills!" : "Perfect profile!"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
