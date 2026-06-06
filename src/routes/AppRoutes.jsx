import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import CreateJob from "../pages/CreateJob";
import Candidate from "../pages/Candidate";
import Candidates from "../pages/Candidates";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Auth />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/edit/:id"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <Candidate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate"
        element={
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
