import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-950 text-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-10">ATS</h1>

        <nav className="space-y-6 flex flex-col">
          <a
            href="/dashboard"
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Dashboard
          </a>

          <a
            href="/jobs"
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Jobs
          </a>

          <a
            href="/create-job"
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Create Job
          </a>

          <a
            href="/candidates"
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Candidate Analysis
          </a>
        </nav>
      </div>
    </aside>
  );
}
