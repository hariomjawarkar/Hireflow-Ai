import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function PostJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        skillsRequired: "",
    });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post("/jobs", job);
            toast.success("Job posted successfully!");
            setJob({
                title: "",
                company: "",
                location: "",
                description: "",
                skillsRequired: "",
            });
        } catch {
            toast.error("Failed to post job. Please check your inputs.");
        }
    };

    const handleAiEnhance = async () => {
        if (!job.title || !job.skillsRequired) {
            toast.warn("Please enter a title and skills first.");
            return;
        }

        const toastId = toast.loading("AI is polishing your description...");
        try {
            const res = await axiosInstance.post("/ai/generate-job-description", {
                title: job.title,
                description: job.description,
                skills: job.skillsRequired
            });
            setJob({ ...job, description: res.data.description });
            toast.update(toastId, { render: "AI Magic applied! ✨", type: "success", isLoading: false, autoClose: 3000 });
        } catch (error) {
            console.error("AI Enhancement failed", error);
            toast.update(toastId, { render: "AI service is busy. Try again!", type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    return (
        <DashboardLayout>
            <div className="page-header slide-in">
                <div>
                    <h4>Talent Acquisition</h4>
                    <p className="text-muted small">Create opportunities for top talent</p>
                </div>
            </div>

            <div className="row mt-3 fade-in">
                <div className="col-lg-8">
                    <div className="dashboard-card p-5">
                        <div className="d-flex align-items-center gap-3 mb-5">
                            <div className="avatar bg-primary text-white" style={{ width: '56px', height: '56px', borderRadius: '16px' }}>
                                <i className="bi bi-briefcase fs-3"></i>
                            </div>
                            <div>
                                <h5 className="fw-800 mb-0">Opportunity Details</h5>
                                <p className="text-muted small mb-0">Fill in the essentials to attract the right talent</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label small text-uppercase fw-800">Professional Title</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0"><i className="bi bi-type"></i></span>
                                        <input
                                            className="form-control border-start-0 ps-0"
                                            name="title"
                                            placeholder="e.g. Senior Software Engineer"
                                            value={job.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small text-uppercase fw-800">Deployment Location</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0"><i className="bi bi-geo-alt"></i></span>
                                        <input
                                            className="form-control border-start-0 ps-0"
                                            name="location"
                                            placeholder="Remote, New York, etc."
                                            value={job.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small text-uppercase fw-800">Company Brand</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0"><i className="bi bi-building"></i></span>
                                        <input
                                            className="form-control border-start-0 ps-0"
                                            name="company"
                                            placeholder="Your Company Name"
                                            value={job.company}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small text-uppercase fw-800">Required Stack</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0"><i className="bi bi-cpu"></i></span>
                                        <input
                                            className="form-control border-start-0 ps-0"
                                            name="skillsRequired"
                                            placeholder="Java, Spring Boot, React"
                                            value={job.skillsRequired}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="form-label small text-uppercase fw-800 mb-0">Job Description & Culture</label>
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-outline-primary border-0 fw-bold"
                                            onClick={handleAiEnhance}
                                            disabled={!job.title || !job.skillsRequired}
                                        >
                                            <i className="bi bi-magic me-1"></i> AI Magic Rewrite
                                        </button>
                                    </div>
                                    <textarea
                                        className="form-control p-3"
                                        rows="8"
                                        name="description"
                                        placeholder="Describe the role, responsibilities, and benefits..."
                                        value={job.description}
                                        onChange={handleChange}
                                        style={{ borderRadius: '14px' }}
                                    />
                                </div>
                            </div>

                            <div className="mt-5 d-flex justify-content-between align-items-center">
                                <span className="text-muted small"><i className="bi bi-info-circle me-1"></i> Data will be live immediately after publishing.</span>
                                <button className="btn btn-primary px-5 py-3 shadow-lg">
                                    <i className="bi bi-rocket-takeoff me-2"></i> Launch Opportunity
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="dashboard-card bg-light border-0 shadow-none h-100">
                        <h6 className="fw-800 mb-4">Posting Tips</h6>
                        <ul className="list-unstyled d-flex flex-column gap-4">
                            <li className="d-flex gap-3">
                                <div className="dot bg-primary mt-1"></div>
                                <div>
                                    <p className="fw-700 small mb-1">Clear Job Title</p>
                                    <span className="text-muted extra-small">Specific titles attract 40% more qualified candidates.</span>
                                </div>
                            </li>
                            <li className="d-flex gap-3">
                                <div className="dot bg-success mt-1"></div>
                                <div>
                                    <p className="fw-700 small mb-1">Define the Stack</p>
                                    <span className="text-muted extra-small">Our AI uses the skill list for matching scores.</span>
                                </div>
                            </li>
                            <li className="d-flex gap-3">
                                <div className="dot bg-warning mt-1"></div>
                                <div>
                                    <p className="fw-700 small mb-1">Remote-first Perks</p>
                                    <span className="text-muted extra-small">Mention flexibility to stand out to top talent.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

