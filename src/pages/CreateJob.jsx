import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { createJob } from "../services/jobService";
import { useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    status: "OPEN",
  });
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  const recruiterId = localStorage.getItem("recruiter_id");
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await getJobById(id);

      setJob({
        title: data.title,
        department: data.department,
        location: data.location,
        description: data.description,
        status: data.status,
      });

      setSkills(
        data.skills_required
          ? data.skills_required.split(",").map((s) => s.trim())
          : [],
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: job.title,
        description: job.description,
        skills_required: skills.join(", "),
        location: job.location,
        department: job.department,
        status: job.status,
      };

      if (isEditMode) {
        await updateJob(id, payload);
        toast.success("Job Updated Successfully");
      } else {
        await createJob(payload);
        toast.success("Job Created Successfully");
      }
      navigate("/jobs");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 ml-64">
      <Sidebar />
      <div className="max-w-4xl">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            {isEditMode ? "Edit Job" : "Create Job"}
          </h1>
          <p className="text-slate-500">
            Create a new position and define candidate requirements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              📋 Role Foundations
            </h2>

            {/* Job Title */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Fullstack Engineer"
                value={job.title}
                onChange={
                  (e) => setJob((prev) => ({ ...prev, title: e.target.value })) // ✅ fixed
                }
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department + Location */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department
                </label>
                <select
                  value={job.department}
                  onChange={
                    (e) =>
                      setJob((prev) => ({
                        ...prev,
                        department: e.target.value,
                      })) // ✅ fixed
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Product</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Remote / Bangalore / Hyderabad"
                  value={job.location}
                  onChange={
                    (e) =>
                      setJob((prev) => ({ ...prev, location: e.target.value })) // ✅ fixed
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                rows="8"
                placeholder="Tell candidates about the role, team, and mission..."
                value={job.description}
                onChange={
                  (e) =>
                    setJob((prev) => ({ ...prev, description: e.target.value })) // ✅ fixed
                }
                className="w-full border max-h-32 border-slate-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status — edit mode only */}
            {isEditMode && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={job.status}
                  onChange={(e) =>
                    setJob((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-3"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Required Skills
            </label>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a skill (e.g. AWS, Python, FastAPI)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
                className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Add
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-3">
              Skills will be used by the AI engine to calculate candidate fit
              scores.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-6 py-3 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:bg-slate-400"
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Job"
                  : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
