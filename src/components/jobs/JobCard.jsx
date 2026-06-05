import { formatISTDate } from "../../utils/dateFormatter";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return {
          border: "border-blue-500",
          badge: "bg-blue-100 text-blue-700",
        };

      case "CLOSED":
        return {
          border: "border-red-500",
          badge: "bg-red-100 text-red-700",
        };

      default:
        return {
          border: "border-slate-300",
          badge: "bg-slate-100 text-slate-700",
        };
    }
  };

  const style = getStatusStyle(job.status);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border-l-4 ${style.border} p-5 hover:shadow-md transition`}
    >
      {/* Status */}
      <span
        className={`inline-block px-2 py-1 text-xs rounded-full mb-4 ${style.badge}`}
      >
        {job.status}
      </span>

      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-slate-900">{job.title}</h3>

        <button
          onClick={() => navigate(`/jobs/edit/${job.id}`)}
          className="text-slate-400 hover:text-blue-600 transition cursor-pointer"
        >
          <FiEdit2 size={18} />
        </button>
      </div>

      {/* Location */}
      <p className="text-slate-500 text-sm mb-6">📍 {job.location}</p>

      {/* Bottom */}
      <div className="flex justify-between text-xs text-slate-500">
        <div>
          <p>Department</p>

          <p className="font-semibold text-slate-900 mt-1">{job.department}</p>
        </div>

        <div className="text-right">
          <p>CREATED</p>

          <p className="font-semibold text-slate-900 mt-1">
            {formatISTDate(job.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
