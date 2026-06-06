import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-950 text-white">
      <div className="p-8 flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-10">Recruiter Management</h1>

        <nav className="space-y-6 flex flex-col">
          <Link to="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>

          <Link to="/jobs" className="hover:text-blue-400 transition">
            Jobs
          </Link>

          <Link to="/create-job" className="hover:text-blue-400 transition">
            Create Job
          </Link>

          <Link to="/candidates" className="hover:text-blue-400 transition">
            Candidate Analysis
          </Link>

          <Link to="/candidate" className="hover:text-blue-400 transition">
            Candidates
          </Link>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
