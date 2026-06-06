import { getJobs } from "../services/jobService";
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { analyzeResume } from "../services/candidateService";
import { toast } from "react-toastify";

export default function Candidates() {
  const [jobId, setJobId] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Fetch jobs for dropdown
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Handle form submission
  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!jobId || !resume) {
      toast.error("Select Job and Resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("job_id", jobId);

      formData.append("resume", resume);

      const data = await analyzeResume(formData);

      setResult(data);
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.detail || "Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 ml-64 p-8">
      <Sidebar />

      <h1 className="text-3xl font-bold mb-6">Candidate Analysis</h1>

      <form onSubmit={handleAnalyze} className="bg-white p-6 rounded-xl shadow">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Job</label>

          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Job</option>

            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Resume</label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {loading && (
        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>

            <div>
              <p className="font-semibold text-blue-700">
                AI Analysis in Progress
              </p>

              <p className="text-sm text-slate-600">
                Please wait while we analyze the resume against the selected
                job. This may take up to 30 seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          {/* Candidate */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Candidate Details</h2>

            <p>
              <strong>Name:</strong> {result.candidate_name}
            </p>

            <p>
              <strong>Candidate ID:</strong> {result.candidate_id}
            </p>
          </div>

          {/* Score */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">AI Fit Analysis</h2>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl font-bold text-green-600">
                {result.fit_score}%
              </div>

              <div className="text-slate-500">Match Score</div>
            </div>

            <p className="text-slate-700 leading-7">{result.fit_reason}</p>
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Matched Skills</h2>

            <div className="flex flex-wrap gap-3">
              {result.matched_skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Strengths</h2>

            <ul className="list-disc pl-6">
              {result.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Weaknesses</h2>

            <ul className="list-disc pl-6">
              {result.weaknesses?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
