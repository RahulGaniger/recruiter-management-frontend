import { useEffect, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import Sidebar from "../components/layout/Sidebar";
import { getJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs();

      setJobs(data);
    } catch (err) {
      console.error(err);

      setError(err?.response?.data?.detail || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.location?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !status || job.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);

      const dateB = new Date(b.created_at);

      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-slate-100 ml-64 p-8">
      <Sidebar />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Management</h1>

          <p className="text-slate-500">
            Manage and track your recruitment pipeline.
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
          onClick={() => navigate("/create-job")}
        >
          + Create Job
        </button>
      </div>

      <JobFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        resetFilters={resetFilters}
      />

      {loading && <div className="text-center py-10">Loading jobs...</div>}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <p className="text-sm text-slate-500">
              Showing {filteredJobs.length} jobs
            </p>
          </div>
        </>
      )}
    </div>
  );
}
