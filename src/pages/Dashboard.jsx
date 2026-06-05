import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { getDashboardData } from "../services/dashboard";
import {
  FaBriefcase,
  FaCheckCircle,
  FaUsers,
  FaRobot,
  FaStar,
} from "react-icons/fa";

import DashboardCard from "../components/dashboard/DashboardCard";
import TopCandidatesCard from "../components/dashboard/TopCandidateCard";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ml-64 p-8">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 ml-64">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

          <p className="text-slate-500 mt-1">Welcome back recruiter</p>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
          <DashboardCard
            title="Total Jobs"
            value={dashboardData.total_jobs}
            icon={<FaBriefcase size={12} />}
            color="blue"
          />

          <DashboardCard
            title="Active Jobs"
            value={dashboardData.active_jobs}
            icon={<FaCheckCircle size={12} />}
            color="green"
          />

          <DashboardCard
            title="Closed Jobs"
            value={dashboardData.closed_jobs}
            icon={<FaStar size={12} />}
            color="red"
          />

          <DashboardCard
            title="Total Candidates"
            value={dashboardData.total_candidates}
            icon={<FaUsers size={12} />}
            color="purple"
          />

          <DashboardCard
            title="Avg AI Score"
            value={`${dashboardData.avg_ai_score}%`}
            icon={<FaRobot size={12} />}
            color="yellow"
          />
        </div>
        {/* Top Candidates */}

        <TopCandidatesCard candidates={dashboardData.top_candidates} />
      </div>
    </div>
  );
}
