import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";
import Users from "./pages/admin/Users";
import AllJobs from "./pages/admin/AllJobs";
import AdminRoute from "./routes/AdminRoute";
import ResumeMatch from "./pages/ResumeMatch";
import RecommendedJobs from "./pages/RecommendedJobs";

/* Auth Pages */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

/* Dashboard Pages */
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";

/* Recruiter Pages */
import PostJob from "./pages/PostJob";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Interviews from "./pages/Interviews";

/* Route Guard */
import ProtectedRoute from "./routes/ProtectedRoute";
import useWebSocket from "./hooks/useWebSocketHook";

import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const userEmail = localStorage.getItem("userEmail");
  useWebSocket(userEmail);
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* ENTRY POINT */}
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageTransition><Dashboard /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* JOB LIST */}
          <Route
            path="/dashboard/jobs"
            element={
              <ProtectedRoute>
                <PageTransition><Jobs /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* APPLY JOB (JOB SEEKER) */}
          <Route
            path="/dashboard/apply/:id"
            element={
              <ProtectedRoute>
                <PageTransition><ApplyJob /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* MY APPLICATIONS (JOB SEEKER) */}
          <Route
            path="/dashboard/my-applications"
            element={
              <ProtectedRoute>
                <PageTransition><MyApplications /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* RECRUITER ROUTES */}
          <Route
            path="/dashboard/post-job"
            element={
              <ProtectedRoute>
                <PageTransition><PostJob /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/applications"
            element={
              <ProtectedRoute>
                <PageTransition><Applications /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES (SECURED) */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <PageTransition><AdminDashboard /></PageTransition>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <PageTransition><Users /></PageTransition>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <PageTransition><AllJobs /></PageTransition>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminRoute>
                <PageTransition><AdminReports /></PageTransition>
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard/resume-match"
            element={
              <ProtectedRoute>
                <PageTransition><ResumeMatch /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recommended"
            element={
              <ProtectedRoute>
                <PageTransition><RecommendedJobs /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <PageTransition><Profile /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/interviews"
            element={
              <ProtectedRoute>
                <PageTransition><Interviews /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </BrowserRouter>
  );
}
export default App;
