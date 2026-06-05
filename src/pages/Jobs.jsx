// import JobCard from "../components/jobs/JobCard";
// import JobFilters from "../components/jobs/JobFilters";
// import Sidebar from "../components/layout/Sidebar";

// export default function Jobs() {
//   const jobs = [
//     {
//       id: 1,
//       title: "Senior Product Designer",
//       location: "New York, NY (Hybrid)",
//       candidates: 42,
//       createdAt: "Oct 12, 2023",
//       status: "Open",
//     },
//     {
//       id: 2,
//       title: "Lead Frontend Engineer",
//       location: "Remote",
//       candidates: 0,
//       createdAt: "Nov 03, 2023",
//       status: "Draft",
//     },
//     {
//       id: 3,
//       title: "Technical Recruiter",
//       location: "Austin, TX",
//       candidates: 18,
//       createdAt: "Oct 20, 2023",
//       status: "Open",
//     },
//     {
//       id: 4,
//       title: "HR Business Partner",
//       location: "Chicago, IL",
//       candidates: 124,
//       createdAt: "Sep 15, 2023",
//       status: "Closed",
//     },
//     {
//       id: 5,
//       title: "Data Analyst",
//       location: "Seattle, WA",
//       candidates: 56,
//       createdAt: "Oct 30, 2023",
//       status: "Open",
//     },
//     {
//       id: 6,
//       title: "UX Researcher",
//       location: "San Francisco, CA",
//       candidates: 31,
//       createdAt: "Nov 05, 2023",
//       status: "Open",
//     },
//   ];

//   return (
//     <div className=" min-h-screen bg-slate-100 p-8 ml-64">
//       <Sidebar />
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Job Management</h1>

//           <p className="text-slate-500">
//             Manage and track your recruitment pipeline.
//           </p>
//         </div>

//         <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
//           + Create Job
//         </button>
//       </div>

//       {/* Filters */}
//       <JobFilters />

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {jobs.map((job) => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="flex justify-between items-center mt-8">
//         <p className="text-sm text-slate-500">Showing 6 of 24 active roles</p>

//         <div className="flex gap-2">
//           <button className="w-9 h-9 bg-blue-600 text-white rounded">1</button>

//           <button className="w-9 h-9 border rounded bg-white">2</button>

//           <button className="w-9 h-9 border rounded bg-white">3</button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
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
