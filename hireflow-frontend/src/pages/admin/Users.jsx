import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

export default function Users() {
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        axiosInstance
            .get("/admin/users")
            .then((res) => setUsers(res.data))
            .catch(() => toast.error("Access denied or session expired"));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axiosInstance.delete(`/admin/users/${id}`)
                .then(() => {
                    toast.success("User account removed");
                    loadUsers();
                })
                .catch(() => toast.error("Failed to remove user"));
        }
    };

    return (
        <DashboardLayout>
            <div className="welcome-banner p-4 mb-5 glass border-0 overflow-hidden position-relative rounded-lg shadow-xl" style={{
                backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.75), rgba(30, 27, 75, 0.9)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div className="position-relative" style={{ zIndex: 1 }}>
                    <div className="badge-pill bg-white-10 text-white mb-2 d-inline-block px-3 py-1 fw-800 fs-xs text-uppercase backdrop-blur">Platform Directory</div>
                    <h2 className="fw-900 text-white mb-1">Account Management</h2>
                    <p className="text-white opacity-75 small mb-0">Security auditing and global user monitoring active.</p>
                </div>
            </div>

            <div className="glass-table-container fade-in mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="ps-4">User Details</th>
                            <th>Email Address</th>
                            <th>Platform Role</th>
                            <th className="text-end pe-4">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="avatar bg-blue-soft text-primary" style={{ width: '40px', height: '40px', borderRadius: '12px', fontWeight: '800' }}>
                                            {user.name?.charAt(0)}
                                        </div>
                                        <div className="fw-bold text-dark">{user.name}</div>
                                    </div>
                                </td>
                                <td className="text-muted">{user.email}</td>
                                <td>
                                    <span className={`badge-pill ${user.role === 'ADMIN' ? 'bg-orange-soft text-warning border' : user.role === 'RECRUITER' ? 'bg-purple-soft text-purple border' : 'bg-blue-soft text-primary border'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="text-end pe-4">
                                    <div className="d-flex align-items-center justify-content-end gap-3">
                                        <span className="text-success small fw-700">
                                            <i className="bi bi-patch-check-fill me-1"></i> Verified
                                        </span>
                                        <button
                                            className="btn btn-outline-danger btn-xs border-0"
                                            onClick={() => deleteUser(user.id)}
                                            title="Remove User"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-people fs-1 d-block mb-3 opacity-25"></i>
                        <p className="text-muted">No users found in the system.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
